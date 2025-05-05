"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiHome,
  FiPlus,
  FiFile,
  FiGlobe,
  FiUser,
  FiLock,
  FiPieChart,
  FiUsers,
  FiLayout,
  FiCreditCard,
  FiHelpCircle,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiSettings,
  FiActivity,
  FiLayers,
} from "react-icons/fi";

const Sidebar = ({ open, toggleSidebar }) => {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState({
    websites: false,
    account: false,
  });

  useEffect(() => {
    setOpenSections({
      websites:
        pathname.includes("/dashboard/websites") ||
        pathname.includes("/dashboard/create") ||
        pathname.includes("/dashboard/edit"),
      account:
        pathname.includes("/dashboard/profile") ||
        pathname.includes("/dashboard/settings"),
    });
  }, [pathname]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: FiHome,
      description: "Overview of your stats",
    },
    {
      label: "Websites",
      icon: FiGlobe,
      description: "Manage your websites",
      items: [
        {
          label: "Select Domain",
          href: "/dashboard/domain-select",
          icon: FiGlobe,
          description: "Choose a domain",
        },
        {
          label: "Create Website",
          href: "/dashboard/create",
          icon: FiPlus,
          description: "Build new website",
        },
        {
          label: "Edit Website",
          href: "/dashboard/edit",
          icon: FiFile,
          description: "Modify websites",
        },
        {
          label: "My Websites",
          href: "/dashboard/websites",
          icon: FiGlobe,
          description: "View all websites",
        },
      ],
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: FiActivity,
      description: "Track views and traffic",
    },
    {
      label: "Leads",
      href: "/dashboard/leads",
      icon: FiUsers,
      description: "View submitted leads",
    },
    {
      label: "Templates",
      href: "/dashboard/templates",
      icon: FiLayers,
      description: "Pre-designed templates",
    },
    {
      label: "Account",
      icon: FiUser,
      description: "Profile and settings",
      items: [
        {
          label: "Profile",
          href: "/dashboard/profile",
          icon: FiUser,
          description: "Personal information",
        },
        {
          label: "Change Password",
          href: "/dashboard/change-password",
          icon: FiLock,
          description: "Set new password",
        },
      ],
    },
    {
      label: "My Plan",
      href: "/dashboard/upgrade",
      icon: FiCreditCard,
      description: "View and upgrade plan",
    },
    {
      label: "Support",
      href: "/dashboard/support",
      icon: FiHelpCircle,
      description: "Tickets and support",
    },
    {
      label: "Custom Domain",
      href: "/dashboard/domains",
      icon: FiLayers,
      description: "Add a Custom Domain",
    },
  ];

  const isActive = (href) => pathname === href;

  const renderNavItem = (item) => {
    if (item.items) {
      return (
        <div key={item.label} className="mb-1">
          <button
            onClick={() => toggleSection(item.label.toLowerCase())}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
              openSections[item.label.toLowerCase()]
                ? "bg-gray-100/80 dark:bg-gray-700/80"
                : "hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg text-indigo-600 dark:text-indigo-300">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block font-medium">{item.label}</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  {item.description}
                </span>
              </div>
            </div>
            {openSections[item.label.toLowerCase()] ? (
              <FiChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <FiChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {openSections[item.label.toLowerCase()] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="ml-2 mt-1 space-y-1 pl-10">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      onClick={toggleSidebar}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                        isActive(subItem.href)
                          ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                          : "hover:bg-gray-100/30 dark:hover:bg-gray-700/30"
                      }`}
                    >
                      <subItem.icon
                        className={`w-4 h-4 ${
                          isActive(subItem.href)
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      />
                      <div>
                        <span>{subItem.label}</span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400">
                          {subItem.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link
        key={item.label}
        href={item.href}
        onClick={toggleSidebar}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
          isActive(item.href)
            ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
            : "hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
        }`}
      >
        <div className="p-2 rounded-lg text-indigo-600 dark:text-indigo-300">
          <item.icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="block font-medium">{item.label}</span>
          <span className="block text-xs text-gray-500 dark:text-gray-400">
            {item.description}
          </span>
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 z-20 bg-black/30 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 border-r dark:border-gray-700 lg:hidden flex flex-col shadow-xl"
          >
            <div className="flex items-center justify-between px-6 border-b dark:border-gray-700">
              <Link
                href="/"
                className="text-xl py-5 font-bold text-gray-900 dark:text-white"
              >
                Leadnary
              </Link>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <nav className="space-y-1">{navItems.map(renderNavItem)}</nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex lg:flex-col z-50 fixed inset-y-0 left-0 w-72 bg-white dark:bg-black/20 "
      >
        <div className="flex justify-start items-center px-3 ml-7 mt-3 pb-3">
          <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 drop-shadow-sm"
          >
            Leadnary
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-5 space-y-1">
            {navItems.map(renderNavItem)}
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
