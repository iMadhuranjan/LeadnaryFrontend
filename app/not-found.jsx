"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-violet-50 dark:from-gray-900 dark:to-black flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-200 dark:border-gray-700 text-center"
      >
        <motion.h1
          className="text-7xl font-extrabold text-blue-600 dark:text-violet-500 mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Page Not Found
        </motion.h2>

        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold px-5 py-3 rounded-lg shadow-md hover:opacity-90 transition-all"
        >
          <FiArrowLeft className="text-lg" />
          Go to Homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
