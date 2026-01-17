"use client";

import { motion } from "framer-motion";

/* ---------------- ABOUT PAGE ---------------- */

export default function AboutPage() {
  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center">

      {/* SAME BACKGROUND AS CONTACT / LOGIN */}
      <div
        className="fixed inset-0"
        style={{
          background: "linear-gradient(135deg, #3B101A, #471942, #2C285C)",
        }}
      />

      {/* SAME GLOWS */}
      <div className="absolute w-[520px] h-[520px] blur-[180px] rounded-full -top-40 -left-40 bg-[#641A2A]/80" />
      <div className="absolute w-[520px] h-[520px] blur-[180px] rounded-full top-1/4 left-1/3 bg-[#51295E]/80" />
      <div className="absolute w-[520px] h-[520px] blur-[180px] rounded-full bottom-[-220px] right-[-220px] bg-[#373171]/80" />

      {/* CARD (SAME AS CONTACT) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative z-10 w-full max-w-4xl mt-30
          bg-gradient-to-br from-white/20 via-white/10 to-white/5
          backdrop-blur-2xl
          border border-white/30
          rounded-3xl
          shadow-[0_80px_200px_rgba(0,0,0,0.6)]
          px-12 py-14
          mb-10
        "
      >
        {/* INNER HIGHLIGHT */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

        {/* TITLE */}
        <h1 className="text-5xl md:text-6xl text-center font-bold mb-10
          text-transparent bg-clip-text bg-gradient-to-r
          from-[#fea6cc] via-[#ffd4b9] to-[#fea7a0]">
          About PDC
        </h1>

        {/* CONTENT */}
        <div className="space-y-6 text-center text-white/90 leading-relaxed">
          <p className="text-lg text-[#FFCCB6]">
            Projection and Design Club (PDC) is the creative core of
            Punjab Engineering College.
          </p>

          <p>
            We are a collective of designers, filmmakers, editors, and
            visual storytellers who shape how ideas are seen and felt
            across the campus.
          </p>

          <p>
            From posters and motion graphics to cinematic after-movies,
            branding assets, and digital campaigns — PDC turns concepts
            into compelling visual narratives.
          </p>

          <p>
            Our work spans college festivals, official events, club
            promotions, and experimental creative projects — blending
            aesthetics, technology, and storytelling.
          </p>
        </div>

        {/* CORE VALUES */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Creativity",
              text: "Visual storytelling through design, motion, and film.",
            },
            {
              title: "Innovation",
              text: "Exploring new styles, tools, and creative workflows.",
            },
            {
              title: "Collaboration",
              text: "A culture built on teamwork, mentorship, and growth.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
                rounded-2xl p-8
                bg-white/10
                border border-white/20
              "
            >
              <h3 className="text-3xl font-bold text-[#f48db1]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-white/80">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-14 text-xl text-center text-[#f48db1]">
          Crafting stories. Designing impact.
        </p>
      </motion.div>
    </main>
  );
}
