// DashboardTopBar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiSun,
  FiMoon,
  FiLogOut,
  FiHelpCircle,
  FiSettings,
  FiUser,
  FiChevronDown,
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
  const dropdownRef = useRef(null);

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

  // Close dropdown when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="h-16 w-full flex items-center justify-between lg:justify-end bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-4 sm:px-6 transition-colors duration-100">
      {/* Left side - Menu button */}
      <div className="flex justify-center gap-3 items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 text-indigo-700 dark:text-gray-200 overflow-hidden relative flex items-center justify-center font-medium">
                {user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.username?.charAt(0).toUpperCase() || "U"
                )}
              </span>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            <FiChevronDown
              size={16}
              className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
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
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {user?.username || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                <div className="py-1.5">
                  <Link
                    href="/dashboard/profile"
                    onClick={handleLinkClick}
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors group"
                  >
                    <div className="p-1.5 mr-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                      <FiUser
                        className="text-indigo-600 dark:text-indigo-300"
                        size={14}
                      />
                    </div>
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/dashboard/support"
                    onClick={handleLinkClick}
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors group"
                  >
                    <div className="p-1.5 mr-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                      <FiHelpCircle
                        className="text-indigo-600 dark:text-indigo-300"
                        size={14}
                      />
                    </div>
                    <span>Help & Support</span>
                  </Link>
                  <div className="border-t dark:border-gray-700 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
                  >
                    <div className="p-1.5 mr-3 rounded-lg bg-red-100 dark:bg-red-900/40 group-hover:bg-red-200 dark:group-hover:bg-red-800 transition-colors">
                      <FiLogOut
                        className="text-red-600 dark:text-red-300"
                        size={14}
                      />
                    </div>
                    <span>Sign Out</span>
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
