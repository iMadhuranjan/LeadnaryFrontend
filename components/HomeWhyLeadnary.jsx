"use client";

import { motion } from "framer-motion";
import {
  FiZap,
  FiDollarSign,
  FiCode,
  FiPieChart,
  FiUnderline,
} from "react-icons/fi";
import { FaMagic, FaShieldAlt } from "react-icons/fa";
import { ComparisonCards, ComparisonTable } from "./HomeCompariosnTable";
import Link from "next/link";

const WhyLeadnary = () => {
  const benefits = [
    {
      icon: <FaMagic className="w-5 h-5" />,
      title: "No-Code Magic",
      description:
        "Create professional websites in minutes without touching a single line of code - just fill your website form and go live instantly.",
    },
    {
      icon: <FiUnderline className="w-5 h-5" />,
      title: "Zero Limitations",
      description:
        "Unlike competitors, we impose no limits on traffic or leads. Get unlimited visitors and capture every opportunity.",
    },
    {
      icon: <FiDollarSign className="w-5 h-5" />,
      title: "All-In-One Free",
      description:
        "No hidden costs for your domain, hosting, or analytics. Everything you need comes built-in at no charge.",
    },
    {
      icon: <FiPieChart className="w-5 h-5" />,
      title: "Built-In Analytics",
      description:
        "Real-time visitor tracking with IP/UTM data included automatically - no complex integrations needed.",
    },
    {
      icon: <FiCode className="w-5 h-5" />,
      title: "No Tech Headaches",
      description:
        "Forget about plugins, updates, or compatibility issues. We handle all the technical complexity for you.",
    },
    {
      icon: <FaShieldAlt className="w-5 h-5" />,
      title: "Enterprise Security",
      description:
        "Military-grade protection for your data and leads without any setup or additional cost.",
    },
  ];

  return (
    <section className="relative overflow-hidden dark:bg-gray-950 py-24">
      {/* Background elements matching your style */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#2f2f2f_1px,transparent_1px)] dark:bg-[radial-gradient(#3f3f3f_1px,transparent_1px)] [background-size:16px_16px] opacity-30 dark:opacity-70" />
      </div>
      {/* <div className="absolute -top-32 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-6 border border-gray-200 dark:border-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium text-sm">
              The Leadnary Difference
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Leadnary?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The only free, no-code solution that gives you everything -
            unlimited traffic, built-in analytics, and enterprise features
            without the complexity.
          </p>
        </motion.div>

        {/* Comparison table */}
        <ComparisonTable />

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              <div
                className={`absolute -inset-0.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300`}
              ></div>
              <div className="relative h-full bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm group-hover:shadow-md transition-all duration-300 cursor-pointer">
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4 bg-gradient-to-br from-blue-500 to-purple-500 text-white`}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center bg-white dark:bg-gray-900 px-8 py-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Ready to experience the difference?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join thousands of businesses growing with Leadnary
              </p>
            </div>
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-md transition-shadow">
              <Link href={"/login"}>Create Your Free Website</Link>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyLeadnary;
