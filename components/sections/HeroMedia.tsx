'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * Hero background. Progressive enhancement:
 *  - default: render the static hero.webp (great LCP, never blocks first paint)
 *  - if motion is allowed AND the video can play, fade the looping video in on top
 *  - prefers-reduced-motion OR load failure → stay on the static image
 * A navy scrim (rendered by the parent) keeps headline/CTAs WCAG AA legible.
 */
export default function HeroMedia({ alt }: { alt: string }) {
  const [useVideo, setUseVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) setUseVideo(true);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-navy">
      <Image
        src="/images/hero.webp"
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {useVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          autoPlay
          loop
          playsInline
          preload="none"
          poster="/images/hero-poster.webp"
          onCanPlay={() => setVideoReady(true)}
          onError={() => {
            setUseVideo(false);
            setVideoReady(false);
          }}
          aria-hidden
        >
          <source src="/images/hero-loop.webm" type="video/webm" />
          <source src="/images/hero-loop.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
