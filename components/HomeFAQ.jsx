"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiZap,
  FiMail,
  FiGlobe,
  FiCreditCard,
  FiShield,
} from "react-icons/fi";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does Leadnary differ from other website builders?",
      answer:
        "Leadnary is the only free platform offering unlimited traffic, built-in lead analytics with UTM/IP tracking, and enterprise security - all without coding. Traditional builders charge extra for these features or don't offer them at all.",
      icon: <FiZap className="text-purple-500" />,
    },
    {
      question: "Is there really no limit on traffic or leads?",
      answer:
        "Absolutely! Unlike competitors who limit free plans to 40-100 leads/month, Leadnary imposes no restrictions. Your website can handle unlimited visitors and capture every lead without paywalls.",
      icon: <FiGlobe className="text-blue-500" />,
    },
    {
      question: "How long does it take to set up my website?",
      answer:
        "With our no-code form, you can go live in under 30 seconds. Just fill in your business details, choose a template, and your professional site with built-in lead capture is ready instantly.",
      icon: <FiCreditCard className="text-green-500" />,
    },
    {
      question: "What about domains and hosting?",
      answer:
        "Everything is included - no separate hosting or domain purchases needed. We provide free subdomains (yourbusiness.leadnary.com) with SSL security included.",
      icon: <FiShield className="text-amber-500" />,
    },
    {
      question: "How do I access my leads and analytics?",
      answer:
        "Every Leadnary site comes with a private dashboard showing all form submissions, visitor analytics, and lead details including UTM sources and IP data - accessible only to you.",
      icon: <FiMail className="text-rose-500" />,
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 dark:bg-gray-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#2f2f2f_1px,transparent_1px)] dark:bg-[radial-gradient(#3f3f3f_1px,transparent_1px)] [background-size:16px_16px] opacity-30 dark:opacity-70" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-6 border border-gray-200 dark:border-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium text-sm">
              COMMON QUESTIONS
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              FAQs
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about Leadnary's powerful platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex items-start justify-between text-left p-6 rounded-xl border transition-all duration-300 ${
                  activeIndex === index
                    ? "border-transparent bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 shadow-sm"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">{faq.icon}</div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 flex-shrink-0"
                >
                  <FiChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-gray-600 dark:text-gray-300 pl-10">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-md px-8 py-6 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Still have questions?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our support team is ready to help
              </p>
            </div>
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-md transition-shadow">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
