// DashboardTopBar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiSun,
  FiMoon,
  FiLogOut,
  FiHelpCircle,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { useTheme } from "next-themes";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { authUser, logoutUser } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import { useToast } from "./ToastProvider";

export default function DashboardTopbar({ toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    dispatch(logoutUser())
      .then((result) => {
        if (result?.payload?.success) {
          toast.info(result.payload.message || "Logout successful");
          router.push("/");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch(() => {});
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownOpen && !e.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [dropdownOpen]);

  return (
    <header className="h-16 w-full flex items-center justify-between lg:justify-end bg-white dark:bg-black border-b dark:border-zinc-700 px-4 sm:px-6 transition-colors duration-100">
      {/* Left side - Menu button */}
      <div className="flex justify-center gap-3 items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <p className="lg:hidden text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 drop-shadow-sm">
          Leadnary
        </p>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle theme"
        >
          {mounted ? (
            theme === "dark" ? (
              <FiSun size={18} className="text-yellow-400" />
            ) : (
              <FiMoon size={18} className="text-gray-600" />
            )
          ) : (
            <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-zinc-600 animate-pulse" />
          )}
        </button>

        {/* User Dropdown */}
        <div className="relative dropdown-container">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2"
          >
            {console.log(user)}
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-zinc-700 dark:to-zinc-600 text-indigo-700 dark:text-gray-200 overflow-hidden relative flex items-center justify-center font-medium">
              {user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="User Avatar"
                  className=" w-full h-full object-cover"
                />
              ) : (
                user?.username?.charAt(0).toUpperCase() || "U"
              )}
            </span>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-800 rounded-lg shadow-xl z-50 border dark:border-zinc-700 overflow-hidden"
              >
                <div className="px-4 py-3 border-b dark:border-zinc-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {user?.username || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                <div className="py-1.5">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <FiSettings
                      className="mr-3 text-gray-500 dark:text-gray-400"
                      size={16}
                    />
                    Settings
                  </Link>
                  <Link
                    href="/dashboard/support"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <FiHelpCircle
                      className="mr-3 text-gray-500 dark:text-gray-400"
                      size={16}
                    />
                    Support
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <FiLogOut
                      className="mr-3 text-gray-500 dark:text-gray-400"
                      size={16}
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
  );
}
