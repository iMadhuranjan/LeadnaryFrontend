// DashboardTopbar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiSun,
  FiMoon,
  FiLogOut,
  FiHelpCircle,
  FiUser,
} from "react-icons/fi";
import { useTheme } from "next-themes";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { logoutUser } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import { useToast } from "./ToastProvider";
import { navItems } from "./Dashboardsidebar"; // ← single source of truth

export default function DashboardTopbar() {
  /* ─────────── state ─────────── */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSections, setMobileSections] = useState({});
  const [mounted, setMounted] = useState(false);

  /* ────────── hooks/data ───────── */
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const router = useRouter();
  const toast = useToast();
  const dropdownRef = useRef(null);

  useEffect(() => setMounted(true), []);

  /* ────────── handlers ────────── */
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleSidebar = () => setSidebarOpen((p) => !p);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleMobileSection = (key) =>
    setMobileSections((p) => ({ ...p, [key]: !p[key] }));

  const handleLogout = () => {
    dispatch(logoutUser())
      .then((r) => {
        if (r?.payload?.success) {
          toast.info(r.payload.message || "Logout successful");
          router.push("/");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch(() => {});
  };

  /* close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ─────────── helpers for drawer ─────────── */
  const renderMobileItem = (item) => {
    /* expandable section */
    if (item.items) {
      const isOpen = mobileSections[item.label];
      return (
        <div key={item.label} className="mb-1">
          <button
            onClick={() => toggleMobileSection(item.label)}
            className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
          >
            <span className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
              <span>{item.label}</span>
            </span>
            {isOpen ? (
              <FiChevronDown className="w-4 h-4" />
            ) : (
              <FiChevronRight className="w-4 h-4" />
            )}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15 }}
                className="mt-1 pl-10 space-y-1"
              >
                {item.items.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={closeSidebar}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-100/30 dark:hover:bg-gray-700/30"
                  >
                    <sub.icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div>
                      <span className="block font-medium">{sub.label}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">
                        {sub.description}
                      </span>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    /* single link */
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={closeSidebar}
        className="flex items-center gap-3 px-4 py-3 rounded-lg mb-1 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
      >
        <item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
        <div>
          <span className="block font-medium">{item.label}</span>
          <span className="block text-xs text-gray-500 dark:text-gray-400">
            {item.description}
          </span>
        </div>
      </Link>
    );
  };

  /* ─────────── top bar ─────────── */
  return (
    <>
      <header className="h-16 w-full flex items-center justify-between lg:justify-end bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-4 sm:px-6">
        {/* left: menu / logo */}
        <div className="flex gap-3 items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle sidebar"
          >
            <FiMenu size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          <p className="lg:hidden text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600">
            Leadnary
          </p>
        </div>

        {/* right: theme + user */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "dark" ? (
                <FiSun size={18} className="text-yellow-400" />
              ) : (
                <FiMoon size={18} className="text-gray-600" />
              )
            ) : (
              <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
            )}
          </button>

          {/* user dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2"
            >
              <div className="relative">
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 text-indigo-700 dark:text-gray-200 overflow-hidden flex items-center justify-center font-medium">
                  {user?.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user?.username?.charAt(0).toUpperCase() || "U"
                  )}
                </span>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
              </div>
              <FiChevronDown
                size={16}
                className={`transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 border dark:border-gray-700 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <p className="text-sm font-semibold truncate">
                      {user?.username || "User"}
                    </p>
                    <p className="text-xs truncate text-gray-500 dark:text-gray-400">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>

                  <div className="py-1.5">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                    >
                      <FiUser
                        size={14}
                        className="mr-3 text-indigo-600 dark:text-indigo-300"
                      />
                      My Profile
                    </Link>
                    <Link
                      href="/dashboard/support"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                    >
                      <FiHelpCircle
                        size={14}
                        className="mr-3 text-indigo-600 dark:text-indigo-300"
                      />
                      Help & Support
                    </Link>
                    <div className="border-t dark:border-gray-700 my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2.5 text-sm hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <FiLogOut
                        size={14}
                        className="mr-3 text-red-600 dark:text-red-300"
                      />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ─────────── mobile drawer ─────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={closeSidebar}
              className="fixed inset-0 z-40 bg-black lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-white dark:bg-gray-800 shadow-lg lg:hidden"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b dark:border-gray-700">
                <span className="font-extrabold text-indigo-600 dark:text-indigo-300">
                  Leadnary
                </span>
                <button
                  onClick={closeSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-1 py-4">
                {navItems.map(renderMobileItem)}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
