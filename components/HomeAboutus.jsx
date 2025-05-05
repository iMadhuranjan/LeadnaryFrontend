"use client";

import { motion } from "framer-motion";
import { FiZap, FiTrendingUp, FiCpu, FiShield } from "react-icons/fi";
import { FaChartBar, FaLaptopCode } from "react-icons/fa";

const WhatsInLeadnary = () => {
  const cards = [
    {
      icon: <FiShield />,
      title: "Lead Management",
      description:
        "Categorize and track leads in a secure dashboard with IP & UTM data. Tag statuses (new, good, bad, neutral) — only you have access.",
      gradient: "from-purple-500 to-pink-500",
      badgeColor:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    },
    {
      icon: <FaChartBar />,
      title: "Real-Time Analytics",
      description:
        "View total visits, unique visitors, country splits, and device breakdown — all automatically tracked.",
      gradient: "from-green-500 to-teal-500",
      badgeColor:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    },
    {
      icon: <FaLaptopCode />,
      title: "Modern Responsive Templates",
      description:
        "All templates are SEO-friendly, built with React, mobile-ready, and come with an integrated form that sends responses directly to your private dashboard.",
      gradient: "from-blue-500 to-purple-500",
      badgeColor:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    },
    {
      icon: <FiZap />,
      title: "Fast Ticket Support",
      description:
        "Raise support tickets directly from your dashboard. No delays, clear status, instant help.",
      gradient: "from-yellow-500 to-amber-500",
      badgeColor:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    },
    {
      icon: <FiTrendingUp />,
      title: "SEO & Performance",
      description:
        "Templates optimized for speed, SEO best practices, and fast load times with zero bloat.",
      gradient: "from-indigo-500 to-violet-500",
      badgeColor:
        "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    },
    {
      icon: <FiCpu />,
      title: "Modern Tech Stack",
      description:
        "Powered by React, TailwindCSS, and a cutting-edge deployment pipeline to ensure peak performance.",
      gradient: "from-rose-500 to-fuchsia-500",
      badgeColor:
        "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
    },
  ];

  return (
    <section className="relative overflow-hidden dark:bg-gray-950  transition-colors duration-100 pb-10">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#2f2f2f_1px,transparent_1px)] dark:bg-[radial-gradient(#3f3f3f_1px,transparent_1px)] [background-size:16px_16px] opacity-30 dark:opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-6 border border-gray-200 dark:border-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium text-sm">
              Powerful Features
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            What's in{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Leadnary?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to capture, manage, and convert leads in one
            intuitive platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                hover: { duration: 0.2 },
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              {/* Animated gradient border */}
              <div
                className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300`}
              ></div>

              {/* Card Container */}
              <div className="relative h-full bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200  cursor-pointer">
                {/* Icon with refined gradient */}
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-lg mb-5 bg-gradient-to-br ${card.gradient} text-white text-xl`}
                >
                  {card.icon}
                </div>

                {/* Content with improved typography */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
                    {card.description}
                  </p>
                </div>

           
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsInLeadnary;
