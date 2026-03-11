'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type StylePref = 'urbano' | 'elegante';
type TempBucket = 'cold' | 'mild' | 'warm';

type HeroLook = {
  id: string;
  name: string;
  note: string;
  src: string;
  styles: StylePref[];
  climate: TempBucket[];
  cityFocus?: string[];
  palette: { warm: number; dark: number };
};

const LOOKBOOK: HeroLook[] = [
  {
    id: '01',
    name: 'Abrigo Urbano en Capas',
    note: 'Estructura urbana',
    src: '/monaca/hero/look-01.jpg',
    styles: ['urbano'],
    climate: ['cold', 'mild'],
    cityFocus: ['buenos aires'],
    palette: { warm: 148, dark: 68 },
  },
  {
    id: '02',
    name: 'Atelier Neutro',
    note: 'Elegancia suave',
    src: '/monaca/hero/look-02.jpg',
    styles: ['elegante'],
    climate: ['mild', 'warm'],
    cityFocus: ['rosario'],
    palette: { warm: 184, dark: 84 },
  },
  {
    id: '03',
    name: 'Contraste de Pasarela',
    note: 'Textura nocturna',
    src: '/monaca/hero/look-03.jpg',
    styles: ['urbano', 'elegante'],
    climate: ['cold', 'mild'],
    palette: { warm: 166, dark: 76 },
  },
  {
    id: '04',
    name: 'Sastrería Esencial',
    note: 'Líneas premium',
    src: '/monaca/hero/look-04.jpg',
    styles: ['elegante'],
    climate: ['mild', 'warm'],
    cityFocus: ['sunchales'],
    palette: { warm: 176, dark: 82 },
  },
  {
    id: '05',
    name: 'Cápsula Urbana',
    note: 'Movimiento urbano',
    src: '/monaca/hero/look-05.jpg',
    styles: ['urbano'],
    climate: ['warm', 'mild'],
    cityFocus: ['rosario', 'cordoba'],
    palette: { warm: 194, dark: 92 },
  },
  {
    id: '06',
    name: 'Flujo Editorial',
    note: 'Clima de color',
    src: '/monaca/hero/look-06.jpg',
    styles: ['elegante', 'urbano'],
    climate: ['warm', 'mild'],
    cityFocus: ['buenos aires', 'rosario'],
    palette: { warm: 206, dark: 98 },
  },
];

const HERO_IMAGES = Array.from({ length: 6 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `/monaca/hero/look-${num}.jpg`;
});

const ROPA_IMAGES = Array.from({ length: 28 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `/monaca/ropa/ropa-${num}.jpg`;
});

const COMPLEMENTO_IMAGES = Array.from({ length: 20 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `/monaca/complementos/complemento-${num}.jpg`;
});

const CALOR_IMAGES = Array.from({ length: 4 }, (_, i) => {
  const num = i + 1;
  return `/monaca/hero/calor-${num}.jpg`;
});

const HERO_IMAGE_POOL = [...HERO_IMAGES, ...ROPA_IMAGES, ...COMPLEMENTO_IMAGES];

const CARD_POSITIONS = [
  { left: '52%', top: '11%', width: 'clamp(9rem,11vw,12rem)', rotate: -6, depth: 24 },
  { left: '72%', top: '10%', width: 'clamp(8.3rem,10vw,10.8rem)', rotate: 8, depth: 30 },
  { left: '73%', top: '48%', width: 'clamp(8.4rem,10.3vw,11rem)', rotate: 6, depth: 28 },
  { left: '53%', top: '57%', width: 'clamp(8.1rem,9.8vw,10.4rem)', rotate: -5, depth: 22 },
];

