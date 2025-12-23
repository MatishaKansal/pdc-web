"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center text-white overflow-hidden">
      
      {/* Animated Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-10 w-[90%] max-w-md shadow-2xl text-center"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-extrabold mb-4 tracking-tight"
        >
          Build. Launch. Grow.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-300 mb-8"
        >
          A modern experience with smooth motion and clean design.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <motion.a
            href="/auth"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold"
          >
            Login
          </motion.a>

          <motion.a
            href="/auth"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-xl border border-white"
          >
            Register
          </motion.a>
        </div>
      </motion.div>

    </main>
  );
}
