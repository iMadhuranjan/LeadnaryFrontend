"use client";

import TemplatePicker from "./TemplatePicker";
import SubdomainPicker from "./SubdomainPicker";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { createLandingPage } from "@/app/store/pageSlice";
import { getDeep, setDeep } from "@/templates/deep-utils";
import { templates, getTemplate } from "@/templates";

import { motion, AnimatePresence } from "framer-motion";
import {
  FiUpload,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
  FiArrowRight,
  FiZap,
  FiGlobe,
  FiAward,
  FiLayers,
} from "react-icons/fi";

export default function LandingPageCreator() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  /* ── sub–domains ─────────────────────────────────────────────── */
  const subs = useSelector((s) => s.auth.user?.subdomains || []);
  const hasAvailableSub = subs.some((s) => !s.pageId);
  const userPlan = useSelector((s) => s.auth.user?.plan);

  const [selectedSub, setSelectedSub] = useState("");
  useEffect(() => {
    if (!selectedSub) {
      const free = subs.find((s) => !s.pageId);
      if (free) setSelectedSub(free.name);
    }
  }, [subs, selectedSub]);

  /* ── template picker ─────────────────────────────────────────── */
  const [activeCategory, setActiveCategory] = useState("all");
  const [templateId, setTemplateId] = useState(templates[0].id);
  const tpl = getTemplate(templateId);

  /* ── form data ───────────────────────────────────────────────── */
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData(structuredClone(tpl?.defaultData || {}));
  }, [templateId, tpl]);

  const handleField = (path, value) =>
    setFormData((old) => {
      const copy = structuredClone(old);
      setDeep(copy, path, value);
      return copy;
    });

  /* ── image upload helper ─────────────────────────────────────── */
  const [fileError, setFileError] = useState("");
  const [uploadStatus, setUploadStatus] = useState({});

  async function handleFileChange(path, file) {
    if (file.size > 2 * 1024 * 1024) {
      setFileError("Image too large. Max 2 MB.");
      setUploadStatus((s) => ({ ...s, [path]: "error" }));
      return;
    }
    setFileError("");
    setUploadStatus((s) => ({ ...s, [path]: "uploading" }));

    const reader = new FileReader();
    reader.onloadend = async () => {
      handleField(path, reader.result); // local preview
      try {
        const res = await fetch("https://api.leadnary.com/api/upload/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: reader.result,
            subdomain: selectedSub,
          }),
        });
        const data = await res.json();
        if (data?.success) {
          handleField(path, data.secure_url || data.url);
          setUploadStatus((s) => ({ ...s, [path]: "uploaded" }));
        } else throw new Error(data?.message || "Upload failed");
      } catch (err) {
        console.error(err);
        setUploadStatus((s) => ({ ...s, [path]: "error" }));
      }
    };
    reader.readAsDataURL(file);
  }

  /* ── submit ──────────────────────────────────────────────────── */
  const { loading, error } = useSelector((s) => s.page);
  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      createLandingPage({
        template: templateId,
        data: formData,
        subdomain: selectedSub,
      })
    );
    if (result.payload?.success) window.open(`/site/${selectedSub}`, "_blank");
  };

  /* ── render ──────────────────────────────────────────────────── */
  return (
    <div
      className={`min-h-screen transition-colors dark:bg-gray-900 p-2 md:p-4 `}
    >
      <div className="mx-auto px-2 sm:px-3 lg:px-3 py-6">
        {/* any file-upload error */}
        <AnimatePresence>
          {fileError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 mb-6 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 font-medium flex items-center gap-2 border border-red-200 dark:border-red-800/50"
            >
              <FiXCircle size={20} /> {fileError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sub-domain picker (always) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <SubdomainPicker
            subs={subs}
            selectedSub={selectedSub}
            setSelectedSub={setSelectedSub}
            darkMode={darkMode}
          />
        </motion.div>

        {/* Template picker (always) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <TemplatePicker
            templates={templates}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            templateId={templateId}
            setTemplateId={setTemplateId}
            darkMode={darkMode}
            userPlan={userPlan}
          />
        </motion.div>

        {/* Upgrade notice when no free domain */}
        <AnimatePresence>
          {!hasAvailableSub && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mt-8 p-8 text-center rounded-2xl border border-transparent bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-blue-900/20 dark:via-gray-900 dark:to-violet-900/10 shadow-lg relative overflow-hidden"
            >
              {/* Decorative circles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-200/30 dark:bg-blue-700/20 blur-xl"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-violet-200/20 dark:bg-violet-600/10 blur-xl"></div>
              </div>

              <div className="relative z-10">
                {/* Lightning icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg">
                  <FiZap size={28} className="animate-pulse" />
                </div>

                {/* Heading */}
                <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-violet-400 dark:to-blue-300">
                  Unlock More Subdomains
                </h3>
                <p className="mb-6 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                  All your current subdomains are in use. Upgrade your plan to
                  create more stunning landing pages and even connect your own
                  custom domains.
                </p>

                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
                  {[
                    { icon: <FiLayers />, text: "More subdomains" },
                    { icon: <FiAward />, text: "Premium templates" },
                    { icon: <FiGlobe />, text: "Custom domains" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -3 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
                        {item.icon}
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Upgrade button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => router.push("/billing")}
                >
                  Upgrade Your Plan
                  <FiArrowRight className="animate-pulse" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content editor only if at least one free domain */}
        {hasAvailableSub && (
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-2xl ${
                darkMode ? "bg-gray-800/50" : "bg-white"
              } shadow-xl border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className={`p-3 rounded-xl ${
                    darkMode ? "bg-violet-900/50" : "bg-violet-100"
                  } text-violet-600 dark:text-violet-300`}
                >
                  <FiPlus size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Customize Your Content
                  </h2>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Fill in your content and see your landing page come to life
                  </p>
                </div>
              </div>

              {/* form */}
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tpl.fields.map(
                    ({ path, label, type = "text", required }) => {
                      const value = getDeep(formData, path) ?? "";
                      const isImage = /Url$/i.test(path.split(".").pop());
                      const Tag = type === "textarea" ? "textarea" : "input";

                      return (
                        <motion.div
                          key={path}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className={`space-y-3 ${
                            type === "textarea" ? "md:col-span-2" : ""
                          }`}
                        >
                          <label
                            className={`block text-sm font-medium ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {label}
                            {required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </label>

                          {isImage ? (
                            /* ── image uploader ── */
                            <>
                              <motion.label
                                whileHover={{ scale: 1.01 }}
                                className={`block rounded-xl border-2 border-dashed ${
                                  darkMode
                                    ? "border-gray-600 hover:border-violet-500 bg-gray-800/50"
                                    : "border-gray-300 hover:border-blue-400 bg-white"
                                } p-4 text-center cursor-pointer transition-all h-48 flex flex-col items-center justify-center relative overflow-hidden group`}
                              >
                                {!value ? (
                                  <div className="space-y-2">
                                    <div className="mx-auto w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-50 dark:group-hover:bg-violet-900/30 transition-colors">
                                      <FiUpload
                                        size={18}
                                        className={`${
                                          darkMode
                                            ? "text-gray-400 group-hover:text-violet-400"
                                            : "text-gray-500 group-hover:text-blue-600"
                                        } transition-colors`}
                                      />
                                    </div>
                                    <p
                                      className={`text-sm ${
                                        darkMode
                                          ? "text-gray-400 group-hover:text-violet-300"
                                          : "text-gray-500 group-hover:text-blue-600"
                                      } transition-colors`}
                                    >
                                      Click to upload image
                                    </p>
                                    <p
                                      className={`text-xs mt-1 ${
                                        darkMode
                                          ? "text-gray-500 group-hover:text-violet-400"
                                          : "text-gray-400 group-hover:text-blue-500"
                                      } transition-colors`}
                                    >
                                      PNG, JPG (max 2 MB)
                                    </p>
                                  </div>
                                ) : (
                                  <div className="relative w-full h-full">
                                    <img
                                      src={value}
                                      alt="preview"
                                      className="w-full h-full object-contain rounded-lg"
                                    />
                                    {uploadStatus[path] === "uploading" && (
                                      <div
                                        className={`absolute inset-0 bg-black/30 flex items-center justify-center ${
                                          darkMode
                                            ? "text-violet-300"
                                            : "text-blue-600"
                                        }`}
                                      >
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current" />
                                      </div>
                                    )}
                                  </div>
                                )}
                                <input
                                  type="file"
                                  accept="image/*"
                                  required={required && !value}
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileChange(path, file);
                                  }}
                                  className="hidden"
                                />
                              </motion.label>

                              <div className="flex items-center gap-2 text-sm">
                                {uploadStatus[path] === "uploading" && (
                                  <span
                                    className={`flex items-center gap-1 ${
                                      darkMode
                                        ? "text-violet-400"
                                        : "text-blue-600"
                                    }`}
                                  >
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current" />
                                    Uploading…
                                  </span>
                                )}
                                {uploadStatus[path] === "error" && (
                                  <span className="flex items-center gap-1 text-red-500">
                                    <FiXCircle size={14} /> Upload failed
                                  </span>
                                )}
                                {value && uploadStatus[path] === "uploaded" && (
                                  <span
                                    className={`flex items-center gap-1 ${
                                      darkMode
                                        ? "text-green-400"
                                        : "text-green-600"
                                    }`}
                                  >
                                    <FiCheckCircle size={14} /> Upload
                                    successful
                                  </span>
                                )}
                              </div>
                            </>
                          ) : (
                            /* ── text / textarea ── */
                            <Tag
                              type={type === "number" ? "number" : "text"}
                              rows={type === "textarea" ? 5 : undefined}
                              value={value}
                              required={required}
                              onChange={(e) =>
                                handleField(path, e.target.value)
                              }
                              className={`w-full rounded-xl p-3 border ${
                                darkMode
                                  ? "bg-gray-800/50 border-gray-700 focus:border-violet-500 focus:ring-violet-500/30"
                                  : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/30"
                              } focus:ring-2 outline-none transition shadow-sm placeholder-gray-400 dark:placeholder-gray-500`}
                            />
                          )}
                        </motion.div>
                      );
                    }
                  )}
                </div>

                {/* ── publish button + errors ── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-10"
                >
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={loading || !selectedSub}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 transition-all ${
                      loading || !selectedSub
                        ? "opacity-70 cursor-not-allowed"
                        : "shadow-lg hover:shadow-xl"
                    } flex items-center justify-center gap-2 relative overflow-hidden`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Publishing…
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Publish Now</span>
                        <FiArrowRight className="relative z-10" />
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-violet-600/10 opacity-0 hover:opacity-100 transition-opacity"></span>
                      </>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mt-4 p-3 rounded-lg ${
                          darkMode ? "bg-red-900/30" : "bg-red-100"
                        } text-red-600 dark:text-red-300 flex items-center gap-2 border ${
                          darkMode ? "border-red-800/50" : "border-red-200"
                        }`}
                      >
                        <FiXCircle size={18} />
                        <span>{error.message || JSON.stringify(error)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
