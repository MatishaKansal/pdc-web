"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { headingFont } from "../layout";
import Link from "next/link";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function RegisterPage() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #3B101A, #471942, #2C285C)",
        }}
      />

      {/* GLOWS */}
      <div className="absolute w-[520px] h-[520px] blur-[140px] rounded-full -top-40 -left-40 glow-1 bg-[#641A2A]" />
      <div className="absolute w-[520px] h-[520px] blur-[140px] rounded-full top-1/4 left-1/3 glow-2 bg-[#51295E]" />
      <div className="absolute w-[520px] h-[520px] blur-[140px] rounded-full bottom-[-220px] right-[-220px] glow-3 bg-[#373171]" />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md min-h-[420px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 flex items-center">

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full text-white"
        >
          <motion.h2
            variants={item}
            className={`text-3xl font-bold mb-6 text-center ${headingFont.className}`}
          >
            Register
          </motion.h2>

          <motion.input variants={item}
            className="w-full p-3 mb-4 rounded bg-white/20 border border-white/20 outline-none"
            placeholder="Name"
          />
          <motion.input variants={item}
            className="w-full p-3 mb-4 rounded bg-white/20 border border-white/20 outline-none"
            placeholder="Email"
          />
          <motion.input variants={item}
            type="password"
            className="w-full p-3 mb-6 rounded bg-white/20 border border-white/20 outline-none"
            placeholder="Password"
          />

          <motion.button
            variants={item}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold"
          >
            Register
          </motion.button>

          <motion.p variants={item} className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}
