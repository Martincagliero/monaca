'use client';

import { Instagram, MessageCircle } from 'lucide-react';

const YEAR = new Date().getFullYear();

const FOOTER_LINKS = [
  { label: 'Colecciones', href: '#collections' },
  { label: 'Complementos', href: '#complementos' },
  { label: 'Looks', href: '#looks' },
  { label: 'Nosotras', href: '#about' },
  { label: 'Instagram', href: '#instagram' },
  { label: 'Contacto', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1814] border-t border-white/5 py-14 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-10">

          {/* Brand */}
          <div className="text-center md:text-left">
            <p
              className="text-[1.6rem] font-light tracking-[0.5em] text-white"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              MONACA
            </p>
            <p className="text-[#c9b99a]/35 text-[9px] tracking-[0.35em] uppercase mt-1">
              Moda Femenina Contemporánea
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#c9b99a]/45 text-[10px] tracking-[0.28em] uppercase hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/monaca.sunchales/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#c9b99a]/45 hover:text-white hover:border-white/25 transition-all duration-300"
            >
              <Instagram size={14} />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#c9b99a]/45 hover:text-[#25D366] hover:border-[#25D366]/30 transition-all duration-300"
            >
              <MessageCircle size={14} />
            </a>
          </div>
        </div>

        <div className="h-px bg-white/5 mb-7" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[#c9b99a]/25 text-[9px] tracking-[0.22em] uppercase">
          <p>&copy; {YEAR} Monaca. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#c9b99a]/55 transition-colors duration-200">Política de Privacidad</a>
            <a href="#" className="hover:text-[#c9b99a]/55 transition-colors duration-200">Términos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
