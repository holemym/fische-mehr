// Clipping audit: is any frame cutting off its content? Walks the whole page first (every reveal played), then
// for every element that clips (overflow hidden/clip/auto/scroll, clip-path) reports:
//   box   — content larger than the box (scrollWidth/Height beyond clientWidth/Height)
//   child — a visible child (img, svg, element with text) extends past the frame's edge
//   ink   — glyph ink (canvas measureText actual bounds) of text inside it crosses the frame's edge
//   ellipsis — text truncated with text-overflow
// Fische & mehr: mask-image counts as a frame too (it clips to the border box; that is what cut the
// descenders in the poster band). Several URLs may be passed, comma-separated.
// Usage: node qa/clip-audit.mjs <url> [widths=1440,1024,768,390,360]   (exit 1 on any finding)
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const __profiles = []
const __mk = (p) => { const d = mkdtempSync(p); __profiles.push(d); return d }
process.on('exit', () => { for (const d of __profiles) { try { rmSync(d, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }) } catch {} } })

const [urls_, ws_ = '1440,1024,768,390,360'] = process.argv.slice(2)
const URLS = urls_.split(',')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const AUDIT = `(() => {
  const out = [];
  const name = (el) => { const sec = el.closest('section,header,footer,.menu'); const hd = sec && sec.querySelector('h1,h2,h3'); const tag = sec ? (sec.id ? '#' + sec.id : '[' + (hd ? hd.textContent.trim().replace(/\s+/g, ' ').slice(0, 22) : sec.tagName.toLowerCase()) + ']') + ' ' : ''; return tag + el.tagName.toLowerCase() + (el.classList.length ? '.' + [...el.classList].slice(0, 3).join('.') : '') };
  // round 5: a line lifted out of its mask (two-way reveals) is hidden by design, not cut
  // round 5b: motion follows the scroll, so a stop catches things part-way; only what is fully assembled is audited
  // (a line moved in its mask, a block not yet at full opacity, a door leaf swinging)
  const outLine = (n) => n.matches('.ln, #hero .hl > span') && Math.abs(new DOMMatrix(getComputedStyle(n).transform).m42) > 0.5;
  const shown = (el) => { for (let n = el; n && n.nodeType === 1; n = n.parentElement) { const s = getComputedStyle(n); if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity < 0.99 || n.matches('.leaf')) return false; if (n.matches('.sr-only,[hidden],[data-bleed]') || outLine(n)) return false } const b = el.getBoundingClientRect(); return b.width > 2 && b.height > 2 };
  const clips = [...document.querySelectorAll('body *')].filter(el => { const s = getComputedStyle(el);
    const b = el.getBoundingClientRect();
    // a path card whose object is still packed (before its gesture) holds it below the frame on purpose
    return (/(hidden|clip|auto|scroll)/.test(s.overflowX + s.overflowY) || (s.clipPath && s.clipPath !== 'none') || ((s.maskImage && s.maskImage !== 'none') || (s.webkitMaskImage && s.webkitMaskImage !== 'none'))) && shown(el) && b.bottom > 0 && b.top < innerHeight && !el.closest('[data-gesture]:not([data-gesture="done"])') });
  const cv = document.createElement('canvas').getContext('2d');
  for (const c of clips) {
    const s = getComputedStyle(c), r = c.getBoundingClientRect();
    const tol = 1.5;
    const inset = (s.clipPath || '').match(/inset\\(([^)]*)\\)/);
    if (inset && /\\b[1-9]\\d*(\\.\\d+)?%/.test(inset[1].split('round')[0])) continue; // a frame mid-reveal, not a resting crop
    if (/(hidden|clip)/.test(s.overflowX + s.overflowY)) {
      const dx = c.scrollWidth - c.clientWidth, dy = c.scrollHeight - c.clientHeight;
      if ((dx > 2 && /(hidden|clip)/.test(s.overflowX)) || (dy > 2 && /(hidden|clip)/.test(s.overflowY))) {
        // only visible elements count: a line box taller than its mask (ink checked below) or a door leaf
        // hidden after it opened is not content being cut
        const past = [...c.querySelectorAll('*')].find(k => { if (!shown(k) || k.closest('svg') && k.tagName.toLowerCase() !== 'svg') return false; const b = k.getBoundingClientRect(); return b.right - r.right > 2 || r.left - b.left > 2 || b.bottom - r.bottom > 2 || r.top - b.top > 2 });
        if (past && !(c.closest('[data-marquee]') && dy <= 2)) out.push({ kind: 'box', el: name(c), child: name(past), dx, dy });
      }
    }
    if (s.textOverflow === 'ellipsis' && c.scrollWidth > c.clientWidth + 1) out.push({ kind: 'ellipsis', el: name(c), text: c.textContent.trim().slice(0, 30) });
    // children past the frame (only the frame's own descendants that are not themselves clipped further in)
    for (const k of c.querySelectorAll('img, svg, video, canvas, [class]')) {
      if (!shown(k) || k.closest('svg') && k.tagName.toLowerCase() !== 'svg') continue;
      let inner = k.parentElement; let deeper = false;
      while (inner && inner !== c) { const is = getComputedStyle(inner); if (/(hidden|clip)/.test(is.overflowX + is.overflowY)) { deeper = true; break } inner = inner.parentElement }
      if (deeper) continue;
      const b = k.getBoundingClientRect();
      const over = { l: r.left - b.left, r: b.right - r.right, t: r.top - b.top, b: b.bottom - r.bottom };
      const cut = Object.entries(over).filter(([, v]) => v > 2).map(([k2, v]) => k2 + Math.round(v)).join(' ');
      const sideOnly = cut && !/[tb][0-9]/.test(cut);
      if (sideOnly && (c.closest('[data-marquee]') || ((s.maskImage && s.maskImage !== 'none') || (s.webkitMaskImage && s.webkitMaskImage !== 'none')) || c.matches('section'))) continue;
      if (cut && (b.width * b.height) > 64) out.push({ kind: 'child', el: name(c), child: name(k), cut });
    }
    // glyph ink of text directly inside the frame
    const tw = document.createTreeWalker(c, NodeFilter.SHOW_TEXT);
    let t;
    while ((t = tw.nextNode())) {
      const txt = t.textContent.trim(); if (!txt) continue;
      const p = t.parentElement; if (!shown(p)) continue;
      let inner = p; let deeper = false;
      while (inner && inner !== c) { const is = getComputedStyle(inner); if (inner !== p && /(hidden|clip)/.test(is.overflowX + is.overflowY)) { deeper = true; break } inner = inner.parentElement }
      if (deeper) continue;
      const ps = getComputedStyle(p);
      cv.font = ps.fontStyle + ' ' + ps.fontWeight + ' ' + ps.fontSize + ' ' + ps.fontFamily;
      const m = cv.measureText(txt), fa = m.fontBoundingBoxAscent;
      const range = document.createRange(); range.selectNodeContents(t);
      for (const lr of range.getClientRects()) {
        if (lr.width < 1) continue;
        const base = lr.top + (lr.height - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + fa;
        const inkTop = base - m.actualBoundingBoxAscent, inkBot = base + m.actualBoundingBoxDescent;
        const cutT = r.top - inkTop, cutB = inkBot - r.bottom, cutL = r.left - lr.left, cutR = lr.right - r.right;
        const marquee = !!c.closest('[data-marquee]');
        const maskOnly = !/(hidden|clip)/.test(s.overflowX + s.overflowY) && ((s.maskImage && s.maskImage !== 'none') || (s.webkitMaskImage && s.webkitMaskImage !== 'none'));
        if (cutT > tol || cutB > tol || (!maskOnly && !marquee && (cutL > 2 || cutR > 2))) { out.push({ kind: 'ink', el: name(c), text: txt.slice(0, 26), cut: [cutT > tol ? 't' + cutT.toFixed(1) : '', cutB > tol ? 'b' + cutB.toFixed(1) : '', cutL > 2 ? 'l' + cutL.toFixed(0) : '', cutR > 2 ? 'r' + cutR.toFixed(0) : ''].join(' ').trim() }); break }
      }
    }
  }
  // drawings cut by their own SVG viewport (an inline <svg> clips to its viewBox unless overflow is visible)
  for (const sv of document.querySelectorAll('svg')) {
    if (sv.parentElement && sv.parentElement.closest('svg')) continue;
    if (!shown(sv) || sv.closest('[data-gesture]:not([data-gesture="done"])') || !/(hidden|clip)/.test(getComputedStyle(sv).overflow)) continue;
    const vb = sv.viewBox && sv.viewBox.baseVal; if (!vb || !vb.width) continue;
    let bb; try { bb = sv.getBBox() } catch (e) { continue }
    if (!bb.width) continue;
    const tolX = vb.width * 0.01, tolY = vb.height * 0.01;
    const cut = [bb.x < vb.x - tolX ? 'l' + (vb.x - bb.x).toFixed(1) : '', bb.y < vb.y - tolY ? 't' + (vb.y - bb.y).toFixed(1) : '',
      bb.x + bb.width > vb.x + vb.width + tolX ? 'r' + (bb.x + bb.width - vb.x - vb.width).toFixed(1) : '',
      bb.y + bb.height > vb.y + vb.height + tolY ? 'b' + (bb.y + bb.height - vb.y - vb.height).toFixed(1) : ''].join(' ').trim();
    if (cut) out.push({ kind: 'svgbox', el: name(sv), cut: cut + ' (viewBox units)' });
  }
  // drawings that overflow their own svg on purpose (overflow: visible) but sit inside a frame that clips:
  // map the drawing's extent to the screen and test it against the nearest clipping ancestor
  for (const sv of document.querySelectorAll('svg')) {
    if (sv.parentElement && sv.parentElement.closest('svg')) continue;
    if (!shown(sv) || sv.closest('[data-gesture]:not([data-gesture="done"])')) continue;
    { const vr = sv.getBoundingClientRect(); if (vr.bottom <= 0 || vr.top >= innerHeight) continue }  // audited at the stop that shows it
    let bb, m; try { bb = sv.getBBox(); m = sv.getScreenCTM() } catch (e) { continue }
    if (!bb.width || !m) continue;
    const pts = [[bb.x, bb.y], [bb.x + bb.width, bb.y], [bb.x, bb.y + bb.height], [bb.x + bb.width, bb.y + bb.height]].map(([x, y]) => [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f]);
    const ext = { l: Math.min(...pts.map(p => p[0])), r: Math.max(...pts.map(p => p[0])), t: Math.min(...pts.map(p => p[1])), b: Math.max(...pts.map(p => p[1])) };
    let anc = sv.parentElement;
    while (anc && anc !== document.body) { const as = getComputedStyle(anc); if (/(hidden|clip)/.test(as.overflowX + as.overflowY) || (as.clipPath && as.clipPath !== 'none')) break; anc = anc.parentElement }
    if (!anc || anc === document.body) continue;
    const ar = anc.getBoundingClientRect();
    const cut = [ar.left - ext.l > 2 ? 'l' + Math.round(ar.left - ext.l) : '', ext.r - ar.right > 2 ? 'r' + Math.round(ext.r - ar.right) : '',
      ar.top - ext.t > 2 ? 't' + Math.round(ar.top - ext.t) : '', ext.b - ar.bottom > 2 ? 'b' + Math.round(ext.b - ar.bottom) : ''].join(' ').trim();
    if (cut) out.push({ kind: 'drawing', el: name(anc), child: name(sv), cut: cut + ' px past the frame' });
  }
  return JSON.stringify(out);
})()`

