"use client";

import { motion } from "framer-motion";
import {
  FiGlobe,
  FiClock,
  FiZap,
  FiMail,
  FiCheck,
  FiLink,
} from "react-icons/fi";

const Page = () => {
  return (
    <div className="flex items-center justify-center p-2 min-h-[90vh] md:p-4 bg-gradient-to-br dark:from-gray-900 dark:to-gray-900 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-4xl rounded-3xl border border-gray-200 dark:border-gray-700 p-3 py-6 md:p-10 text-center bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-purple-50/20 to-violet-50/20 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-violet-900/10 bg-[length:300%_100%] -z-10"
        />

        {/* Main content */}
        <div className="relative z-10">
          {/* Large coming soon heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              COMING SOON
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          {/* Feature announcement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-5"
          >
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-3">
              Custom Domains for Your Leadnary Website
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're excited to announce that soon you'll be able to connect your
              own professional domain to your Leadnary site!
            </p>
          </motion.div>

          {/* Feature preview card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 max-w-2xl mx-auto mb-10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-sm font-mono text-gray-500 dark:text-gray-400 flex items-center">
                <FiLink className="mr-2" /> yourbrand.com
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 mb-4">
              <div className="text-left">
                <div className="flex items-center text-blue-600 dark:text-blue-300 mb-2">
                  <FiGlobe className="mr-2" />
                  <span className="font-medium">Custom Domain Setup</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  This domain is now connected to your Leadnary website. All
                  traffic will be automatically redirected with SSL security.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                "SSL Secured",
                "Instant Setup",
                "DNS Management",
                "24/7 Support",
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="flex items-center justify-center space-x-1 bg-gray-100 dark:bg-gray-700/50 rounded px-3 py-2 text-xs"
                >
                  <FiCheck className="text-green-500" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500" />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-violet-500/20" />

        <motion.div
          className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-blue-400/10 blur-xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            transition: { duration: 8, repeat: Infinity },
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 h-30 w-40 rounded-full bg-purple-400/10 blur-xl"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            transition: { duration: 10, repeat: Infinity, delay: 2 },
          }}
        />
      </motion.div>
    </div>
  );
};

export default Page;
