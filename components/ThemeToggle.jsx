"use client";
import { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
 
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  // avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const isDark =
      window.matchMedia("(prefers-color-scheme: dark)").matches ||
      document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", dark);
  }, [dark, mounted]);

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setDark((p) => !p)}
      className="rounded-md border border-transparent p-2 transition hover:border-zinc-300 hover:bg-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
    >
      {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
