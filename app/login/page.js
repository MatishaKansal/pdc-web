"use client";

import { motion } from "framer-motion";
import { headingFont } from "../layout";
import Link from "next/link";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
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

export default function LoginPage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden flex items-center justify-center">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #3B101A, #471942, #2C285C)",
        }}
      />

      {/* GLOWS */}
      <div className="absolute w-[520px] h-[520px] blur-[160px] rounded-full -top-40 -left-40 bg-[#641A2A]/80" />
      <div className="absolute w-[520px] h-[520px] blur-[160px] rounded-full top-1/4 left-1/3 bg-[#51295E]/80" />
      <div className="absolute w-[520px] h-[520px] blur-[160px] rounded-full bottom-[-220px] right-[-220px] bg-[#373171]/80" />

      {/* DEPTH CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative z-10 w-full max-w-md min-h-[460px]
          bg-gradient-to-br from-white/15 via-white/10 to-white/5
          backdrop-blur-2xl
          border border-white/30
          rounded-3xl
          shadow-[0_60px_160px_rgba(0,0,0,0.55)]
          p-10 flex items-center
        "
      >
        {/* INNER DEPTH LAYER */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative w-full text-white"
        >
          <motion.h2
            variants={item}
            className={`text-3xl font-bold mb-6 text-center ${headingFont.className}`}
          >
            Login
          </motion.h2>

          <motion.input
            variants={item}
            className="w-full p-3 mb-4 rounded-xl bg-white/20 border border-white/25 outline-none focus:border-[#ed6ab8]"
            placeholder="Email"
          />

          <motion.input
            variants={item}
            type="password"
            className="w-full p-3 mb-6 rounded-xl bg-white/20 border border-white/25 outline-none focus:border-[#ed6ab8]"
            placeholder="Password"
          />

          <motion.button
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold shadow-lg"
          >
            Login
          </motion.button>

          <motion.p variants={item} className="mt-4 text-sm text-center">
            New here?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </main>
  );
}
