import Link from 'next/link';
import Image from 'next/image';

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

export default function ComplementosPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ed] px-6 pb-20 pt-28 md:pt-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.55em] text-[#8c8278]">Linea completa</p>
            <h1
              className="text-[clamp(2.2rem,6vw,5rem)] font-light tracking-[0.04em] text-[#1a1814]"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Todos los Complementos
            </h1>
          </div>
          <Link
            href="/#complementos"
            className="inline-flex w-fit border border-[#1a1814] px-8 py-3 text-[10px] uppercase tracking-[0.32em] text-[#1a1814] transition-all duration-300 hover:bg-[#1a1814] hover:text-white"
          >
            Volver al inicio
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {ACC_ITEMS.map((item) => (
            <article key={item.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-400 group-hover:bg-black/18" />
              </div>
              <div className="pt-3">
                <p className="text-[9px] uppercase tracking-[0.32em] text-[#8c8278]">{item.category}</p>
                <h2 className="mt-1 text-[1rem] font-medium tracking-[0.02em] text-[#1a1814]">{item.name}</h2>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
