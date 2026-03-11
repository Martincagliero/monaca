
'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Collections from '@/components/Collections';
import Complementos from '@/components/Complementos';
import Looks from '@/components/Looks';
import InstagramSection from '@/components/Instagram';
import AboutFounder from '@/components/AboutFounder';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Lock body scroll during preloader
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Navbar />
        <main>
          <Hero />
          <Collections />
          <Complementos />
          <Looks />
          <InstagramSection />
          <AboutFounder />
          <Contact />
        </main>
        <Footer />
        <WhatsAppCTA />
      </div>
    </>
  );
}
