import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

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

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-white px-6 pb-20 pt-28 md:pt-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Instagram size={14} className="text-[#8c8278]" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#8c8278]">@monaca.sunchales</span>
            </div>
            <h1
              className="text-[clamp(2.2rem,6vw,5rem)] font-light tracking-[0.04em] text-[#1a1814]"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Feed Completo
            </h1>
          </div>
          <Link
            href="/#instagram"
            className="inline-flex w-fit border border-[#1a1814] px-8 py-3 text-[10px] uppercase tracking-[0.32em] text-[#1a1814] transition-all duration-300 hover:bg-[#1a1814] hover:text-white"
          >
            Volver al inicio
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-2.5">
          {FEED_IMAGES.map((src, i) => (
            <a
              key={src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden"
            >
              <Image
                src={src}
                alt={`Post ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-400 group-hover:bg-black/35">
                <Instagram
                  size={18}
                  className="text-transparent transition-colors duration-300 group-hover:text-white"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
