'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/* ---------------- DATA ---------------- */

const slides = [
  {
    title: 'Secretaries',
    count: 2,
  },
  {
    title: 'Final Year',
    count: 8,
  },
  {
    title: 'Third Year',
    count: 8,
  },
  {
    title: 'Second Year',
    count: 8,
  },
];

/* ---------------- PAGE ---------------- */

export default function TeamPage() {
  const [index, setIndex] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleClick = () => {
    if (showCamera) return;

    setShowCamera(true);

    // flash ON
    setTimeout(() => setFlash(true), 300);

    // change cards
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 600);

    // flash OFF
    setTimeout(() => setFlash(false), 750);

    // camera OUT
    setTimeout(() => setShowCamera(false), 1000);
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #3B101A, #471942, #2C285C)',
      }}
    >
      {/* ================= CAMERA ================= */}
      <AnimatePresence>
        {showCamera && (
          <motion.div
            key="camera"
            initial={{ opacity: 0, scale: 0.85}}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3 }}
            className="fixed top-75 left-1/2 -translate-x-1/2 z-50"
          >
            <Image
              src="/camera.gif"
              alt="Camera Flash"
              width={180}
              height={180}
              priority
              rotation={0}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FLASH ================= */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-40 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at center, rgba(255,220,120,0.9), transparent 60%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 w-[60%] max-w-6xl mt-25 mb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.55 }}
            className="
              bg-white/10 backdrop-blur-2xl
              border border-white/20
              rounded-3xl
              px-12 py-14
              shadow-[0_60px_180px_rgba(0,0,0,0.6)]
            "
          >
            <h2 className="text-4xl text-center font-bold text-[#ffd4b9] mb-2">
              {slides[index].title}
            </h2>

            <div
              className={`grid gap-5 place-items-center ${
                slides[index].count === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-2 sm:grid-cols-4'
              }`}
            >
              {Array.from({ length: slides[index].count }).map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="
                    w-40 h-45
                    rounded-2xl
                    bg-gradient-to-br from-white/20 to-white/5
                    border border-white/25
                    flex flex-col items-center justify-center
                    text-white
                  "
                >
                  <div className="w-20 h-20 rounded-full bg-white/30 mb-4" />
                  <p className="font-semibold">Member {i + 1}</p>
                  <p className="text-sm text-[#fea6cc]">
                    {slides[index].title}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ================= CLICK LAYER ================= */}
      <button
        onClick={handleClick}
        className="absolute inset-0 z-30 cursor-pointer"
        aria-label="Next team"
      />
    </main>
  );
}
