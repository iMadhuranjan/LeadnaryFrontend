/********************************************************************
 *  Leadnary –  Hype‑side Panel (v2.1)                              *
 *  Place this where the old  <div className="relative hidden …">   *
 *  lived.                                                          *
 *******************************************************************/
"use client";
import {
  FiZap,
  FiTrendingUp,
  FiClock,
  FiDatabase,
  FiCheckCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, label }) => (
  <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm border border-white/10 hover:border-cyan-400/40 transition-all">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-full bg-cyan-500/10">
        <Icon className="h-5 w-5 text-cyan-300" />
      </div>
      <span className="text-sm font-semibold">{label}</span>
    </div>
  </div>
);

const features = [
  { icon: FiZap, label: "Launch in 60 s" },
  { icon: FiTrendingUp, label: "Real‑time analytics" },
  { icon: FiClock, label: "24/7 lead capture" },
  { icon: FiDatabase, label: "Unlimited Leads" },
];

export default function AuthShowcase() {
  return (
    <div className="relative hidden md:block md:w-1/2 overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* ---------- DYNAMIC BACKGROUND LAYERS ---------- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-3 w-3 rounded-full bg-blue-500 blur-sm animate-pulse" />
        <div className="absolute top-1/3 right-1/3 h-2 w-2 rounded-full bg-purple-400 blur-sm animate-pulse delay-200" />
        <div className="absolute bottom-1/4 left-2/3 h-3 w-3 rounded-full bg-cyan-400 blur-sm animate-pulse delay-500" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.04)_1px,_transparent_1px)] bg-[length:22px_22px]" />

      {/* ---------- FOREGROUND CONTENT ---------- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-md"
        >
          {/* Logo */}
          <div className="mb-8 flex items-center justify-center gap-2">
            <svg
              className="h-8 w-8 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
              LEADNARY
            </span>
          </div>

          {/* Headline */}
          <motion.h2
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 text-4xl font-extrabold leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Build. Launch. Convert.
            </span>
            <br />
            <span className="text-cyan-300">Your site goes live in 60 s.</span>
          </motion.h2>

          {/* Sub‑headline (updated) */}
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mb-8 text-lg font-medium text-blue-100"
          >
            From one simple form to a website that speaks, sells, and converts -
            your journey starts here
          </motion.p>

          {/* Feature grid */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4 mb-10"
          >
            {features.map((f) => (
              <FeatureCard key={f.label} {...f} />
            ))}
          </motion.div>

          {/* Social proof + animated CTA ribbon */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-xs font-mono tracking-wider text-cyan-300/90"
            >
              ⚡ CREATE YOUR SITE — FREE FOREVER PLAN ⚡
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
