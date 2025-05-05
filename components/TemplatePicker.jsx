"use client";
import { motion } from "framer-motion";
import { FiEye, FiCheck, FiLock } from "react-icons/fi";

const TemplatePicker = ({
  templates, // [{ id, name, category, previewUrl?, access: "free"|"pro"|"business" }, …]
  userPlan, // "free" | "pro" | "business"
  activeCategory,
  setActiveCategory,
  templateId,
  setTemplateId,
}) => {
  const categories = [
    { id: "all", name: "All Templates" },
    { id: "business", name: "Business" },
    { id: "GYM", name: "Gym" },
    { id: "doctor", name: "Doctor" },
    { id: "card", name: "Card" },
  ];

  // Map each userPlan → which access‐levels they get
  const accessMap = {
    free: ["free"],
    pro: ["free", "pro"],
    business: ["free", "pro", "business"],
  };

  // First filter by plan access, then by category
  const accessibleTemplates = templates.filter(
    (t) => accessMap[userPlan]?.includes(t.access ?? "free") // default to free if no access field
  );
  const filteredTemplates =
    activeCategory === "all"
      ? accessibleTemplates
      : accessibleTemplates.filter((t) => t.category === activeCategory);

  return (
    <div className="mb-12 mx-auto dark:bg-gray-800 p-4 rounded-xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg">
            <FiEye className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Template Gallery
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Select your perfect starting point
            </p>
          </div>
        </div>
      </motion.div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeCategory === cat.id
                ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700"
            }`}
          >
            {cat.name}
          </motion.button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTemplates.map((template) => {
          const isSelected = template.id === templateId;
          const isAccessible = accessMap[userPlan].includes(template.access);

          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={
                isAccessible
                  ? { y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.08)" }
                  : {}
              }
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => isAccessible && setTemplateId(template.id)}
              className={`
                relative rounded-2xl transition-all cursor-pointer overflow-hidden p-5
                ${
                  isSelected
                    ? "border-2 border-blue-600 dark:border-violet-500 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-gray-800 dark:to-gray-900 shadow-xl"
                    : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-violet-400 shadow-sm hover:shadow-lg"
                }
                ${!isAccessible ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {/* Template Info */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate">
                    {template.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                    {template.category}
                  </span>
                </div>

                {/* Selection or Lock */}
                {isSelected ? (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white">
                    <FiCheck size={16} />
                  </div>
                ) : isAccessible ? (
                  <div className="w-7 h-7 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-blue-400 dark:group-hover:border-violet-400 transition-all"></div>
                ) : (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400">
                    <FiLock size={16} />
                  </div>
                )}
              </div>

              {/* Preview Button */}
              {template.previewUrl && isAccessible && (
                <motion.a
                  href={template.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 block w-full py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-violet-600 text-white text-center transition-all shadow-md hover:brightness-110"
                >
                  Preview Template
                </motion.a>
              )}

              {/* Overlay lock on inaccessible */}
              {!isAccessible && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                  <FiLock size={32} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplatePicker;
