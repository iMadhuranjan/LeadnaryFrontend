// components/PageList.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPages, toggleLandingPage } from "@/app/store/pageSlice";
import { useToast } from "@/components/ToastProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiExternalLink,
  FiPlus,
  FiRefreshCw,
  FiGlobe,
  FiEdit,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";
import { HiOutlineStatusOnline, HiOutlineStatusOffline } from "react-icons/hi";
import { SharingunLoader } from "@/components/Spinner";

export default function PageList() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { pages = [], loading, error } = useSelector((s) => s.page);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadPages = () => {
    setIsRefreshing(true);
    dispatch(fetchMyPages()).finally(() => setIsRefreshing(false));
  };

  useEffect(() => {
    loadPages();
  }, [dispatch]);

  const handleToggle = async (subdomain, active) => {
    try {
      await dispatch(toggleLandingPage({ subdomain, active: !active }));
      toast.success(
        `Page ${!active ? "activated" : "deactivated"} successfully`
      );
      dispatch(fetchMyPages());
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  if (loading && !isRefreshing) {
    return <SharingunLoader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
        <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
          <FiGlobe className="text-red-500 dark:text-red-400 text-2xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Oops! Something went wrong
        </h3>
        <p className="text-red-600 dark:text-red-400 max-w-md">
          {error.message || "We couldn't load your pages. Please try again."}
        </p>
        <button
          onClick={loadPages}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FiRefreshCw className={`${isRefreshing ? "animate-spin" : ""}`} />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  if (!pages.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="p-6 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <FiGlobe className="text-blue-500 dark:text-blue-400 text-3xl" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          No pages yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md text-center">
          You haven't created any pages yet. Get started by creating your first
          page.
        </p>
        <Link
          href="/dashboard/create"
          className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl"
        >
          <FiPlus />
          <span>Create New Page</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6  p-4 md:p-6 min-h-screen dark:bg-gray-900">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 py-4"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FiGlobe className="text-blue-600 dark:text-violet-400 text-4xl" />
          Manage Your Pages
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          View and manage all your websites in one place. Activate or deactivate
          them instantly with a single toggle.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {pages.map((p, index) => (
            <motion.div
              key={p.subdomain}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 rounded-lg ${
                        p.hasPage
                          ? p.active
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-gray-100 dark:bg-gray-700"
                          : "bg-red-100 dark:bg-red-900/30"
                      }`}
                    >
                      {p.hasPage ? (
                        p.active ? (
                          <HiOutlineStatusOnline className="text-green-500 dark:text-green-400 text-xl" />
                        ) : (
                          <HiOutlineStatusOffline className="text-gray-500 dark:text-gray-400 text-xl" />
                        )
                      ) : (
                        <FiGlobe className="text-red-500 dark:text-red-400 text-xl" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
                        {p.subdomain}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {p.hasPage
                          ? p.active
                            ? "Active"
                            : "Inactive"
                          : "No Page"}
                      </p>
                    </div>
                  </div>

                  {p.hasPage && (
                    <div className="relative flex flex-col items-center">
                      <button
                        onClick={() => {
                          if (!(p.systemDisabled && index !== 0)) {
                            handleToggle(p.subdomain, p.active);
                          }
                        }}
                        disabled={p.systemDisabled && index !== 0}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
                          p.systemDisabled && index !== 0
                            ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                            : p.active
                            ? "bg-blue-600"
                            : "bg-gray-200 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block w-4 h-4 transform transition-transform rounded-full bg-white ${
                            p.active ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>

                      {/* 🔒 Info message if locked */}
                      {p.systemDisabled && index !== 0 && (
                        <div className="mt-2 text-xs text-red-600 dark:text-red-400 text-center">
                          🔒 Locked – upgrade to unlock
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex space-x-3">
                  <Link
                    href={`/site/${p.subdomain}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
                  >
                    <FiExternalLink size={16} />
                    <span>Visit</span>
                  </Link>
                  <Link
                    href={`/dashboard/edit`}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
                  >
                    <FiEdit size={16} />
                    <span>Edit</span>
                  </Link>
                </div>
              </div>

              {p.hasPage && (
                <div
                  className={`px-6 py-3 text-sm font-medium ${
                    p.active
                      ? "bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-400"
                      : "bg-gray-50 dark:bg-red-700/10 text-red-700 dark:text-red-500"
                  } flex items-center justify-between`}
                >
                  <span>Page is {p.active ? "live" : "offline"}</span>
                  <a
                    href={`https://leadnary.com/site/${p.subdomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    leadnary.com/site/{p.subdomain}
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8"
      ></motion.div>
    </div>
  );
}
