import Link from 'next/link';
import Image from 'next/image';

const COLLECTIONS = [
  { id: 1, name: 'Sunchales Edit 01', subtitle: 'Primavera / Verano 2026', tag: 'Nueva Llegada', src: '/monaca/ropa/ropa-01.jpg' },
  { id: 2, name: 'Sunchales Edit 02', subtitle: 'Coleccion Resort', tag: 'Exclusiva', src: '/monaca/ropa/ropa-02.jpg' },
  { id: 3, name: 'Sunchales Edit 03', subtitle: 'Noche y Evento', tag: 'Limitada', src: '/monaca/ropa/ropa-03.jpg' },
  { id: 4, name: 'Sunchales Edit 04', subtitle: 'Lujo Cotidiano', tag: 'Mas Vendida', src: '/monaca/ropa/ropa-04.jpg' },
  { id: 5, name: 'Sunchales Edit 05', subtitle: 'Casual Chic', tag: 'Nueva', src: '/monaca/ropa/ropa-05.jpg' },
  { id: 6, name: 'Sunchales Edit 06', subtitle: 'Edicion Atelier', tag: 'Proximamente', src: '/monaca/ropa/ropa-06.jpg' },
  { id: 7, name: 'Sunchales Edit 07', subtitle: 'Capsula Urbana', tag: 'Destacada', src: '/monaca/ropa/ropa-07.jpg' },
  { id: 8, name: 'Sunchales Edit 08', subtitle: 'Silueta Premium', tag: 'Novedad', src: '/monaca/ropa/ropa-08.jpg' },
  { id: 9, name: 'Sunchales Edit 09', subtitle: 'Coleccion Soft', tag: 'Top', src: '/monaca/ropa/ropa-09.jpg' },
  { id: 10, name: 'Sunchales Edit 10', subtitle: 'Atelier 2026', tag: 'Limitada', src: '/monaca/ropa/ropa-10.jpg' },
  { id: 11, name: 'Sunchales Edit 11', subtitle: 'Noche Moderna', tag: 'Exclusiva', src: '/monaca/ropa/ropa-11.jpg' },
  { id: 12, name: 'Sunchales Edit 12', subtitle: 'Weekend Premium', tag: 'Nueva', src: '/monaca/ropa/ropa-12.jpg' },
];

export default function ColeccionesPage() {
  return (
    <main className="min-h-screen bg-white px-6 pb-20 pt-28 md:pt-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.55em] text-[#8c8278]">Catalogo completo</p>
            <h1
              className="text-[clamp(2.2rem,6vw,5rem)] font-light tracking-[0.04em] text-[#1a1814]"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Colecciones Monaca
            </h1>
          </div>
          <Link
            href="/#collections"
            className="inline-flex w-fit border border-[#1a1814] px-8 py-3 text-[10px] uppercase tracking-[0.32em] text-[#1a1814] transition-all duration-300 hover:bg-[#1a1814] hover:text-white"
          >
            Volver al inicio
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {COLLECTIONS.map((item) => (
            <article key={item.id} className="group relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
                <div className="absolute left-4 top-4 z-10">
                  <span className="bg-white/95 px-3 py-1.5 text-[9px] uppercase tracking-[0.3em] text-[#1a1814]">
                    {item.tag}
                  </span>
                </div>
              </div>
              <div className="pt-4">
                <h2
                  className="mb-1 text-xl font-light tracking-[0.08em] text-[#1a1814]"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {item.name}
                </h2>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#8c8278]">{item.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