function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function seededShuffle<T>(arr: T[], seed: number) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const r = seededRandom(seed + i * 9973);
    const j = Math.floor(r * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function classifyTemp(value: number | null): TempBucket {
  if (value === null) return 'mild';
  if (value <= 16) return 'cold';
  if (value >= 24) return 'warm';
  return 'mild';
}

function buildHeroCopy(params: {
  city: string;
  tempBucket: TempBucket;
}) {
  const city = params.city.toLowerCase();

  if (city.includes('buenos aires')) {
    return {
      kicker: 'Edición Buenos Aires',
      titleA: 'Elegancia de atelier',
      titleB: 'para noches de ciudad',
      subtitle: 'Looks refinados para agenda premium: textura, corte y elegancia en cada salida.',
    };
  }

  if (city.includes('rosario')) {
    return {
      kicker: 'Edición Rosario',
      titleA: 'Color liviano',
      titleB: 'para días cálidos',
      subtitle: 'Prendas livianas, color y fluidez para una experiencia moderna y vibrante.',
    };
  }

  if (params.tempBucket === 'cold') {
    return {
      kicker: 'Edición adaptada al clima',
      titleA: 'Urbano cálido',
      titleB: 'con impronta editorial',
      subtitle: 'Portada ajustada por clima frío: capas funcionales y estilo premium para exterior.',
    };
  }

  if (params.tempBucket === 'warm') {
    return {
      kicker: 'Edición adaptada al clima',
      titleA: 'Premium liviano',
      titleB: 'con foco en color',
      subtitle: 'Portada ajustada por clima cálido: prendas ligeras y paleta más viva para el día.',
    };
  }

  return {
    kicker: 'Firma personalizada',
    titleA: 'Firma Monaca',
    titleB: 'para tu perfil',
    subtitle: 'Experiencia VIP: la portada adapta narrativa y composición según perfil y contexto.',
  };
}

function HeroInteractiveCanvas({
  active,
  accent,
  climate,
}: {
  active: boolean;
  accent: { warm: number; dark: number } | null;
  climate: TempBucket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef<{ warm: number; dark: number } | null>(accent);

  useEffect(() => {
    accentRef.current = accent;
  }, [accent]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    const target = { x: mouse.x, y: mouse.y };
    let scrollProgress = 0;

    const climateBoost = climate === 'cold' ? -10 : climate === 'warm' ? 16 : 0;
    const particles = Array.from({ length: active ? 26 : 14 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.62,
      vy: (Math.random() - 0.5) * 0.62,
      r: 28 + Math.random() * 82,
      phase: Math.random() * Math.PI * 2,
    }));

    const currentAccent = {
      warm: 176 + climateBoost,
      dark: 78,
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onLeave = () => {
      target.x = window.innerWidth * 0.5;
      target.y = window.innerHeight * 0.5;
    };

    const onScroll = () => {
      const max = Math.max(window.innerHeight, 1);
      scrollProgress = Math.min(window.scrollY / max, 1.6);
    };

    resize();
    onScroll();

    let raf = 0;
    let t = 0;

    const render = () => {
      t += 0.008;
      mouse.x += (target.x - mouse.x) * 0.08;
      mouse.y += (target.y - mouse.y) * 0.08;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, 'rgba(249, 242, 232, 0.62)');
      bg.addColorStop(1, 'rgba(240, 229, 211, 0.42)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'screen';

      const accentTone = accentRef.current;
      const targetWarm = (accentTone?.warm ?? 176) + climateBoost;
      const targetDark = accentTone?.dark ?? 78;
      currentAccent.warm += (targetWarm - currentAccent.warm) * 0.07;
      currentAccent.dark += (targetDark - currentAccent.dark) * 0.07;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -120) p.x = w + 120;
        if (p.x > w + 120) p.x = -120;
        if (p.y < -120) p.y = h + 120;
        if (p.y > h + 120) p.y = -120;

        const influenceX = (mouse.x - w * 0.5) * 0.0024 * ((i % 3) + 1);
        const influenceY = (mouse.y - h * 0.5) * 0.0024 * ((i % 2) + 1);
        const pulse = Math.sin(t + p.phase) * 12;
        const radius = p.r + pulse + scrollProgress * 9;

        const x = p.x + influenceX * 48;
        const y = p.y + influenceY * 48;

        const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const warm = Math.floor(currentAccent.warm + ((i * 11 + scrollProgress * 24) % 44));
        const dark = Math.floor(currentAccent.dark + ((i * 7 + scrollProgress * 14) % 24));

        g.addColorStop(0, `rgba(${warm}, ${dark + 20}, 45, 0.2)`);
        g.addColorStop(0.45, `rgba(${warm + 28}, ${dark + 32}, 62, 0.12)`);
        g.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = `rgba(105, 92, 78, ${0.08 + scrollProgress * 0.04})`;
      ctx.lineWidth = 0.6;

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.globalAlpha = (1 - dist / 180) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      raf = window.requestAnimationFrame(render);
    };

    raf = window.requestAnimationFrame(render);

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [active, climate]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[1] opacity-[0.95]" />;
}

function LookCard({ look }: { look: HeroLook }) {
  const [mediaError, setMediaError] = useState(false);

  return (
    <article className="group relative">
      <div className="pointer-events-none absolute -inset-2 rounded-[2rem] border border-white/45 opacity-60" />
      <div className="rounded-[1.65rem] border border-[#d9cbb8]/65 bg-white/40 p-3 backdrop-blur-[14px] shadow-[0_24px_90px_rgba(26,24,20,0.11)]">
        <div className="mb-3 flex items-center justify-between text-[8px] uppercase tracking-[0.35em] text-[#847769]">
          <span>{look.id}</span>
          <span>Monaca</span>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-[1.15rem] bg-[#e9dfd0]">
          {!mediaError && (
            <Image
              src={look.src}
              alt={look.name}
              fill
              sizes="(max-width: 768px) 40vw, 13vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setMediaError(true)}
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.16),transparent_40%,rgba(26,24,20,0.24))]" />
          {mediaError && (
            <div className="absolute bottom-3 left-3 right-3 rounded-full border border-white/35 bg-black/20 px-3 py-2 text-[8px] uppercase tracking-[0.35em] text-white/88 backdrop-blur-md">
              Imagen {look.src.split('/').pop()}
            </div>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between text-[#1a1814]">
          <div>
            <p className="text-[0.9rem] font-medium tracking-[0.04em]">{look.name}</p>
            <p className="mt-1 text-[8px] uppercase tracking-[0.35em] text-[#8c8278]">{look.note}</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#cfbfa7]/65 text-[#5a4f44]">
            <ArrowUpRight size={12} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeLook, setActiveLook] = useState<string | null>(null);
  const [refreshSeed, setRefreshSeed] = useState(1);
  const [rotationTick, setRotationTick] = useState(0);
  const [city, setCity] = useState('Sunchales');
  const [temperature, setTemperature] = useState<number | null>(null);
  const [tempBucket, setTempBucket] = useState<TempBucket>('mild');
  const [locating, setLocating] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRefreshSeed(Date.now());
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRotationTick((v) => v + 1);
    }, 4800);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1280);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const requestUserLocation = useCallback(() => {
    if (locating) return;

    if (!navigator.geolocation) {
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const [geoRes, weatherRes] = await Promise.all([
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`),
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`),
          ]);

          if (geoRes.ok) {
            const geo = await geoRes.json();
            const cityName = geo?.address?.city || geo?.address?.town || geo?.address?.village || geo?.address?.state;
            if (cityName) setCity(String(cityName));
          }

          if (weatherRes.ok) {
            const weather = await weatherRes.json();
            const currentTemp = weather?.current?.temperature_2m;
            if (typeof currentTemp === 'number') {
              setTemperature(currentTemp);
              setTempBucket(classifyTemp(currentTemp));
            }
          }

          // Regenerates edition to refresh visible recommendations after location updates.
          setRefreshSeed(Date.now());
        } catch {
          // Keep graceful fallback values if any external service fails.
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
      },
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 0 },
    );
  }, [locating]);

  const heroCopy = useMemo(
    () => buildHeroCopy({ city, tempBucket }),
    [city, tempBucket],
  );

  const personalizedLooks = useMemo(() => {
    const cityKey = city.toLowerCase();

    const scored = LOOKBOOK.map((look) => {
      let score = 0;
      if (look.climate.includes(tempBucket)) score += 2;
      if (look.cityFocus?.some((item) => cityKey.includes(item))) score += 4;
      return { look, score };
    });

    const strongest = scored.filter((item) => item.score >= 4).map((item) => item.look);
    const medium = scored.filter((item) => item.score >= 2).map((item) => item.look);
    const basePool = (strongest.length >= 4 ? strongest : medium.length >= 4 ? medium : LOOKBOOK);
    const randomized = seededShuffle(basePool, refreshSeed);

    return randomized.slice(0, 4);
  }, [city, tempBucket, refreshSeed]);

  const editionId = useMemo(() => {
    const base = Math.abs(refreshSeed).toString(36).toUpperCase();
    return `MN-${base.slice(-4).padStart(4, '0')}`;
  }, [refreshSeed]);

  const climateLabel = useMemo(() => {
    if (tempBucket === 'cold') return 'frío';
    if (tempBucket === 'warm') return 'cálido';
    return 'templado';
  }, [tempBucket]);

  const selectedImagePool = useMemo(() => {
    if (tempBucket === 'warm') return CALOR_IMAGES;
    return HERO_IMAGE_POOL;
  }, [tempBucket]);

  const activeAccent = personalizedLooks.find((item) => item.id === activeLook)?.palette ?? null;

  const rotatingLooks = useMemo(() => {
    const poolSize = selectedImagePool.length;
    const base = Math.abs(refreshSeed + rotationTick * 13);

    return personalizedLooks.map((look, index) => {
      const imageIndex = (base + index * 17) % poolSize;
      return {
        ...look,
        src: selectedImagePool[imageIndex],
      };
    });
  }, [personalizedLooks, refreshSeed, rotationTick, selectedImagePool]);

  const mobileHeroImage = useMemo(() => {
    if (tempBucket === 'warm') return CALOR_IMAGES[0];
    return '/monaca/hero/look-02.jpg';
  }, [tempBucket]);

  const activeAccentFromVisible = rotatingLooks.find((item) => item.id === activeLook)?.palette ?? null;

  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, { autoAlpha: 0, y: 28, scale: 0.92 });
      gsap.set([contentRef.current, titleRef.current, subtitleRef.current, actionsRef.current, statsRef.current, scrollHintRef.current], {
        autoAlpha: 0,
        y: 24,
      });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(tintRef.current, { autoAlpha: 0.06 });

      personalizedLooks.forEach((_, i) => {
        gsap.set(cardsRef.current[i], { rotation: CARD_POSITIONS[i].rotate });
      });

      const tl = gsap.timeline({ delay: 0.08 });

      tl.to(contentRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.88, ease: 'power3.out' }, '-=0.55')
        .to(lineRef.current, { scaleX: 1, duration: 0.65, ease: 'expo.out' }, '-=0.3')
        .to(subtitleRef.current, { autoAlpha: 1, y: 0, duration: 0.58, ease: 'power2.out' }, '-=0.32')
        .to(actionsRef.current, { autoAlpha: 1, y: 0, duration: 0.48, ease: 'power2.out' }, '-=0.2')
        .to(statsRef.current, { autoAlpha: 1, y: 0, duration: 0.54, ease: 'power2.out' }, '-=0.15')
        .to(cardsRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        }, '-=0.52')
        .to(scrollHintRef.current, { autoAlpha: 1, y: 0, duration: 0.44 }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop, personalizedLooks]);

  useEffect(() => {
    if (!isDesktop) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cardTweens = cardsRef.current.map((el) =>
      el
        ? {
            x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3.out' }),
            y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3.out' }),
            rotateX: gsap.quickTo(el, 'rotateX', { duration: 0.8, ease: 'power2.out' }),
            rotateY: gsap.quickTo(el, 'rotateY', { duration: 0.8, ease: 'power2.out' }),
          }
        : null,
    );

    const glowX = gsap.quickTo(glowRef.current, 'x', { duration: 1.2, ease: 'power3.out' });
    const glowY = gsap.quickTo(glowRef.current, 'y', { duration: 1.2, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      glowX(dx * 70);
      glowY(dy * 45);

      personalizedLooks.forEach((_, i) => {
        cardTweens[i]?.x(dx * CARD_POSITIONS[i].depth);
        cardTweens[i]?.y(dy * CARD_POSITIONS[i].depth);
        cardTweens[i]?.rotateX(dy * -5);
        cardTweens[i]?.rotateY(dx * 7);
      });
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', onMove);
    return () => section?.removeEventListener('mousemove', onMove);
  }, [isDesktop, personalizedLooks]);

  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=860',
          pin: true,
          scrub: 1.12,
          anticipatePin: 1,
        },
      });

      tl.to(scrollHintRef.current, { autoAlpha: 0, duration: 0.2 }, 0);
      tl.to(tintRef.current, { autoAlpha: 0.34, duration: 0.8 }, 0.08);
      tl.to(cardsRef.current, {
        rotation: 0,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      }, 0.05);
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen w-full overflow-hidden bg-[#f8f3ea]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(209,188,155,0.25),transparent_38%),radial-gradient(circle_at_82%_20%,rgba(81,63,43,0.2),transparent_44%),linear-gradient(180deg,#f8f3ea_0%,#efe5d7_100%)]" />
      <HeroInteractiveCanvas active={isDesktop} accent={activeAccentFromVisible ?? activeAccent} climate={tempBucket} />
      <div className="hero-grid absolute inset-0 opacity-[0.22]" />
      <div className="hero-noise absolute inset-0 opacity-[0.2] mix-blend-multiply" />
      <div
        ref={tintRef}
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(122deg,rgba(76,58,39,0.24),transparent_45%,rgba(201,177,144,0.22))]"
      />

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.92) 0%, rgba(236,221,197,0.45) 40%, rgba(236,221,197,0) 72%)',
        }}
      />

      {!isDesktop && (
        <div className="absolute inset-0 z-10">
          <Image
            src={mobileHeroImage}
            alt="Portada de Monaca"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-black/55" />
        </div>
      )}

      {isDesktop && rotatingLooks.map((look, i) => (
        <div
          key={look.id}
          ref={(el) => { cardsRef.current[i] = el; }}
          className="absolute z-20 [transform-style:preserve-3d]"
          style={{
            left: CARD_POSITIONS[i].left,
            top: CARD_POSITIONS[i].top,
            width: CARD_POSITIONS[i].width,
            perspective: '1200px',
          }}
          onMouseEnter={() => setActiveLook(look.id)}
          onMouseLeave={() => setActiveLook(null)}
        >
          <LookCard look={look} />
        </div>
      ))}

      <div ref={contentRef} className={`pointer-events-auto relative z-30 flex h-full items-center px-6 md:px-10 lg:px-16 ${isDesktop ? '' : 'justify-center text-center'}`}>
        <div className={`w-full ${isDesktop ? 'max-w-[42rem] 2xl:max-w-[45rem]' : 'max-w-[36rem] text-white'}`}>
          <p className={`mb-5 text-[9px] uppercase tracking-[0.46em] sm:text-[10px] sm:tracking-[0.58em] ${isDesktop ? 'text-[#7e7266]' : 'text-white/75'}`}>
            {heroCopy.kicker}
          </p>

          <h1
            ref={titleRef}
            className={`text-[clamp(2.5rem,9vw,6.9rem)] font-light uppercase leading-[0.88] tracking-[0.1em] ${isDesktop ? 'text-[#1a1713]' : 'text-white'}`}
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {heroCopy.titleA}
            <span className={`block ${isDesktop ? 'text-[#4d4339]' : 'text-white/90'}`}>{heroCopy.titleB}</span>
          </h1>

          <div className="mt-7 w-full max-w-[36rem]">
            <div ref={lineRef} className={`h-px w-full ${isDesktop ? 'bg-gradient-to-r from-[#3f352b] via-[#b9a489] to-transparent' : 'bg-gradient-to-r from-white/70 via-white/35 to-transparent'}`} />
          </div>

          <p
            ref={subtitleRef}
            className={`mt-6 max-w-[34rem] text-[10px] uppercase tracking-[0.22em] leading-relaxed md:text-[11px] md:tracking-[0.28em] ${isDesktop ? 'text-[#6a5f54]' : 'text-white/88'}`}
          >
            {heroCopy.subtitle}
          </p>

          <div ref={actionsRef} className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#collections"
              className={`inline-flex items-center justify-center border px-8 py-3 text-[10px] uppercase tracking-[0.34em] transition-all duration-300 ${isDesktop ? 'border-[#1a1713] text-[#1a1713] hover:bg-[#1a1713] hover:text-white' : 'border-white/85 text-white hover:bg-white hover:text-[#1a1713]'}`}
            >
              Ver colección
            </a>
            <a
              href="#contact"
              className={`inline-flex items-center justify-center border px-8 py-3 text-[10px] uppercase tracking-[0.34em] transition-all duration-300 ${isDesktop ? 'border-[#b6a082] text-[#5a4f43] hover:bg-[#ecdfcd]' : 'border-white/55 text-white/90 hover:bg-white/15'}`}
            >
              Reservar asesoramiento
            </a>
            <button
              onClick={requestUserLocation}
              disabled={locating}
              className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-[9px] uppercase tracking-[0.28em] transition-all duration-300 ${isDesktop ? 'border-[#c7b79f] bg-white/70 text-[#5f5346] hover:bg-[#f3eadf]' : 'border-white/55 bg-black/20 text-white/90 hover:bg-white/15'}`}
            >
              {locating ? 'Detectando ubicación...' : 'Detectar ubicación y clima'}
            </button>
          </div>

          <div ref={statsRef} className="mt-8 grid w-full max-w-[31rem] grid-cols-1 gap-3 sm:grid-cols-3">
            <div className={`rounded-2xl border px-4 py-3 ${isDesktop ? 'border-[#d9ccb9] bg-white/55' : 'border-white/35 bg-black/20'}`}>
              <p className={`text-[8px] uppercase tracking-[0.34em] ${isDesktop ? 'text-[#867a6e]' : 'text-white/75'}`}>Ubicación</p>
              <p className={`mt-2 text-sm ${isDesktop ? 'text-[#1a1713]' : 'text-white'}`}>{city}</p>
            </div>
            <div className={`rounded-2xl border px-4 py-3 ${isDesktop ? 'border-[#d9ccb9] bg-white/55' : 'border-white/35 bg-black/20'}`}>
              <p className={`text-[8px] uppercase tracking-[0.34em] ${isDesktop ? 'text-[#867a6e]' : 'text-white/75'}`}>Temperatura</p>
              <p className={`mt-2 text-sm ${isDesktop ? 'text-[#1a1713]' : 'text-white'}`}>
                {typeof temperature === 'number' ? `${Math.round(temperature)}°C` : '--'}
              </p>
            </div>
            <div className={`rounded-2xl border px-4 py-3 ${isDesktop ? 'border-[#d9ccb9] bg-white/55' : 'border-white/35 bg-black/20'}`}>
              <p className={`text-[8px] uppercase tracking-[0.34em] ${isDesktop ? 'text-[#867a6e]' : 'text-white/75'}`}>Clima</p>
              <p className={`mt-2 text-sm capitalize ${isDesktop ? 'text-[#1a1713]' : 'text-white'}`}>{climateLabel}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-[#8c8278]/75"
      >
        <span className="text-[8px] uppercase tracking-[0.5em]">Deslizar</span>
        <div className="h-9 w-px bg-gradient-to-b from-[#8c8278]/50 to-transparent" />
        <ChevronDown size={11} className="animate-bounce" />
      </div>
    </section>
  );
}
