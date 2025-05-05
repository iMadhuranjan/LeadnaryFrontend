"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiCheck,
  FiX,
  FiZap,
  FiStar,
  FiAward,
  FiHelpCircle,
  FiMail,
  FiGlobe,
  FiCreditCard,
  FiShield,
  FiChevronDown,
} from "react-icons/fi";
import { FaRocket, FaChartLine, FaLightbulb } from "react-icons/fa";
import Link from "next/link";

const PricingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const plans = [
    {
      name: "Free",
      price: "₹0",
      duration: "forever",
      description: "Perfect for getting started",
      featured: false,
      cta: "Get Started",
      features: [
        "Create 1 Website",
        "Basic Templates",
        "Community Support",
        "Advanced Analytics",
        "Unlimited Lead Capture",
      ],
      icon: <FiStar className="w-6 h-6 text-blue-500" />,
    },
    {
      name: "Pro",
      price: "₹99",
      duration: "per month",
      description: "For growing businesses",
      featured: true,
      cta: "Upgrade to Pro",
      features: [
        "Everything in Free Plan",
        "Create up to 5 Websites",
        "Access to Pro Templates",
        "Priority email support",
        "Advanced Analytics Dashboard",
      ],
      badge: "MOST POPULAR",
      icon: <FiZap className="w-6 h-6 text-purple-500" />,
    },

    {
      name: "Business",
      price: "₹299",
      duration: "per month",
      description: "For established businesses",
      featured: false,
      cta: "Choose Plan",
      features: [
        "Everything in Pro Plan",
        "Create up to 10 Websites",
        "Premium Business Templates",
        "Dedicated account manager",
        "Priority Feature Requests",
      ],
      icon: <FaRocket className="w-6 h-6 text-indigo-500" />,
    },
  ];

  const faqs = [
    {
      question: "What happens if I don't renew my plan after upgrade?",
      answer:
        "If you don't renew your plan within 5 days of expiration, all custom domains you've chosen will be released. Your First websites will remain accessible on our subdomain unless you explicitly cancel your account.",
    },
    {
      question: "Is there any discount available?",
      answer:
        "No, our pricing is already the most competitive in the market. We don't offer additional discounts as we believe in transparent, fair pricing for all customers.",
    },
    {
      question: "Is there any cancellation policy?",
      answer:
        "You can cancel your subscription at any time, but we don't offer refunds for partial months. When you cancel, you'll retain access to paid features until the end of your billing period.",
    },
    {
      question: "Can I switch plans later?",
      answer:
        "Yes, you can upgrade or downgrade at any time. When upgrading, you'll be charged a prorated amount for the remaining period. Downgrades take effect at your next billing cycle.",
    },
    {
      question: "Do you offer annual billing?",
      answer:
        "Yes! We offer 2 months free when you choose annual billing. Contact our sales team for annual billing options.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#2f2f2f_1px,transparent_1px)] dark:bg-[radial-gradient(#3f3f3f_1px,transparent_1px)] [background-size:16px_16px] opacity-30 dark:opacity-70" />
        <div className="absolute -top-32 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-indigo-500/10 blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-6 border border-gray-200 dark:border-gray-800"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium text-sm">
              SIMPLE, TRANSPARENT PRICING
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Pricing built for{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              every stage
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Start free, upgrade as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ y: plan.featured ? -8 : -5 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className={`relative rounded-xl border transition-all ${
                plan.featured
                  ? "border-transparent bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 shadow-2xl"
                  : "border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg"
              }`}
            >
              {/* Gradient border for featured */}
              {plan.featured && (
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-md z-0"></div>
              )}

              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="relative h-full bg-white dark:bg-gray-900 rounded-xl p-8 z-10 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 mb-1">
                      {plan.duration}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <FiCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-auto"
                >
                  <Link
                    href={"/login"}
                    className={`block w-full py-3 px-6 rounded-lg font-medium text-center transition-all ${
                      plan.featured
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/20"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently asked questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Can't find the answer you're looking for?{" "}
              <Link
                href="/contact"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Contact our support team
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{
                      rotate: activeFaq === index ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6 text-gray-600 dark:text-gray-400"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;
