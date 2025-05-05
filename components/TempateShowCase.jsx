"use client";

import { motion } from "framer-motion";
import React from "react";
import { FiEye, FiExternalLink } from "react-icons/fi";

const TemplateShowcase = ({ templates }) => {
  const categories = [
    { id: "all", name: "All Templates" },
    { id: "doctor", name: "doctor" },
    { id: "gym", name: "GYM" },
    // { id: "ecommerce", name: "E-commerce" },
    // { id: "saas", name: "SaaS" },
  ];

  const [activeCategory, setActiveCategory] = React.useState("all");
  const [hoveredTemplate, setHoveredTemplate] = React.useState(null);

  const filteredTemplates =
    activeCategory === "all"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <div className=" mx-auto p-2 md:p-4 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="text-center mb-10 mt-5">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Stunning Templates for Your Next Project
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Professionally designed templates to kickstart your website
          development. Responsive, modern, and ready to deploy.
        </motion.p>
      </div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 mb-10"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            className="relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300"
          >
            {/* Template Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={template.imageUrl}
                alt={template.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  hoveredTemplate === template.id ? "scale-105" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="font-bold text-lg">{template.name}</h3>
                  <p className="text-sm text-gray-300">
                    {template.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                    {template.category}
                  </span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {template.type}
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {template.description}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {template.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  {template.previewUrl && (
                    <a
                      href={template.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FiEye className="mr-1.5" /> Preview
                    </a>
                  )}
                  {template.demoUrl && (
                    <a
                      href={template.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 transition-colors shadow-sm"
                    >
                      <FiExternalLink className="mr-1.5" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplateShowcase;
