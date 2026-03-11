'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_IMAGE_PRIMARY = '/monaca/about/sobre-mi.jpg';
const ABOUT_IMAGE_FALLBACK = '/monaca/hero/look-01.jpg';

export default function AboutFounder() {
  const [aboutImage, setAboutImage] = useState(ABOUT_IMAGE_PRIMARY);
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip reveal (wipes upward)
      gsap.from(imageWrapRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: { trigger: imageWrapRef.current, start: 'top 78%' },
      });
      gsap.set(imageWrapRef.current, { clipPath: 'inset(0% 0% 0% 0%)' });

      // Text lines stagger
      const lines = textBlockRef.current?.querySelectorAll<HTMLElement>('.tl');
      if (lines?.length) {
        gsap.from(lines, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: textBlockRef.current, start: 'top 80%' },
        });
      }

      // Quote fade
      gsap.from(quoteRef.current, {
        y: 28, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: quoteRef.current, start: 'top 85%' },
      });

      // Subtle image parallax
      gsap.to(imageWrapRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-36 px-6 bg-[#faf8f5] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] tracking-[0.55em] uppercase text-[#8c8278] mb-14">
          La Fundadora
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div
            ref={imageWrapRef}
            className="relative aspect-[3/4] overflow-hidden"
          >
            <Image
              src={aboutImage}
              alt="Amorina Clerici"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority={false}
              onError={() => setAboutImage(ABOUT_IMAGE_FALLBACK)}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white/30 text-[10px] tracking-[0.35em] uppercase text-center leading-loose">
                Amorina Clerici
              </span>
            </div>
            {/* decorative border */}
            <div className="absolute -bottom-3 -right-3 w-28 h-28 border border-[#c9b99a]/35 pointer-events-none" />
          </div>

          {/* ── Text ─────────────────────────────────────────────────────── */}
          <div ref={textBlockRef} className="space-y-7">
            <div>
              <h2
                className="tl text-[clamp(2.5rem,5vw,4.5rem)] font-light tracking-[0.04em] text-[#1a1814] leading-tight"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Amorina
              </h2>
              <h2
                className="tl text-[clamp(2.5rem,5vw,4.5rem)] font-light tracking-[0.04em] text-[#1a1814] leading-tight italic"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Clerici
              </h2>
            </div>

            <div className="tl w-14 h-px bg-[#c9b99a]" />

            <p className="tl text-[#8c8278] leading-relaxed text-sm md:text-base">
              Monaca nació de una visión — el deseo de crear moda que celebre a la mujer
              moderna en toda su complejidad. Fundada por Amorina Clerici, la marca tiende
              un puente entre la elegancia cotidiana y la expresión artística.
            </p>

            <p className="tl text-[#8c8278] leading-relaxed text-sm md:text-base">
              Cada colección es un diálogo personal con la feminidad, elaborada con meticulosa
              atención al detalle y un profundo respeto por las mujeres que la visten. La
              filosofía de diseño de Amorina gira en torno a siluetas atemporales, telas
              nobles y la confianza serena que solo el verdadero estilo puede brindar.
            </p>

            <blockquote
              ref={quoteRef}
              className="pl-6 border-l-2 border-[#c9b99a]"
            >
              <p
                className="text-xl md:text-2xl font-light italic text-[#1a1814] leading-relaxed"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                &ldquo;La moda no es lo que usás — es cómo te hacés
                sentir a vos misma.&rdquo;
              </p>
              <cite className="mt-3 block text-[10px] tracking-[0.35em] uppercase text-[#8c8278] not-italic">
                — Amorina Clerici, Fundadora
              </cite>
            </blockquote>

            <button className="tl text-[11px] tracking-[0.32em] uppercase text-[#1a1814] border-b border-[#1a1814] pb-px hover:text-[#8c8278] hover:border-[#8c8278] transition-colors duration-300">
              Leer Historia Completa
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
