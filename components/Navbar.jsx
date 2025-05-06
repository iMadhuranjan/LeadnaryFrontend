"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiChevronDown,
  FiHome,
  FiActivity,
  FiBriefcase,
  FiLogIn,
  FiLayout,
  FiBook,
  FiLayers,
} from "react-icons/fi";

import { RiSparkling2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // desktop dropdown key
  const dispatch = useDispatch();
  /** Navigation schema */
  const nav = [
    {
      key: "product",
      label: "Product",
      items: [
        { label: "How It Works", href: "/how-it-works" },
        { label: "Features Overview", href: "/features" },
        { label: "Landing Page Builder", href: "/landing-page-builder" },
        { label: "Lead Capture Forms", href: "/lead-capture-forms" },
        { label: "Custom Domains", href: "/custom-domains" },
        // { label: "Page Analytics (optional)", href: "/analytics" },
      ],
    },
    {
      key: "solutions",
      label: "Solutions",
      items: [
        { label: "Real Estate Agents", href: "/solutions/real-estate" },
        { label: "Doctors & Clinics", href: "/solutions/clinics" },
        { label: "Gyms & Trainers", href: "/solutions/gyms" },
        { label: "Freelancers & Creators", href: "/solutions/freelancers" },
        { label: "Local Business Vendors", href: "/solutions/local-business" },
      ],
    },
    {
      key: "templates",
      label: "Templates",
      items: [
        {
          label: "Real Estate Templates",
          href: "/template/real-estate",
          icon: <FiHome className="shrink-0" />,
        },
        {
          label: "Gym Templates",
          href: "/template/gyms",
          icon: <FiActivity className="shrink-0" />,
        },
        {
          label: "Clinic Templates",
          href: "/template/doctor",
          icon: <FiBriefcase className="shrink-0" />,
        },
        {
          label: "Coaching Templates",
          href: "/templates/coaching",
          icon: <FiBook className="shrink-0" />,
        },
        {
          label: "Explore All Templates",
          href: "/templates/all",
          icon: <FiLayers className="shrink-0" />,
        },
      ],
    },
    { key: "pricing", label: "Pricing", href: "/pricing" },
    {
      key: "resources",
      label: "Resources",
      items: [
        { label: "Documentation", href: "/docs" },
        { label: "Help Center / FAQ", href: "/help" },
        { label: "Blog (Coming soon)", href: "#" },
        { label: "Contact Support", href: "/contact" },
      ],
    },
  ];

  /** Utilities */
  const isDropdown = (item) => Array.isArray(item.items);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const auth = useSelector((state) => state.auth.isAuthenticated);

 
  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight dark:text-white"
          >
            Leadnary
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {nav.map((item) => (
              <div key={item.key} className="relative">
                {isDropdown(item) ? (
                  <button
                    onMouseEnter={() => setOpenDropdown(item.key)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="flex items-center gap-1 text-lg text-gray-900 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400 focus:outline-none font-bold "
                  >
                    {item.label}
                    <FiChevronDown size={14} className="mt-px" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-lg font-bold dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown panel */}
                {isDropdown(item) && (
                  <AnimatePresence>
                    {openDropdown === item.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        onMouseEnter={() => setOpenDropdown(item.key)}
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute left-0 mt-2 w-56 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg p-2 fonsem"
                      >
                        {item.items.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="flex items-center  gap-2 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            {sub.icon && <span>{sub.icon}</span>}
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop actions */}
          {!auth ? (
            <div className="hidden md:flex items-center gap-4">
              {/* Login Button - With subtle animation */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                // transition={{ type: "spring", stiffness: 400, damping: 5 }}
              >
                <Link
                  href="/login"
                  className="flex items-center gap-2 font-bold px-4 py-2 text-base   text-zinc-700 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 group"
                >
                  <FiLogIn className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                  <span>Login</span>
                </Link>
              </motion.div>

              {/* Get Started Button - Eye-catching with pulse animation */}
              <motion.div
                className="rounded-xl"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.02, 1],
                  boxShadow: [
                    "0 4px 14px 0 rgba(124, 58, 237, 0.2)",
                    "0 6px 18px 0 rgba(124, 58, 237, 0.3)",
                    "0 4px 14px 0 rgba(124, 58, 237, 0.2)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2.5,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/register"
                    className="flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Animated sparkle effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-700/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                    {/* Sparkle icon with animation */}
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 3,
                      }}
                      className="relative z-10"
                    >
                      <RiSparkling2Fill className="w-5 h-5" />
                    </motion.span>

                    <span className="relative z-10">
                      Get Started - It's Free
                    </span>

                    {/* Glow effect */}
                    <span className="absolute -inset-1 bg-violet-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Theme Toggle - Enhanced with tooltip */}
            </div>
          ) : (
            <Link
              href="/dashboard"
              className="
              hidden md:flex items-center gap-3
              px-4 py-2 rounded-lg
              bg-gradient-to-r from-blue-600 to-indigo-600
              text-white font-medium
              shadow-lg hover:shadow-xl
              transition-all duration-300
              hover:scale-105
              border border-indigo-400
              hover:from-blue-700 hover:to-indigo-700
            "
            >
              <FiLayout className="text-xl" />
              <span>Go to Dashboard</span>
            </Link>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hidden md:flex p-2 rounded-full bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 group relative"
          >
            {theme === "dark" ? (
              <FiSun className="w-5 h-5 text-amber-400" />
            ) : (
              <FiMoon className="w-5 h-5 text-indigo-600" />
            )}
          </motion.button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="md:hidden p-2 rounded-lg text-gray-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg"
          >
            <div className="px-4 py-3 space-y-4">
              {nav.map((item) => (
                <MobileItem
                  key={item.key}
                  item={item}
                  close={() => setMobileOpen(false)}
                />
              ))}

              <div className="flex items-center pt-3 gap-2  border-t border-zinc-100 dark:border-zinc-800">
                <Link
                  href="/login"
                  className="flex items-center gap-2 font-bold px-4 py-2 text-base   text-zinc-700 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 group"
                >
                  <FiLogIn className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                  <span>Login</span>
                </Link>

                <Link
                  href="/register"
                  className="flex items-center gap-2 px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-500 mr-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Animated sparkle effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-700/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                  {/* Sparkle icon with animation */}
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 3,
                    }}
                    className="relative z-10"
                  >
                    <RiSparkling2Fill className="w-5 h-5" />
                  </motion.span>

                  <span className="relative z-10">Get Started</span>

                  {/* Glow effect */}
                  <span className="absolute -inset-1 bg-violet-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="p-3 rounded-full bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 group relative"
                >
                  {theme === "dark" ? (
                    <FiSun className="w-6 h-6 text-amber-400" />
                  ) : (
                    <FiMoon className="w-6 h-6 text-indigo-600" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

/** Mobile collapsible item */
const MobileItem = ({ item, close }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(item.items);

  return (
    <div>
      <button
        onClick={() => (hasChildren ? setOpen((p) => !p) : close())}
        className="flex w-full items-center justify-between text-left text-lg font-bold text-zinc-800 dark:text-zinc-50"
      >
        <span>{item.label}</span>
        {hasChildren ? (
          <FiChevronDown
            className={`transform transition ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        ) : null}
      </button>
      {hasChildren && (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pl-4 mt-2 space-y-2"
            >
              {item.items.map((sub) => (
                <Link
                  key={sub.label}
                  href={sub.href}
                  onClick={close}
                  className="block text-base text-gray-900 dark:text-zinc-300 py-1"
                >
                  {sub.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Navbar;
