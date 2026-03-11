'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Colecciones', href: '#collections' },
  { label: 'Complementos', href: '#complementos' },
  { label: 'Looks', href: '#looks' },
  { label: 'Nosotras', href: '#about' },
  { label: 'Contacto', href: '#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (!isHome) {
      window.location.href = `/${href}`;
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const solidNav = !isHome || scrolled;

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          solidNav
            ? 'bg-white/92 backdrop-blur-sm border-b border-[#ede4d4]/60 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`text-lg font-light tracking-[0.45em] transition-colors duration-400 ${
              solidNav ? 'text-[#1a1814]' : 'text-white'
            }`}
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            MONACA
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`relative text-[11px] tracking-[0.28em] uppercase transition-colors duration-300 group ${
                  solidNav ? 'text-[#2c2620]' : 'text-white/90'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-400 ${
                    solidNav ? 'bg-[#2c2620]' : 'bg-white'
                  }`}
                />
              </button>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              className={`text-[11px] tracking-[0.22em] uppercase px-6 py-2.5 border transition-all duration-300 hover:bg-[#1a1814] hover:text-white hover:border-[#1a1814] ${
                solidNav
                  ? 'border-[#2c2620] text-[#2c2620]'
                  : 'border-white/80 text-white'
              }`}
            >
              Comprar
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Alternar menú"
          >
            {menuOpen ? (
              <X size={20} className="text-[#1a1814]" />
            ) : (
              <Menu size={20} className={solidNav ? 'text-[#1a1814]' : 'text-white'} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99] bg-[#faf8f5] flex flex-col items-center justify-center gap-9"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                onClick={() => scrollTo(link.href)}
                className="text-[clamp(2rem,6vw,2.8rem)] font-light tracking-[0.3em] text-[#1a1814] uppercase"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
