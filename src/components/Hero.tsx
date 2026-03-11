'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, MapPin, RefreshCw, ThermometerSun } from 'lucide-react';

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
    name: 'Sastreria Esencial',
    note: 'Lineas premium',
    src: '/monaca/hero/look-04.jpg',
    styles: ['elegante'],
    climate: ['mild', 'warm'],
    cityFocus: ['sunchales'],
    palette: { warm: 176, dark: 82 },
  },
  {
    id: '05',
    name: 'Capsula Urbana',
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

const HERO_IMAGES = Array.from({ length: 6 }, (_, i) => `/monaca/hero/look-${String(i + 1).padStart(2, '0')}.jpg`);
const ROPA_IMAGES = Array.from({ length: 28 }, (_, i) => `/monaca/ropa/ropa-${String(i + 1).padStart(2, '0')}.jpg`);
const CALOR_IMAGES = Array.from({ length: 4 }, (_, i) => `/monaca/hero/calor-${i + 1}.jpg`);
const COLD_IMAGES = [...HERO_IMAGES, ...ROPA_IMAGES.slice(0, 10)];
const MILD_IMAGES = [...HERO_IMAGES, ...ROPA_IMAGES.slice(10, 20)];
const WARM_IMAGES = [...CALOR_IMAGES, ...ROPA_IMAGES.slice(20, 28)];

function classifyTemp(value: number | null): TempBucket {
  if (value === null) return 'mild';
  if (value <= 16) return 'cold';
  if (value >= 24) return 'warm';
  return 'mild';
}

function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function seededShuffle<T>(arr: T[], seed: number) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const r = seededRandom(seed + i * 7919);
    const j = Math.floor(r * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildHeroCopy(city: string, tempBucket: TempBucket) {
  const cityKey = city.toLowerCase();

  if (cityKey.includes('buenos aires')) {
    return {
      kicker: 'Edicion Buenos Aires',
      titleA: 'Silueta urbana',
      titleB: 'de alto impacto',
      subtitle: 'Prendas pensadas para una agenda activa, elegante y contemporanea.',
    };
  }

  if (cityKey.includes('rosario')) {
    return {
      kicker: 'Edicion Rosario',
      titleA: 'Color liviano',
      titleB: 'para dias calidos',
      subtitle: 'Texturas fluidas y tonos luminosos para una presencia fresca y premium.',
    };
  }

  if (tempBucket === 'cold') {
    return {
      kicker: 'Seleccion por clima frio',
      titleA: 'Capas premium',
      titleB: 'con actitud editorial',
      subtitle: 'Looks con estructura y abrigo para mantener identidad en bajas temperaturas.',
    };
  }

  if (tempBucket === 'warm') {
    return {
      kicker: 'Seleccion por clima calido',
      titleA: 'Ligereza elegante',
      titleB: 'con foco en color',
      subtitle: 'Prendas livianas y versatiles para dias calidos sin perder sofisticacion.',
    };
  }

  return {
    kicker: 'Firma personalizada',
    titleA: 'Monaca',
    titleB: 'hecho para vos',
    subtitle: 'Una portada que combina clima y contexto para mostrar la mejor seleccion.',
  };
}

export default function Hero() {
  const [city, setCity] = useState('Sunchales');
  const [temperature, setTemperature] = useState<number | null>(null);
  const [tempBucket, setTempBucket] = useState<TempBucket>('mild');
  const [locating, setLocating] = useState(false);
  const [refreshSeed, setRefreshSeed] = useState(() => Date.now());
  const [activeIndex, setActiveIndex] = useState(0);

  const requestUserLocation = useCallback(() => {
    if (locating || !navigator.geolocation) return;

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const [geoRes, weatherRes] = await Promise.all([
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`),
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&current_weather=true`),
          ]);

          if (geoRes.ok) {
            const geo = await geoRes.json();
            const cityName = geo?.address?.city || geo?.address?.town || geo?.address?.village || geo?.address?.state;
            if (cityName) setCity(String(cityName));
          }

          if (weatherRes.ok) {
            const weather = await weatherRes.json();
            const currentTemp = weather?.current?.temperature_2m ?? weather?.current_weather?.temperature;
            if (typeof currentTemp === 'number') {
              setTemperature(currentTemp);
              setTempBucket(classifyTemp(currentTemp));
            }
          }

          setRefreshSeed(Date.now());
        } finally {
          setLocating(false);
        }
      },
      () => setLocating(false),
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 0 },
    );
  }, [locating]);

  const heroCopy = useMemo(() => buildHeroCopy(city, tempBucket), [city, tempBucket]);

  const personalizedLooks = useMemo(() => {
    const cityKey = city.toLowerCase();

    const scored = LOOKBOOK.map((look) => {
      let score = 0;
      if (look.climate.includes(tempBucket)) score += 3;
      if (look.cityFocus?.some((item) => cityKey.includes(item))) score += 4;
      return { look, score };
    });

    const top = scored
      .sort((a, b) => b.score - a.score)
      .map((item) => item.look);

    return seededShuffle(top, refreshSeed).slice(0, 4);
  }, [city, tempBucket, refreshSeed]);

  const activePool = useMemo(() => {
    if (tempBucket === 'warm') return CALOR_IMAGES;
    return ROPA_IMAGES;
  }, [tempBucket]);

  const displayLooks = useMemo(() => {
    return personalizedLooks.map((look, i) => {
      const idx = (refreshSeed + i * 11) % activePool.length;
      return { ...look, src: activePool[Math.abs(idx)] };
    });
  }, [personalizedLooks, activePool, refreshSeed]);

  const activeLook = displayLooks[activeIndex] ?? displayLooks[0] ?? LOOKBOOK[0];

  useEffect(() => {
    if (!displayLooks.length) return;

    setActiveIndex(0);
    const id = window.setInterval(() => {
      setActiveIndex((v) => (v + 1) % displayLooks.length);
    }, 4500);

    return () => window.clearInterval(id);
  }, [displayLooks]);

  const climateLabel = tempBucket === 'cold' ? 'frio' : tempBucket === 'warm' ? 'calido' : 'templado';

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-[#f7f2e8] px-6 pb-14 pt-28 md:px-10 lg:px-14 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(218,197,164,0.42),transparent_38%),radial-gradient(circle_at_86%_14%,rgba(77,57,35,0.18),transparent_42%),linear-gradient(160deg,#f8f2e8_0%,#efe3d1_48%,#f5efe5_100%)]" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-[0.14]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="inline-flex rounded-full border border-[#cbb89a] bg-white/55 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[#6b5e50] backdrop-blur-sm">
            {heroCopy.kicker}
          </p>

          <h1
            className="mt-6 text-[clamp(2.4rem,7.8vw,6.6rem)] font-light uppercase leading-[0.86] tracking-[0.08em] text-[#1d1914]"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {heroCopy.titleA}
            <span className="block text-[#4f4338]">{heroCopy.titleB}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-[11px] uppercase leading-relaxed tracking-[0.24em] text-[#706456] md:text-xs md:tracking-[0.3em]">
            {heroCopy.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#collections"
              className="inline-flex items-center justify-center border border-[#1b1712] px-8 py-3 text-[10px] uppercase tracking-[0.32em] text-[#1b1712] transition-all duration-300 hover:bg-[#1b1712] hover:text-white"
            >
              Ver coleccion
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center border border-[#baa486] px-8 py-3 text-[10px] uppercase tracking-[0.32em] text-[#5d5042] transition-all duration-300 hover:bg-[#efdfcc]"
            >
              Reservar asesoramiento
            </a>
            <button
              onClick={requestUserLocation}
              disabled={locating}
              className="inline-flex items-center gap-2 rounded-full border border-[#c7b59a] bg-white/65 px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-[#5f5346] transition-all duration-300 hover:bg-[#f3e7d7] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <RefreshCw size={14} className={locating ? 'animate-spin' : ''} />
              {locating ? 'Detectando...' : 'Detectar ubicacion y clima'}
            </button>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#d7c8b2] bg-white/58 px-4 py-3 backdrop-blur-sm">
              <p className="text-[8px] uppercase tracking-[0.32em] text-[#8a7e70]">Ubicacion</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-[#1a1713]">
                <MapPin size={13} />
                {city}
              </p>
            </div>
            <div className="rounded-2xl border border-[#d7c8b2] bg-white/58 px-4 py-3 backdrop-blur-sm">
              <p className="text-[8px] uppercase tracking-[0.32em] text-[#8a7e70]">Temperatura</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-[#1a1713]">
                <ThermometerSun size={13} />
                {typeof temperature === 'number' ? `${Math.round(temperature)}°C` : '--'}
              </p>
            </div>
            <div className="rounded-2xl border border-[#d7c8b2] bg-white/58 px-4 py-3 backdrop-blur-sm">
              <p className="text-[8px] uppercase tracking-[0.32em] text-[#8a7e70]">Clima</p>
              <p className="mt-2 text-sm capitalize text-[#1a1713]">{climateLabel}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-[2rem] border border-[#d8c9b2] bg-white/42 p-4 shadow-[0_28px_90px_rgba(26,22,16,0.15)] backdrop-blur-md md:p-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem]">
              <Image
                src={activeLook.src}
                alt={activeLook.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(170deg,rgba(255,255,255,0.1),transparent_42%,rgba(26,22,16,0.45))]" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:p-5">
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/80">Edit {activeLook.id}</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-lg leading-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
                      {activeLook.name}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/75">{activeLook.note}</p>
                  </div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/20">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {displayLooks.slice(0, 3).map((look, index) => (
                <button
                  key={look.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group rounded-2xl border p-2 text-left transition-all duration-300 ${
                    index === activeIndex
                      ? 'border-[#7d6750] bg-[#f4e7d5]'
                      : 'border-[#d8c9b2] bg-white/55 hover:bg-[#f3e9db]'
                  }`}
                >
                  <div className="relative mb-2 aspect-[4/5] overflow-hidden rounded-xl">
                    <Image src={look.src} alt={look.name} fill sizes="20vw" className="object-cover" />
                  </div>
                  <p className="line-clamp-1 text-[11px] text-[#2c241c]">{look.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
