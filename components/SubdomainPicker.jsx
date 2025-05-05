"use client";

import { motion } from "framer-motion";
import { FiGlobe, FiZap, FiArrowRight } from "react-icons/fi";
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";
import Link from "next/link";

const SubdomainPicker = ({ subs, selectedSub, setSelectedSub, darkMode }) => {
  const hasAvailableSub = subs.some((sub) => !sub.pageId);
  const hasNoDomains = subs.length === 0;

  const handleClick = (sub) => {
    if (!sub.pageId) {
      setSelectedSub(sub.name);
    }
  };

  return (
    <div className="mb-5 dark:bg-gray-800 p-4 rounded-xl">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FiGlobe className="text-blue-600 dark:text-violet-400 text-4xl" />
          Select Your Domain Name
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Choose where your landing page will be published.
        </p>
      </motion.div>

      {/* No domains state - Premium Design */}
      {/* No domains state - Simple version */}
      {hasNoDomains && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
              <FiGlobe size={20} />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="font-medium text-gray-800 dark:text-white">
                Please choose a domain name to get started
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                You need to select a domain before creating your landing page
              </p>
            </div>
            <Link
              href="/dashboard/domain-select"
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white shadow-sm hover:shadow transition-colors"
            >
              Select Domain
            </Link>
          </div>
        </motion.div>
      )}

      {/* Subdomain List */}
      {!hasNoDomains && (
        <div className="flex flex-wrap gap-4">
          {subs.map((sub) => {
            const isDisabled = !!sub.pageId;
            const isSelected = selectedSub === sub.name && !isDisabled;

            return (
              <motion.div
                key={sub.name}
                whileHover={{ scale: isDisabled ? 1 : 1.03 }}
                whileTap={{ scale: isDisabled ? 1 : 0.97 }}
                onClick={() => handleClick(sub)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all border
                  ${
                    isSelected
                      ? "border-blue-600 dark:border-violet-500 bg-blue-50 dark:bg-violet-900/30 shadow-md"
                      : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-400 dark:hover:border-violet-400"
                  }
                  ${
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "shadow-sm hover:shadow-md cursor-pointer"
                  }
                `}
              >
                {/* Radio Icon */}
                {isSelected ? (
                  <IoMdRadioButtonOn
                    size={18}
                    className="text-blue-600 dark:text-violet-400"
                  />
                ) : (
                  <IoMdRadioButtonOff
                    size={18}
                    className={`${
                      isDisabled
                        ? "text-gray-300 dark:text-gray-600"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                )}

                {/* Domain Name */}
                <span
                  className={`font-semibold text-sm break-all ${
                    isDisabled
                      ? "text-gray-400 dark:text-gray-500"
                      : "text-gray-800 dark:text-white"
                  }`}
                >
                  {sub.name}
                </span>

                {/* If in use show badge */}
                {isDisabled && (
                  <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                    In Use
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {!hasNoDomains && !hasAvailableSub && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl bg-blue-50/60 dark:bg-violet-900/30 border border-blue-200 dark:border-violet-700/50 shadow-xs hover:shadow-sm transition-all"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-shrink-0 p-2.5 rounded-lg bg-white/80 dark:bg-gray-800/50 text-blue-600 dark:text-violet-300 shadow-xs border border-blue-100 dark:border-violet-600/30">
              <FiZap className="text-lg" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h4 className="font-medium text-blue-800 dark:text-violet-100">
                All Domains In Use
              </h4>
              <p className="text-sm text-blue-700/90 dark:text-violet-200/80 mt-1">
                Please Create Some subdomains or Upgrade to unlock more
                subdomains and premium features
              </p>
            </div>
            <Link
              href="/dashboard/upgrade"
              className="px-4 py-2.5 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white shadow-xs hover:shadow-sm transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <FiArrowRight className="text-sm" />
              Upgrade Now
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SubdomainPicker;
