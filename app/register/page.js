"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

import { headingFont } from "../layout";

/* ---------------- ANIMATIONS ---------------- */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
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
  const router = useRouter();

  /* ---------------- STATE ---------------- */

  const [form, setForm] = useState({
    name: "",
    email: "",
    studentId: "",
    college: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- VALIDATION ---------------- */

  const isFormValid =
    form.name &&
    form.email &&
    form.studentId &&
    form.college &&
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword;

  /* ---------------- REGISTER ---------------- */

  const handleRegister = async () => {
    if (!isFormValid) return;

    try {
      setLoading(true);
      setError("");

      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // ✅ SAVE USER DATA IN FIRESTORE
      await setDoc(doc(db, "Users", cred.user.uid), {
        name: form.name,
        studentId: form.studentId,
        college: form.college,
        email: form.email,
        member: false, // backend controlled
        createdAt: new Date(),
      });

      // ✅ REDIRECT TO HOME PAGE
      router.push("/");

    } catch (err) {
      setError(err.message.replace("Firebase:", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center">

      {/* BACKGROUND */}
      <div
        className="fixed inset-0"
        style={{
          background: "linear-gradient(135deg, #3B101A, #471942, #2C285C)",
        }}
      />

      {/* GLOWS */}
      <div className="absolute w-[520px] h-[520px] blur-[160px] rounded-full -top-40 -left-40 bg-[#641A2A]/80" />
      <div className="absolute w-[520px] h-[520px] blur-[160px] rounded-full top-1/4 left-1/3 bg-[#51295E]/80" />
      <div className="absolute w-[520px] h-[520px] blur-[160px] rounded-full bottom-[-220px] right-[-220px] bg-[#373171]/80" />

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative z-10 w-full max-w-md h-[480px]
          bg-gradient-to-br from-white/15 via-white/10 to-white/5
          backdrop-blur-2xl
          border border-white/30
          rounded-3xl
          shadow-[0_60px_160px_rgba(0,0,0,0.55)]
          p-10
        "
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative w-full h-full overflow-y-auto pr-2 text-white"
        >
          <motion.h2
            variants={item}
            className={`text-3xl font-bold mb-6 text-center ${headingFont.className}`}
          >
            Register
          </motion.h2>

          {[
            { name: "name", placeholder: "Name" },
            { name: "email", placeholder: "Email" },
            { name: "studentId", placeholder: "Student ID" },
            { name: "college", placeholder: "College Name" },
          ].map((field) => (
            <motion.input
              key={field.name}
              variants={item}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full p-3 mb-4 rounded-xl bg-white/20 border border-white/25 outline-none focus:border-[#ed6ab8]"
            />
          ))}

          <motion.input
            variants={item}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 mb-4 rounded-xl bg-white/20 border border-white/25 outline-none focus:border-[#ed6ab8]"
          />

          <motion.input
            variants={item}
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 mb-3 rounded-xl bg-white/20 border border-white/25 outline-none focus:border-[#ed6ab8]"
          />

          {form.confirmPassword &&
            form.password !== form.confirmPassword && (
              <p className="text-sm text-red-300 mb-3 text-center">
                Passwords do not match
              </p>
            )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                mb-4 px-4 py-3 rounded-xl
                bg-red-500/15 border border-red-400/40
                text-red-200 text-sm text-center
                backdrop-blur-md
              "
            >
              {error}
            </motion.div>
          )}

          <motion.button
            variants={item}
            onClick={handleRegister}
            disabled={!isFormValid || loading}
            className={`w-full py-3 rounded-xl font-semibold transition
              ${
                isFormValid && !loading
                  ? "bg-white text-black hover:scale-[1.02]"
                  : "bg-white/40 text-black/40 cursor-not-allowed"
              }
            `}
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>

          <motion.p variants={item} className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </main>
  );
}