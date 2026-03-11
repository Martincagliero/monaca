'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEED_IMAGES = [
  '/monaca/ropa/ropa-21.jpg',
  '/monaca/ropa/ropa-22.jpg',
  '/monaca/ropa/ropa-23.jpg',
  '/monaca/ropa/ropa-24.jpg',
  '/monaca/ropa/ropa-25.jpg',
  '/monaca/ropa/ropa-26.jpg',
  '/monaca/ropa/ropa-27.jpg',
  '/monaca/ropa/ropa-28.jpg',
];

const INSTAGRAM_URL = 'https://www.instagram.com/monaca.sunchales/';

export default function InstagramSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const visibleFeed = FEED_IMAGES.slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });

      gsap.utils.toArray<HTMLElement>('.ig-post').forEach((el, i) => {
        gsap.from(el, {
          scale: 0.88, opacity: 0, duration: 0.65, ease: 'power3.out',
          delay: i * 0.055,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="instagram" className="py-24 md:py-36 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram size={14} className="text-[#8c8278]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#8c8278]">
              @monaca.sunchales
            </span>
          </div>
          <h2
            ref={titleRef}
            className="text-[clamp(2.2rem,6vw,5rem)] font-light tracking-[0.04em] text-[#1a1814]"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Universo Monaca
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-2.5">
          {visibleFeed.map((src, i) => (
            <motion.a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-post relative aspect-square overflow-hidden group block"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.35 }}
            >
              <Image
                src={src}
                alt={`Post ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-400 flex items-center justify-center">
                <Instagram
                  size={18}
                  className="text-transparent group-hover:text-white transition-colors duration-300"
                />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/feed"
            className="inline-flex px-10 py-3.5 border border-[#1a1814] text-[#1a1814] text-[10px] tracking-[0.32em] uppercase hover:bg-[#1a1814] hover:text-white transition-all duration-300"
          >
            Ver todo el feed
          </Link>
        </div>

        {/* Follow link */}
        <div className="mt-10 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#1a1814] border-b border-[#1a1814] pb-px hover:text-[#8c8278] hover:border-[#8c8278] transition-colors duration-300"
          >
            <Instagram size={12} />
            Seguinos en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
