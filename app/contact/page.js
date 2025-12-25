"use client";

import { motion } from "framer-motion";
import {
  Instagram,
  MapPin,
  Mail,
  Youtube,
  Linkedin,
} from "lucide-react";

/* ---------------- CONTACT ITEM ---------------- */

const ContactItem = ({ icon, title, text, href }) => (
  <motion.div
    className="flex items-start gap-4"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-r from-[#f7548a] to-[#F593B5] text-white shadow-md">
      {icon}
    </div>

    <div>
      <h3 className="font-semibold text-lg text-[#f48db1]">{title}</h3>
      {href ? (
        <a href={href} className="text-white hover:text-[#FFCCB6] transition">
          {text}
        </a>
      ) : (
        <p className="text-white">{text}</p>
      )}
    </div>
  </motion.div>
);

/* ---------------- SOCIAL ICON ---------------- */

const SocialIcon = ({ href, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="
      w-12 h-12 rounded-full
      flex items-center justify-center
      bg-white/10 text-[#f48db1]
      border border-white/20
      hover:border-[#ed6ab8] hover:text-[#ed6ab8]
      transition
    "
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
  </motion.a>
);

/* ---------------- CONTACT PAGE ---------------- */

export default function ContactPage() {
  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center">

      {/* LOGIN / REGISTER BACKGROUND */}
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

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative z-10 w-full max-w-2xl mt-30 mb-10
          bg-gradient-to-br from-white/20 via-white/10 to-white/5
          backdrop-blur-2xl
          border border-white/30
          rounded-3xl
          shadow-[0_80px_200px_rgba(0,0,0,0.6)]
          px-12 py-14
        "
      >
        {/* INNER HIGHLIGHT */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

        {/* TITLE */}
        <h1 className="text-5xl md:text-6xl text-center font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#fea6cc] via-[#ffd4b9] to-[#fea7a0]">
          Contact Us
        </h1>

        {/* CONTENT */}
        <div className="space-y-7">

          <ContactItem
            icon={<Mail size={20} />}
            title="Email:"
            text="pdcpec@gmail.com"
            href="mailto:pdcpec@gmail.com"
          />

          <ContactItem
            icon={<MapPin size={20} />}
            title="Location:"
            text="Punjab Engineering College, Sector-12, Chandigarh"
          />
        </div>

        {/* SOCIAL */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <h3 className="text-lg text-center text-[#f48db1] mb-6">
            Follow Us on Social
          </h3>

          <div className="flex justify-center gap-8">
            <SocialIcon
              href="https://www.instagram.com/projectionanddesignclub/"
              icon={<Instagram size={22} />}
            />
            <SocialIcon
              href="https://www.linkedin.com/company/pdcpec/posts/"
              icon={<Linkedin size={22} />}
            />
            <SocialIcon
              href="www.youtube.com/@PDCPEC"
              icon={<Youtube size={22} />}
            />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
