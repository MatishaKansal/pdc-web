"use client";

import { motion } from "framer-motion";
import { Instagram, MapPin } from "lucide-react";
import Link from "next/link";

/* ---------------- LANDING PAGE ---------------- */

export default function LandingPage() {
  return (
    <main className="min-h-screen relative overflow-hidden text-white">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #3B101A, #471942, #2C285C)",
        }}
      />

      {/* GLOWS */}
      <div className="absolute w-[520px] h-[520px] blur-[180px] rounded-full -top-40 -left-40 bg-[#641A2A]/80" />
      <div className="absolute w-[520px] h-[520px] blur-[180px] rounded-full top-1/4 left-1/3 bg-[#51295E]/80" />
      <div className="absolute w-[520px] h-[520px] blur-[180px] rounded-full bottom-[-220px] right-[-220px] bg-[#373171]/80" />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            w-full max-w-5xl
            bg-gradient-to-br from-white/20 via-white/10 to-white/5
            backdrop-blur-2xl
            border border-white/30
            rounded-3xl
            shadow-[0_80px_200px_rgba(0,0,0,0.6)]
            px-12 py-16 text-center
          "
        >
          <h1
            className="
              text-6xl md:text-7xl font-bold mb-6
              text-transparent bg-clip-text
              bg-gradient-to-r from-[#fea6cc] via-[#ffd4b9] to-[#fea7a0]
            "
          >
            Projection & Design Club
          </h1>

          <p className="text-xl text-[#FFCCB6] max-w-3xl mx-auto leading-relaxed">
            The creative heartbeat of Punjab Engineering College —
            shaping stories through design, motion, and visuals.
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <Link
              href="/aboutus"
              className="
                px-8 py-3 rounded-full
                bg-gradient-to-r from-[#f7548a] to-[#F593B5]
                text-black font-semibold
                hover:scale-105 transition
              "
            >
              Explore
            </Link>

            <Link
              href="/contact"
              className="
                px-8 py-3 rounded-full
                border border-white/30
                text-white
                hover:bg-white/10 transition
              "
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </section>

 /* ---------------- ABOUT SECTION ---------------- */


    <section
      id="about-trigger"
      className="relative min-h-screen flex items-center justify-center px-6 pb-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          w-full max-w-4xl
          bg-gradient-to-br from-white/20 via-white/10 to-white/5
          backdrop-blur-xl
          border border-white/30
          rounded-3xl
          shadow-[0_60px_160px_rgba(0,0,0,0.5)]
          px-10 py-14 text-center
        "
      >
        {/* TITLE */}
        <h2
          className="
            text-5xl md:text-6xl font-bold mb-8
            text-transparent bg-clip-text
            bg-gradient-to-r from-[#fea6cc] via-[#ffd4b9] to-[#fea7a0]
          "
        >
          About Us
        </h2>

        {/* TEXT */}
        <p className="text-lg text-[#FFCCB6] leading-relaxed">
          Projection and Design Club (PDC) is one of the most prominent
          creative clubs of Punjab Engineering College. We are a collective
          of designers, editors, filmmakers, and visual storytellers.
        </p>

        <p className="mt-6 text-base text-white/90 leading-relaxed">
          From posters and motion graphics to cinematic after-movies,
          branding assets, and digital campaigns — PDC turns concepts
          into compelling visual narratives across campus events.
        </p>

        <p className="mt-6 text-base text-white/90 leading-relaxed">
          We believe in experimentation, collaboration, and crafting
          visuals that leave a lasting impact.
        </p>

        {/* HIGHLIGHT LINE */}
        <p className="mt-10 text-2xl text-[#f48db1]">
          Are you ready to ride the wave?
        </p>
      </motion.div>
    </section>



    <footer className="relative z-30 w-full">
      <div className="p-6 text-center text-[#ffffff]">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">

          <a
            href="https://www.instagram.com/projectionanddesignclub/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#ffffff] transition"
          >
            <Instagram size={20} />
            <span>@pec.pdc</span>
          </a>

          <span className="hidden sm:inline text-[#ffffff]">|</span>

          <div className="flex items-center gap-2">
            <MapPin size={20} />
            <span>Punjab Engineering College, Chandigarh</span>
          </div>

        </div>
      </div>
    </footer>


    </main>
  );
}