let total = 0
for (const url of URLS) for (const W of ws_.split(',').map(Number)) {
  const mobile = W < 900
  const port = 9500 + Math.floor(Math.random() * 400)
  const proc = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--hide-scrollbars', `--remote-debugging-port=${port}`,
    `--user-data-dir=${__mk(join(tmpdir(), 'ca-'))}`, 'about:blank'], { stdio: 'ignore' })
  let list
  for (let i = 0; i < 60; i++) { try { list = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json()); if (list.find((t) => t.type === 'page')) break } catch {} await sleep(250) }
  const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl)
  await new Promise((r) => { ws.onopen = r })
  let id = 0; const pend = new Map()
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id) } }
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  await send('Page.enable'); await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: mobile ? 844 : 900, deviceScaleFactor: 1, mobile })
  await send('Page.navigate', { url }); await sleep(3500)
  // round 5: reveals are two-way, so what has scrolled away is hidden again: audit what is on screen at every stop
  // of a reader's walk, once the motion there has settled (1.8 s covers the longest reveal)
  const H_ = (await send('Runtime.evaluate', { expression: 'document.documentElement.scrollHeight - innerHeight', returnByValue: true })).result.result.value
  const vh = mobile ? 844 : 900, res = []
  for (let y = 0; ; y = Math.min(H_, y + Math.round(vh * 0.5))) {
    await send('Runtime.evaluate', { expression: `(window.TZ && TZ.lenis ? TZ.lenis.scrollTo(${y}, { immediate: true }) : scrollTo(0, ${y}))` })
    await sleep(1800)
    res.push(...JSON.parse((await send('Runtime.evaluate', { expression: AUDIT, returnByValue: true })).result.result.value))
    if (y >= H_) break
  }
  // the audit uses viewport rects, which is fine: everything is measured in one frame
  const seen = new Set()
  const rows = res.filter((x) => { const k = JSON.stringify(x); if (seen.has(k)) return false; seen.add(k); return true })
  total += rows.length
  if (rows.length) console.log(`\n== ${url} ${W}px: ${rows.length} findings`)
  rows.forEach((x) => console.log(`  ${x.kind.padEnd(8)} ${x.el}${x.child ? ' ⟶ ' + x.child : ''}${x.text ? ' «' + x.text + '»' : ''} ${x.cut || ''}${x.kind === 'box' ? ' dx ' + x.dx + ' dy ' + x.dy : ''}`))
  ws.close(); proc.kill()
}
console.log(`\nTOTAL findings: ${total} across ${URLS.length} url(s)`)
process.exitCode = total ? 1 : 0
