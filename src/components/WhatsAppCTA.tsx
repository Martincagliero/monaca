'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const WA_LINK =
  'https://wa.me/1234567890?text=Hola%20Monaca!%20Quisiera%20saber%20más%20sobre%20sus%20colecciones.';

export default function WhatsAppCTA() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  // Appear after 3 s so it doesn't compete with the preloader
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="fixed bottom-6 right-6 z-[500] flex flex-col items-end gap-2"
        >
          {/* Tooltip bubble */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative bg-white text-[#1a1814] text-xs tracking-[0.05em] px-4 py-2.5 shadow-xl max-w-[170px] text-center rounded-sm"
              >
                ¡Chateá con nosotras sobre nuestras colecciones!
                {/* Arrow */}
                <span className="absolute right-5 -bottom-1.5 w-3 h-1.5 overflow-hidden">
                  <span className="block w-3 h-3 bg-white rotate-45 -translate-y-1.5" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2">
            {/* Dismiss */}
            <button
              onClick={() => setVisible(false)}
              aria-label="Close"
              className="w-6 h-6 rounded-full bg-black/25 flex items-center justify-center text-white/60 hover:bg-black/45 transition-colors duration-200"
            >
              <X size={10} />
            </button>

            {/* WhatsApp button */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              onMouseEnter={() => setTooltip(true)}
              onMouseLeave={() => setTooltip(false)}
              className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:bg-[#1ebe5c] transition-colors duration-300"
            >
              <MessageCircle size={24} fill="white" className="text-white" />
              {/* Pulse ring */}
              <span
                className="absolute inset-0 rounded-full bg-[#25D366] opacity-30"
                style={{ animation: 'slow-ping 2s ease-out infinite' }}
              />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
