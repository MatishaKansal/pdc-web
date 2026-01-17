'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  const [showNavbar, setShowNavbar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  /* ---------------- SHOW NAVBAR LOGIC ---------------- */
  useEffect(() => {
    if (pathname !== '/') {
      setShowNavbar(true);
      return;
    }

    const target = document.getElementById('about-trigger');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowNavbar(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  if (loading) return null;

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About us', href: '/aboutus' },
    { label: 'Lumiere', href: '/lumiere' },
    { label: 'Collections', href: '/collections' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <AnimatePresence>
      {showNavbar && (
        <>
          {/* ================= DESKTOP NAVBAR ================= */}
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block"
          >
            <div className="flex items-center justify-between w-[48vw] max-w-6xl px-12 py-5 rounded-full bg-[#0b0616]/70 backdrop-blur-xl border border-[#b53da1]/40 shadow-lg">
              {/* LEFT */}
              <div className="flex gap-6">
                {navItems.slice(0, 3).map(i => (
                  <Link
                    key={i.href}
                    href={i.href}
                    className="text-[#F593B5] font-semibold hover:text-[#ffd4b9]"
                  >
                    {i.label}
                  </Link>
                ))}
              </div>

              {/* LOGO */}
              <Link href="/">
                <motion.img
                  src="/logo.png"
                  alt="PDC Logo"
                  className="w-28 h-14 -my-7"
                  whileHover={{ scale: 1.1 }}
                />
              </Link>

              {/* RIGHT */}
              <div className="flex gap-6">
                {navItems.slice(3).map(i => (
                  <Link
                    key={i.href}
                    href={i.href}
                    className="text-[#F593B5] font-semibold hover:text-[#ffd4b9]"
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.nav>

          {/* ================= DASHBOARD (OUTSIDE NAVBAR) ================= */}
          {user?.member && (
            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="fixed top-9 right-28 z-50 hidden lg:block"
            >
              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#f7548a] to-[#F593B5] text-white font-semibold shadow-lg hover:scale-105 transition"
              >
                Dashboard
              </Link>
            </motion.div>
          )}

          {/* ================= PROFILE BUTTON ================= */}
          {user ? (
            <div className="fixed top-6 right-8 z-50 hidden lg:block">
              <button
                onClick={() => setShowProfileMenu(p => !p)}
                className="w-11 h-11 rounded-full bg-gradient-to-r from-[#f7548a] to-[#F593B5] flex items-center justify-center"
              >
                <User className="text-white" />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 w-48 bg-[#010101]/90 backdrop-blur-xl rounded-2xl border border-[#b53da1]/40"
                  >
                    <Link
                      href="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="block px-4 py-3 text-[#fea6cc] hover:bg-[#b53da1]/20"
                    >
                      My Profile
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-3 text-[#fea6cc] hover:bg-[#b53da1]/20"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="fixed top-11 right-8 z-50 hidden lg:block">
              <Link
                href="/login"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#f7548a] to-[#F593B5] text-white font-semibold shadow-lg"
              >
                Login
              </Link>
            </div>
          )}

          {/* ================= MOBILE MENU BUTTON ================= */}
          <div className="fixed top-4 left-4 z-50 lg:hidden">
            <button
              onClick={() => setShowMobileMenu(true)}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-[#f7548a] to-[#F593B5] flex items-center justify-center"
            >
              <Menu className="text-white" />
            </button>
          </div>

          {/* ================= MOBILE DRAWER ================= */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.35 }}
                className="fixed inset-y-0 left-0 w-[65%] bg-black z-40 lg:hidden"
              >
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="absolute top-6 right-6"
                >
                  <X className="text-white" />
                </button>

                <div className="h-full flex flex-col justify-center items-center gap-6">
                  {navItems.map(i => (
                    <Link
                      key={i.href}
                      href={i.href}
                      onClick={() => setShowMobileMenu(false)}
                      className="text-xl text-[#fea6cc]"
                    >
                      {i.label}
                    </Link>
                  ))}

                  {user?.member && (
                    <Link
                      href="/dashboard"
                      onClick={() => setShowMobileMenu(false)}
                      className="text-xl text-[#fea6cc]"
                    >
                      Dashboard
                    </Link>
                  )}

                  {user ? (
                    <button
                      onClick={() => {
                        logout();
                        setShowMobileMenu(false);
                      }}
                      className="text-xl text-[#fea6cc]"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setShowMobileMenu(false)}
                      className="text-xl text-[#fea6cc]"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
