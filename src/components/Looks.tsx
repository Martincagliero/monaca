'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const LOOKS = [
  { id: 1, aspect: 'aspect-[3/4]', label: 'Estilo 01', src: '/monaca/ropa/ropa-07.jpg' },
  { id: 2, aspect: 'aspect-[2/3]', label: 'Estilo 02', src: '/monaca/ropa/ropa-08.jpg' },
  { id: 3, aspect: 'aspect-[3/5]', label: 'Estilo 03', src: '/monaca/ropa/ropa-09.jpg' },
  { id: 4, aspect: 'aspect-[4/5]', label: 'Estilo 04', src: '/monaca/ropa/ropa-10.jpg' },
  { id: 5, aspect: 'aspect-[2/3]', label: 'Estilo 05', src: '/monaca/ropa/ropa-11.jpg' },
  { id: 6, aspect: 'aspect-[4/5]', label: 'Estilo 06', src: '/monaca/ropa/ropa-12.jpg' },
  { id: 7, aspect: 'aspect-[3/4]', label: 'Estilo 07', src: '/monaca/ropa/ropa-13.jpg' },
  { id: 8, aspect: 'aspect-[2/3]', label: 'Estilo 08', src: '/monaca/ropa/ropa-14.jpg' },
  { id: 9, aspect: 'aspect-[3/4]', label: 'Estilo 09', src: '/monaca/ropa/ropa-15.jpg' },
  { id: 10, aspect: 'aspect-[3/5]', label: 'Estilo 10', src: '/monaca/ropa/ropa-16.jpg' },
  { id: 11, aspect: 'aspect-[2/3]', label: 'Estilo 11', src: '/monaca/ropa/ropa-17.jpg' },
  { id: 12, aspect: 'aspect-[4/5]', label: 'Estilo 12', src: '/monaca/ropa/ropa-18.jpg' },
  { id: 13, aspect: 'aspect-[3/4]', label: 'Estilo 13', src: '/monaca/ropa/ropa-19.jpg' },
  { id: 14, aspect: 'aspect-[2/3]', label: 'Estilo 14', src: '/monaca/ropa/ropa-20.jpg' },
];

export default function Looks() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const visibleLooks = LOOKS.slice(0, 8);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });

      gsap.utils.toArray<HTMLElement>('.look-item').forEach((item) => {
        gsap.from(item, {
          y: 55, opacity: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 94%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="looks" className="py-24 md:py-36 px-6 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 md:mb-20 text-center">
          <p className="text-[10px] tracking-[0.55em] uppercase text-[#8c8278] mb-4">Editorial</p>
          <h2
            ref={titleRef}
            className="text-[clamp(2.2rem,6vw,5rem)] font-light tracking-[0.04em] text-[#1a1814]"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Estilos e inspiración
          </h2>
          <p className="mt-4 text-sm text-[#8c8278] max-w-sm mx-auto leading-relaxed">
            La moda como arte, como identidad, como expresión.
          </p>
        </div>

        {/* Masonry — CSS columns approach */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {visibleLooks.map((look) => (
            <motion.div
              key={look.id}
              className={`look-item break-inside-avoid mb-3 relative overflow-hidden group ${look.aspect}`}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Image
                src={look.src}
                alt={look.label}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                <span className="text-white/0 group-hover:text-white/90 text-[10px] tracking-[0.35em] uppercase transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                  {look.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/looks"
            className="inline-flex px-10 py-3.5 border border-[#1a1814] text-[#1a1814] text-[10px] tracking-[0.32em] uppercase hover:bg-[#1a1814] hover:text-white transition-all duration-300"
          >
            Ver todos los estilos
          </Link>
        </div>
      </div>
    </section>
  );
}
