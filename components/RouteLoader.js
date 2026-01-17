'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function RouteLoader() {
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 🔒 Force loader on every route change
    setVisible(true);
    setProgress(0);

    let current = 0;

    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 6) + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setProgress(current);
    }, 70);

    // ⏱️ minimum visible time (IMPORTANT)
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 1600);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* 🔥 SAME BACKGROUND AS LOGIN / REGISTER */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #3B101A, #471942, #2C285C)',
            }}
          />

          {/* GLOWS */}
          <div className="absolute w-[500px] h-[500px] blur-[180px] rounded-full -top-40 -left-40 bg-[#641A2A]/80" />
          <div className="absolute w-[500px] h-[500px] blur-[180px] rounded-full bottom-[-220px] right-[-220px] bg-[#373171]/80" />

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col items-center">

            {/* LOGO + RING */}
            <div className="relative w-40 h-40 flex items-center justify-center">

              {/* ROTATING RING */}
              <motion.div
                className="absolute inset-0 rounded-full border-[3px] border-transparent"
                style={{
                  borderTopColor: '#ed6ab8',
                  borderRightColor: '#fea6cc',
                }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: 'linear',
                }}
              />

              {/* LOGO (STILL) */}
              <img
                src="/logo.png"
                alt="Loading"
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* PROGRESS */}
            <p className="mt-8 text-lg font-semibold text-[#fea6cc] tracking-wider">
              {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
