'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Muted autoplay loop. Phones in power-saving mode refuse autoplay and would show
 * a frozen poster; in that case the native controls appear so one tap plays it.
 */
export default function LoopVideo({
  poster,
  sources,
  className,
}: {
  poster: string;
  sources: { src: string; type: string }[];
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => setBlocked(true));
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      controls={blocked}
      className={className}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
