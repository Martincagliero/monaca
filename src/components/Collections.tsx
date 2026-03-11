'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const COLLECTIONS = [
  { id: 1, name: 'Sunchales Edit 01', subtitle: 'Primavera / Verano 2026', tag: 'Nueva Llegada', src: '/monaca/ropa/ropa-01.jpg' },
  { id: 2, name: 'Sunchales Edit 02', subtitle: 'Colección Resort', tag: 'Exclusiva', src: '/monaca/ropa/ropa-02.jpg' },
  { id: 3, name: 'Sunchales Edit 03', subtitle: 'Noche y Evento', tag: 'Limitada', src: '/monaca/ropa/ropa-03.jpg' },
  { id: 4, name: 'Sunchales Edit 04', subtitle: 'Lujo Cotidiano', tag: 'Más Vendida', src: '/monaca/ropa/ropa-04.jpg' },
  { id: 5, name: 'Sunchales Edit 05', subtitle: 'Casual Chic', tag: 'Nueva', src: '/monaca/ropa/ropa-05.jpg' },
  { id: 6, name: 'Sunchales Edit 06', subtitle: 'Edición Atelier', tag: 'Próximamente', src: '/monaca/ropa/ropa-06.jpg' },
  { id: 7, name: 'Sunchales Edit 07', subtitle: 'Cápsula Urbana', tag: 'Destacada', src: '/monaca/ropa/ropa-07.jpg' },
  { id: 8, name: 'Sunchales Edit 08', subtitle: 'Silueta Premium', tag: 'Novedad', src: '/monaca/ropa/ropa-08.jpg' },
  { id: 9, name: 'Sunchales Edit 09', subtitle: 'Colección Soft', tag: 'Top', src: '/monaca/ropa/ropa-09.jpg' },
  { id: 10, name: 'Sunchales Edit 10', subtitle: 'Atelier 2026', tag: 'Limitada', src: '/monaca/ropa/ropa-10.jpg' },
  { id: 11, name: 'Sunchales Edit 11', subtitle: 'Noche Moderna', tag: 'Exclusiva', src: '/monaca/ropa/ropa-11.jpg' },
  { id: 12, name: 'Sunchales Edit 12', subtitle: 'Weekend Premium', tag: 'Nueva', src: '/monaca/ropa/ropa-12.jpg' },
];

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const visibleItems = COLLECTIONS.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });

      gsap.utils.toArray<HTMLElement>('.c-card').forEach((card, i) => {
        gsap.from(card, {
          y: 80, opacity: 0, duration: 0.9, ease: 'power3.out',
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: card, start: 'top 92%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="collections" className="py-24 md:py-36 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.55em] uppercase text-[#8c8278] mb-4">
              Curadas para vos
            </p>
            <h2
              ref={titleRef}
              className="text-[clamp(2.2rem,6vw,5rem)] font-light tracking-[0.04em] text-[#1a1814] leading-tight"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Colecciones Monaca
            </h2>
          </div>
          <p className="text-sm text-[#8c8278] max-w-xs leading-relaxed">
            Cada pieza cuenta una historia — creada con intención, usada con gracia.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleItems.map((item) => (
            <motion.div
              key={item.id}
              className="c-card group relative"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Hover darkening */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                {/* Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/95 text-[#1a1814] text-[9px] tracking-[0.3em] uppercase px-3 py-1.5">
                    {item.tag}
                  </span>
                </div>

                {/* Slide-up CTA */}
                <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-[400ms] ease-out">
                  <button className="w-full bg-white text-[#1a1814] text-[10px] tracking-[0.3em] uppercase py-3.5 hover:bg-[#f5f0e8] transition-colors duration-200">
                    Ver cápsula
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="pt-4">
                <h3
                  className="text-xl font-light tracking-[0.08em] text-[#1a1814] mb-1"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {item.name}
                </h3>
                <p className="text-[10px] text-[#8c8278] tracking-[0.25em] uppercase">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/colecciones"
            className="inline-flex px-11 py-4 border border-[#1a1814] text-[#1a1814] text-[11px] tracking-[0.32em] uppercase hover:bg-[#1a1814] hover:text-white transition-all duration-300"
          >
            Ver colección completa
          </Link>
        </div>
      </div>
    </section>
  );
}
