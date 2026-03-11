import Link from 'next/link';
import Image from 'next/image';

const LOOKS = [
  { id: 1, aspect: 'aspect-[3/4]', label: 'Look 01', src: '/monaca/ropa/ropa-07.jpg' },
  { id: 2, aspect: 'aspect-[2/3]', label: 'Look 02', src: '/monaca/ropa/ropa-08.jpg' },
  { id: 3, aspect: 'aspect-[3/5]', label: 'Look 03', src: '/monaca/ropa/ropa-09.jpg' },
  { id: 4, aspect: 'aspect-[4/5]', label: 'Look 04', src: '/monaca/ropa/ropa-10.jpg' },
  { id: 5, aspect: 'aspect-[2/3]', label: 'Look 05', src: '/monaca/ropa/ropa-11.jpg' },
  { id: 6, aspect: 'aspect-[4/5]', label: 'Look 06', src: '/monaca/ropa/ropa-12.jpg' },
  { id: 7, aspect: 'aspect-[3/4]', label: 'Look 07', src: '/monaca/ropa/ropa-13.jpg' },
  { id: 8, aspect: 'aspect-[2/3]', label: 'Look 08', src: '/monaca/ropa/ropa-14.jpg' },
  { id: 9, aspect: 'aspect-[3/4]', label: 'Look 09', src: '/monaca/ropa/ropa-15.jpg' },
  { id: 10, aspect: 'aspect-[3/5]', label: 'Look 10', src: '/monaca/ropa/ropa-16.jpg' },
  { id: 11, aspect: 'aspect-[2/3]', label: 'Look 11', src: '/monaca/ropa/ropa-17.jpg' },
  { id: 12, aspect: 'aspect-[4/5]', label: 'Look 12', src: '/monaca/ropa/ropa-18.jpg' },
  { id: 13, aspect: 'aspect-[3/4]', label: 'Look 13', src: '/monaca/ropa/ropa-19.jpg' },
  { id: 14, aspect: 'aspect-[2/3]', label: 'Look 14', src: '/monaca/ropa/ropa-20.jpg' },
];

export default function LooksPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 pb-20 pt-28 md:pt-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.55em] text-[#8c8278]">Editorial completa</p>
            <h1
              className="text-[clamp(2.2rem,6vw,5rem)] font-light tracking-[0.04em] text-[#1a1814]"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Todos los Looks
            </h1>
          </div>
          <Link
            href="/#looks"
            className="inline-flex w-fit border border-[#1a1814] px-8 py-3 text-[10px] uppercase tracking-[0.32em] text-[#1a1814] transition-all duration-300 hover:bg-[#1a1814] hover:text-white"
          >
            Volver al inicio
          </Link>
        </div>

        <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
          {LOOKS.map((look) => (
            <article
              key={look.id}
              className={`group relative mb-3 overflow-hidden break-inside-avoid ${look.aspect}`}
            >
              <Image
                src={look.src}
                alt={look.label}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-black/30">
                <span className="translate-y-3 text-[10px] uppercase tracking-[0.35em] text-white/0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-white/90">
                  {look.label}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
