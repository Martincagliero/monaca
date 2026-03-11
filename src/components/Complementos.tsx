'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const HERO_ACCESSORY = '/monaca/complementos/complemento-01.jpg';

const CAT_CYCLE = ['Carteras', 'Bolsos', 'Mini Bags', 'Cinturones', 'Accesorios'] as const;

const ACC_ITEMS = Array.from({ length: 20 }, (_, i) => {
  const id = i + 1;
  const num = String(id).padStart(2, '0');
  return {
    id,
    name: `Sunchales Edit ${num}`,
    category: CAT_CYCLE[i % CAT_CYCLE.length],
    src: `/monaca/complementos/complemento-${num}.jpg`,
  };
});

export default function Complementos() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);

  const visibleItems = ACC_ITEMS.slice(0, 8);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, featureRef.current], {
        y: 55,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' },
      });

      gsap.utils.toArray<HTMLElement>('.acc-card').forEach((item, index) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: (index % 4) * 0.04,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 92%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="complementos" className="py-24 md:py-36 px-6 bg-[#f8f4ed]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p className="text-[10px] tracking-[0.55em] uppercase text-[#8c8278] mb-4">Línea Premium</p>
          <h2
            ref={titleRef}
            className="text-[clamp(2.4rem,6vw,5.3rem)] font-light tracking-[0.04em] text-[#1a1814]"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Complementos Monaca
          </h2>
          <p className="mt-4 max-w-xl text-sm md:text-base text-[#6f655b] leading-relaxed">
            Carteras, bolsos y accesorios con carácter editorial. Diseñados para elevar cada look
            con una estética sofisticada, contemporánea y atemporal.
          </p>
        </div>

        <div ref={featureRef} className="mb-12 md:mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={HERO_ACCESSORY}
              alt="Complemento destacado Monaca"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-[9px] tracking-[0.35em] uppercase text-white/75">Drop 01</p>
                <p
                  className="text-[clamp(1.6rem,3vw,2.3rem)] text-white font-light"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  Atelier Accessories
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-[#dfd2bf] bg-white/60 p-6 backdrop-blur-sm">
              <p className="text-[9px] tracking-[0.38em] uppercase text-[#8c8278] mb-3">Diseño</p>
              <p className="text-[#4f463d] leading-relaxed">
                Volúmenes limpios, herrajes sutiles y materiales seleccionados para una
                presencia elegante en cada detalle.
              </p>
            </div>
            <div className="rounded-3xl border border-[#dfd2bf] bg-white/60 p-6 backdrop-blur-sm">
              <p className="text-[9px] tracking-[0.38em] uppercase text-[#8c8278] mb-3">Versatilidad</p>
              <p className="text-[#4f463d] leading-relaxed">
                Piezas pensadas para día y noche, listas para acompañar el ritmo de una mujer
                actual con estilo propio.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {visibleItems.map((item) => (
            <motion.article
              key={item.id}
              className="acc-card group"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.28 }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/18 transition-colors duration-400" />
              </div>
              <div className="pt-3">
                <p className="text-[9px] tracking-[0.32em] uppercase text-[#8c8278]">{item.category}</p>
                <h3 className="mt-1 text-[1rem] text-[#1a1814] font-medium tracking-[0.02em]">{item.name}</h3>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/complementos"
            className="inline-flex px-10 py-3.5 border border-[#1a1814] text-[#1a1814] text-[10px] tracking-[0.32em] uppercase hover:bg-[#1a1814] hover:text-white transition-all duration-300"
          >
            Ver todos los complementos
          </Link>
        </div>
      </div>
    </section>
  );
}
