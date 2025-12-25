'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 🟢 If NOT home page → always show navbar
    if (pathname !== '/') {
      setShowNavbar(true);
      return;
    }

    // 🟣 Home page → show only after About section
    const target = document.getElementById('about-trigger');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNavbar(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        >
          {/* PILL CONTAINER */}
          <div
            className="flex items-center gap-8 px-10 py-4 rounded-full
                       bg-[#0b0616]/70 backdrop-blur-xl
                       border border-[#b53da1]/40
                       shadow-[0_0_40px_rgba(181,61,161,0.15)]"
          >
            {/* LEFT LINKS */}
            <div className="flex items-center gap-6">
            <Link
                href="/"
                className="text-[#F593B5] font-semibold hover:text-[#ffd4b9] transition"
            >
                Home
            </Link>

            <Link
                href="/aboutus"
                className="text-[#F593B5] font-semibold hover:text-[#ffd4b9] transition"
            >
                About us
            </Link>

            <Link
                href="/lumiere"
                className="text-[#F593B5] font-semibold hover:text-[#ffd4b9] transition"
            >
                Lumiere
            </Link>
            </div>


            {/* LOGO */}
            <Link href="/" className="mx-1">
              <motion.img
                src="/logo.png"
                alt="pcd Logo"
                className="w-30 h-18 -my-8 rounded-full"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              />
            </Link>

            {/* RIGHT LINKS */}
            <div className="flex items-center gap-6">
              {['Team', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-[#F593B5] font-semibold hover:text-[#ffd4b9] transition"
                >
                  {item}
                </Link>
              ))}

              {/* LOGIN BUTTON */}
              <Link
                href="/login"
                className="ml-2 px-6 py-2 rounded-full
                           bg-gradient-to-r from-[#f7548a] to-[#F593B5]
                           text-white font-semibold
                           shadow-md hover:shadow-lg transition"
              >
                Login
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
