'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Instagram, MapPin, Mail, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type FormData = { name: string; email: string; message: string };

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      });
      gsap.from(formRef.current, {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.25,
        scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fields = [
    { id: 'name',  label: 'Tu Nombre',  type: 'text',  placeholder: 'Amorina' },
    { id: 'email', label: 'Tu Email', type: 'email', placeholder: 'hola@email.com' },
  ] as const;

  const CONTACT_ITEMS = [
    {
      icon: <MessageCircle size={17} className="text-[#25D366]" />,
      iconBg: 'bg-[#25D366]/15 border-[#25D366]/25',
      label: 'WhatsApp',
      sub: 'Chateá con nosotras',
      href: 'https://wa.me/1234567890?text=Hola%20Monaca!%20Quisiera%20saber%20más%20sobre%20sus%20colecciones.',
    },
    {
      icon: <Instagram size={17} className="text-[#c9b99a]" />,
      iconBg: 'bg-[#c9b99a]/10 border-[#c9b99a]/20',
      label: 'Instagram',
      sub: '@monaca.sunchales',
      href: 'https://www.instagram.com/monaca.sunchales/',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-36 px-6 bg-[#1a1814] overflow-hidden"
    >
      {/* Decorative rings */}
      <div className="pointer-events-none absolute top-24 right-24 w-72 h-72 rounded-full border border-[#c9b99a]/8" />
      <div className="pointer-events-none absolute bottom-24 left-10 w-44 h-44 rounded-full border border-[#c9b99a]/8" />
      <div className="pointer-events-none absolute top-1/2 left-1/3 w-px h-32 bg-gradient-to-b from-[#c9b99a]/15 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p className="text-[10px] tracking-[0.55em] uppercase text-[#c9b99a]/55 mb-5">
            Escribinos
          </p>
          <h2
            ref={titleRef}
            className="text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[0.03em] text-white leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Hablemos de<br />
            <em>Moda</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* ── Contact info ────────────────────────────────────────────── */}
          <div className="space-y-10">
            <p className="text-[#c9b99a]/65 leading-relaxed text-sm md:text-base">
              ¿Tenés una consulta sobre nuestras colecciones, querés reservar una sesión de
              styling o simplemente conectarte? Nos encantaría saber de vos.
            </p>

            <div className="space-y-5">
              {CONTACT_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center flex-shrink-0 transition-opacity duration-300 ${item.iconBg} group-hover:opacity-80`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white text-sm tracking-[0.08em]">{item.label}</p>
                    <p className="text-[#c9b99a]/45 text-xs tracking-[0.2em]">{item.sub}</p>
                  </div>
                  <ArrowRight
                    size={13}
                    className="ml-auto text-[#c9b99a]/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#c9b99a]/60"
                  />
                </a>
              ))}

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#c9b99a]/20 bg-[#c9b99a]/8 flex items-center justify-center flex-shrink-0">
                  <MapPin size={17} className="text-[#c9b99a]" />
                </div>
                <div>
                  <p className="text-white text-sm tracking-[0.08em]">Dónde Estamos</p>
                  <p className="text-[#c9b99a]/45 text-xs tracking-[0.2em]">Sunchales, Santa Fe, Argentina</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#c9b99a]/20 bg-[#c9b99a]/8 flex items-center justify-center flex-shrink-0">
                  <Mail size={17} className="text-[#c9b99a]" />
                </div>
                <div>
                  <p className="text-white text-sm tracking-[0.08em]">Correo</p>
                  <p className="text-[#c9b99a]/45 text-xs tracking-[0.2em]">hola@monaca.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Form ────────────────────────────────────────────────────── */}
          <div ref={formRef}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  {fields.map((field) => (
                    <div key={field.id} className="relative pt-5">
                      <label
                        htmlFor={field.id}
                        className={`absolute left-0 text-[10px] tracking-[0.35em] uppercase transition-all duration-300 ${
                          focused === field.id || form[field.id]
                            ? 'top-0 text-[#c9b99a]/70'
                            : 'top-5 text-[#c9b99a]/35'
                        }`}
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        value={form[field.id]}
                        onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                        onFocus={() => setFocused(field.id)}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-transparent border-b border-[#c9b99a]/18 focus:border-[#c9b99a]/55 text-white text-sm pt-1 pb-2.5 outline-none transition-colors duration-300 placeholder:text-transparent"
                        placeholder={field.placeholder}
                        required
                      />
                    </div>
                  ))}

                  <div className="relative pt-5">
                    <label
                      htmlFor="message"
                      className={`absolute left-0 text-[10px] tracking-[0.35em] uppercase transition-all duration-300 ${
                        focused === 'message' || form.message
                          ? 'top-0 text-[#c9b99a]/70'
                          : 'top-5 text-[#c9b99a]/35'
                      }`}
                    >
                      Tu Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent border-b border-[#c9b99a]/18 focus:border-[#c9b99a]/55 text-white text-sm pt-1 pb-2.5 outline-none resize-none transition-colors duration-300 placeholder:text-transparent"
                      placeholder="Contanos sobre vos"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-white group mt-2"
                  >
                    <span className="relative">
                      Enviar Mensaje
                      <span className="absolute -bottom-0.5 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </span>
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="py-16 space-y-5"
                >
                  <div className="w-12 h-px bg-[#c9b99a]" />
                  <h3
                    className="text-3xl font-light text-white"
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    Gracias.
                  </h3>
                  <p className="text-[#c9b99a]/55 text-sm leading-relaxed max-w-sm">
                    Recibimos tu mensaje y te contactaremos pronto. Seguinos en
                    Instagram para inspiración diaria.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
