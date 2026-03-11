'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const LETTERS = ['M', 'O', 'N', 'A', 'C', 'A'];
const CATEGORIES = ['Vestidos', 'Blazers', 'Denim', 'Sastrería'];

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hangerLineRef = useRef<HTMLDivElement>(null);
  const hangerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const categoryRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = { value: 0 };
    const updateCounter = () => {
      if (counterRef.current) {
        counterRef.current.textContent = String(Math.round(progress.value)).padStart(2, '0');
      }
    };

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set(subtitleRef.current, { autoAlpha: 0, y: 16 });
    gsap.set(letterRefs.current, { autoAlpha: 0, yPercent: 120 });
    gsap.set(hangerLineRef.current, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(hangerRefs.current, { autoAlpha: 0, y: -22, scale: 0.8 });
    gsap.set(categoryRefs.current, { autoAlpha: 0, y: 14 });
    gsap.set(progressTrackRef.current, { autoAlpha: 0 });
    gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(scanRef.current, { yPercent: -115, autoAlpha: 0.4 });
    gsap.set([topPanelRef.current, bottomPanelRef.current], { yPercent: 0 });
    gsap.set(titleWrapRef.current, { scale: 1 });

    tl.to(hangerLineRef.current, {
        scaleX: 1,
        duration: 0.65,
        ease: 'expo.out',
      })
      .to(hangerRefs.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power4.out',
      }, '-=0.35')
      .to(letterRefs.current, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.95,
        stagger: 0.055,
        ease: 'power4.out',
      }, '-=0.7')
      .to(subtitleRef.current, { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.45')
      .to(categoryRefs.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.07,
      }, '-=0.35')
      .to(progressTrackRef.current, { autoAlpha: 1, duration: 0.2 }, '-=0.5')
      .to(progress, {
        value: 100,
        duration: 1.7,
        ease: 'power2.inOut',
        onUpdate: updateCounter,
      }, '-=0.2')
      .to(progressLineRef.current, { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, '<')
      .to(scanRef.current, { yPercent: 115, duration: 1.6, ease: 'power2.inOut' }, '<')
      .to({}, { duration: 0.22 })
      .to(hangerRefs.current, {
        y: 40,
        scale: 0.6,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: 'power2.inOut',
      }, '-=0.05')
      .to([progressTrackRef.current, subtitleRef.current, categoryRefs.current, hangerLineRef.current], {
        autoAlpha: 0,
        y: -8,
        duration: 0.3,
        stagger: 0.02,
      }, '-=0.3')
      .to(titleWrapRef.current, {
        scale: 0.84,
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      }, '-=0.18')
      .to(stageRef.current, {
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      }, '-=0.1')
      .to(topPanelRef.current, { yPercent: -102, duration: 0.95, ease: 'power4.inOut' }, '-=0.12')
      .to(bottomPanelRef.current, { yPercent: 102, duration: 0.95, ease: 'power4.inOut' }, '<')
      .to(containerRef.current, {
        autoAlpha: 0,
        duration: 0.2,
        onComplete,
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] overflow-hidden bg-[#f8f3ea]"
    >
      <div ref={topPanelRef} className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,#fbf7f0_0%,#f2e9db_100%)]" />
      <div ref={bottomPanelRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,#f7f0e5_0%,#efe4d3_100%)]" />

      <div className="hero-grid absolute inset-0 opacity-[0.16]" />
      <div className="hero-noise absolute inset-0 opacity-[0.16] mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.92),rgba(233,220,198,0.45)_38%,transparent_72%)]" />

      <div
        ref={scanRef}
        className="pointer-events-none absolute inset-x-0 top-0 h-[24vh] bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.65),transparent)] mix-blend-screen"
      />

      <div ref={stageRef} className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div ref={hangerLineRef} className="absolute top-[19%] left-1/2 -translate-x-1/2 w-[min(45rem,84vw)] h-px bg-[#cab89d]/75" />

        <div className="absolute top-[19%] left-1/2 -translate-x-1/2 w-[min(45rem,84vw)] flex items-start justify-between px-[2%]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} ref={(el) => { hangerRefs.current[i] = el; }} className="flex flex-col items-center">
              <span className="block h-8 w-px bg-[#c7b394]/70" />
              <div className="h-16 w-12 rounded-b-[1.1rem] rounded-t-[0.5rem] border border-[#d7c7ae]/75 bg-[linear-gradient(180deg,#fbf7f0_0%,#ebddc8_100%)] shadow-[0_10px_24px_rgba(26,24,20,0.08)]" />
            </div>
          ))}
        </div>

        <div ref={titleWrapRef} className="relative z-20 mb-4 overflow-hidden pb-3">
          <div className="flex items-baseline gap-[0.06em]">
            {LETTERS.map((letter, i) => (
              <span
                key={i}
                ref={(el) => { letterRefs.current[i] = el; }}
                className="inline-block text-[clamp(3.6rem,12vw,8.7rem)] font-light tracking-[0.28em] text-[#191714] leading-none select-none"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {letter}
              </span>
            ))}
          </div>
          <div className="preloader-shimmer absolute inset-x-[18%] bottom-0 h-px" />
        </div>

        <p
          ref={subtitleRef}
          className="mt-4 text-[9px] uppercase tracking-[0.48em] text-[#7b6f63]"
        >
          Moda femenina premium
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((item, index) => (
            <span
              key={item}
              ref={(el) => { categoryRefs.current[index] = el; }}
              className="rounded-full border border-[#dbcdb7] bg-white/55 px-3 py-1.5 text-[8px] uppercase tracking-[0.36em] text-[#6f6358] backdrop-blur-sm"
            >
              {item}
            </span>
          ))}
        </div>

        <div ref={progressTrackRef} className="mt-10 w-[min(34rem,82vw)]">
          <div className="mb-3 flex items-center justify-between text-[8px] uppercase tracking-[0.4em] text-[#7f7367]">
            <span>Boot</span>
            <span ref={counterRef}>00</span>
          </div>
          <div className="h-px w-full bg-[#d8ccb9]">
            <div ref={progressLineRef} className="h-full bg-[#1a1814]" />
          </div>
        </div>
      </div>
    </div>
  );
}
