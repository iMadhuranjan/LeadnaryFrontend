"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiEye,
  FiCheck,
  FiZap,
  FiCode,
  FiShield,
} from "react-icons/fi";
import { FaChartLine, FaMobileAlt } from "react-icons/fa";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden dark:bg-gray-950  transition-colors duration-100">
      {/* Dot Grid Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#2f2f2f_1px,transparent_1px)] dark:bg-[radial-gradient(#3f3f3f_1px,transparent_1px)] [background-size:16px_16px] opacity-30 dark:opacity-70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 md:py-28 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight dark:text-gray-100"
        >
          Build and Launch Your Website <br className="hidden md:block" />
          <span className=" text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            in Under 60 Seconds
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="my-10 max-w-4xl mx-auto text-xl font-semibold dark:text-gray-400"
        >
          With Leadnary, create professional landing pages, collect leads, and
          track performance. Used by business owners, freelancers, and creators
          to go live in minutes.
        </motion.p>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 flex flex-wrap justify-center gap-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 cursor-pointer">
            <FiCode />
            Zero code
          </div>{" "}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300 cursor-pointer">
            <FiShield />
            Lead privacy
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 cursor-pointer">
            <FaChartLine />
            Track performance
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          {/* Primary CTA */}
          <Link
            href="/register"
            className="w-fit inline-flex items-center justify-center px-6 py-3 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-xl transition-all duration-300"
          >
            Start for Free
            <FiArrowRight className="ml-2" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/template"
            className="w-fit inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-base font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
          >
            Explore Templates
            <FiEye className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
