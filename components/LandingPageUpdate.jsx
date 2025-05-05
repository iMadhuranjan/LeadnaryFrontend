// components/LandingPageUpdate.jsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateLandingPage } from "@/app/store/pageSlice";
import { getDeep, setDeep } from "@/templates/deep-utils";
import { templates, getTemplate } from "@/templates";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUpload,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
  FiGlobe,
  FiEdit2,
} from "react-icons/fi";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";

/* helper – uploads base64 to API and returns a URL */
async function uploadImage(base64, subdomain) {
  const res = await fetch("https://api.leadnary.com/api/upload/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageBase64: base64, subdomain }),
  });
  const data = await res.json();
  return data?.success ? data.secure_url || data.url : null;
}

export default function LandingPageUpdate({
  subs = [],
  selectedSub,
  onSubChange,
  initialPage,
  apiError,
}) {
  const dispatch = useDispatch();

  /* ────── restrict to subs that ALREADY have a page ────── */
  const editableSubs = subs.filter((s) => !!s.pageId);
  // const editableSubs = subs.filter(
  //   (s) => s.pageId && (!s.systemDisabled || s.isFirst)
  // );

  const hasEditable = editableSubs.length > 0;

  /* ────── local state ────── */
  const [templateId, setTemplateId] = useState(
    initialPage?.template ?? templates[0].id
  );
  const [formData, setFormData] = useState(
    initialPage?.data
      ? structuredClone(initialPage.data)
      : structuredClone(getTemplate(templateId).defaultData)
  );
  const [uploadStatus, setUploadStatus] = useState({});
  const [uploadError, setUploadError] = useState({});

  /* ────── sync when page changes ────── */
  useEffect(() => {
    if (initialPage) {
      setTemplateId(initialPage.template);
      setFormData(structuredClone(initialPage.data));
    } else {
      setTemplateId(templates[0].id);
      setFormData(structuredClone(getTemplate(templates[0].id).defaultData));
    }
  }, [initialPage]);

  /* ────── field + file handlers ────── */
  const handleField = useCallback((path, value) => {
    setFormData((old) => {
      const next = structuredClone(old);
      setDeep(next, path, value);
      return next;
    });
  }, []);

  const handleFileChange = useCallback(
    async (path, file) => {
      if (!file.type.startsWith("image/") || file.size > 2 * 1024 * 1024) {
        setUploadStatus((s) => ({ ...s, [path]: "error" }));
        setUploadError((e) => ({
          ...e,
          [path]: !file.type.startsWith("image/")
            ? "Only image files are allowed"
            : "File too large (max 2 MB)",
        }));
        return;
      }

      setUploadStatus((s) => ({ ...s, [path]: "uploading" }));

      const reader = new FileReader();
      reader.onloadend = async () => {
        const url = await uploadImage(reader.result, selectedSub);
        if (!url) {
          setUploadStatus((s) => ({ ...s, [path]: "error" }));
          setUploadError((e) => ({ ...e, [path]: "Upload failed" }));
          return;
        }
        handleField(path, url);
        setUploadStatus((s) => ({ ...s, [path]: "uploaded" }));
      };
      reader.readAsDataURL(file);
    },
    [selectedSub, handleField]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateLandingPage({
        template: templateId,
        data: formData,
        subdomain: selectedSub,
      })
    ).then(() => window.open(`/site/${selectedSub}`, "_blank"));
  };

  /* ────── template meta ────── */
  const tpl = getTemplate(templateId);

  /* ────── UI ────── */
  return (
    <div className="min-h-screen transition-colors dark:bg-gray-900 md:p-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto p-4"
      >
        {/* heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              <FiEdit2 size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Edit Landing Page
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Editing:&nbsp;
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {selectedSub || "—"}
                </span>
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!selectedSub}
            onClick={onSubmit}
            className={`px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md flex items-center gap-2 ${
              !selectedSub && "opacity-50 cursor-not-allowed"
            }`}
          >
            <span>Save &amp; Preview</span>
            <FiArrowRight />
          </motion.button>
        </div>

        {/* sub-domain selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <FiGlobe />
            Pick Sub-domain to edit
          </label>

          {hasEditable ? (
            <div className="flex flex-wrap gap-4">
              {subs.map((sub) => {
                const isEditable = !!sub.pageId;
                const isSelected = selectedSub === sub.name && isEditable;

                return (
                  <motion.div
                    key={sub.name}
                    whileHover={{ scale: isEditable ? 1.03 : 1 }}
                    whileTap={{ scale: isEditable ? 0.97 : 1 }}
                    onClick={() => isEditable && onSubChange(sub.name)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all border
                   ${
                     isSelected
                       ? "border-blue-600 dark:border-violet-500 bg-blue-50 dark:bg-violet-900/30 shadow-md"
                       : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-400 dark:hover:border-violet-400"
                   }
                   ${
                     isEditable
                       ? "cursor-pointer shadow-sm hover:shadow-md"
                       : "opacity-50 cursor-not-allowed"
                   }`}
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
                          isEditable
                            ? "text-gray-400 dark:text-gray-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    )}

                    {/* Domain Name */}
                    <span
                      className={`font-semibold text-sm break-all ${
                        isEditable
                          ? "text-gray-800 dark:text-white"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {sub.name}
                    </span>

                    {/* In Use Badge */}
                    {!isEditable && (
                      <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                        No Page
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 text-sm">
              You don’t have any landing pages to edit. Create one first, then
              come back here.
            </div>
          )}
        </div>

        {/* external API error (if any) */}
        <AnimatePresence>
          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 flex items-start gap-3"
            >
              <FiXCircle className="mt-0.5 flex-shrink-0" size={18} />
              <span className="text-sm">
                {apiError.message || JSON.stringify(apiError)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {hasEditable && !initialPage && apiError && (
          <div className="p-5 mb-8 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 text-sm">
            No landing page found for <strong>{selectedSub}</strong>. Please
            create one first.
          </div>
        )}

        {/* main form – hidden if nothing to edit */}
        {hasEditable && initialPage && !apiError && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <form onSubmit={onSubmit} className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {tpl.fields.map(({ path, label, type = "text", required }) => {
                  const val = getDeep(formData, path) ?? "";
                  const isImg = /Url$/i.test(path.split(".").pop());
                  const Tag = type === "textarea" ? "textarea" : "input";

                  return (
                    <div
                      key={path}
                      className={`space-y-3 ${
                        type === "textarea" ? "md:col-span-2" : ""
                      }`}
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {label}
                        {required && (
                          <span className="text-red-500 ml-0.5">*</span>
                        )}
                      </label>

                      {/* image field */}
                      {isImg ? (
                        <>
                          <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-2">
                            <motion.label
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className={`block h-48 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700/40 overflow-hidden relative flex items-center justify-center transition-colors
                                ${
                                  val
                                    ? "border-none"
                                    : "hover:border-blue-400 dark:hover:border-blue-500"
                                }`}
                            >
                              {!val ? (
                                <div className="space-y-3 text-center">
                                  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                                    <FiUpload
                                      size={20}
                                      className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                                    />
                                  </div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Click to upload image
                                  </p>
                                  <p className="text-xs text-gray-400 dark:text-gray-500">
                                    PNG / JPG – max 2 MB
                                  </p>
                                </div>
                              ) : (
                                <img
                                  src={val}
                                  alt="preview"
                                  className="w-full h-full object-contain rounded-lg"
                                />
                              )}

                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  e.target.files[0] &&
                                  handleFileChange(path, e.target.files[0])
                                }
                                className="hidden"
                              />

                              {uploadStatus[path] === "uploading" && (
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                      repeat: Infinity,
                                      duration: 1,
                                      ease: "linear",
                                    }}
                                    className="h-8 w-8 border-b-2 border-white rounded-full"
                                  />
                                </div>
                              )}
                            </motion.label>
                          </div>

                          {/* status line */}
                          <div className="flex items-center gap-2 text-sm h-5">
                            <AnimatePresence mode="wait">
                              {uploadStatus[path] === "uploading" && (
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"
                                >
                                  <div className="h-3 w-3 border-b-2 border-current rounded-full animate-spin" />
                                  Uploading…
                                </motion.span>
                              )}
                              {uploadStatus[path] === "error" && (
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center gap-1.5 text-red-500 dark:text-red-400"
                                >
                                  <FiXCircle size={14} /> {uploadError[path]}
                                </motion.span>
                              )}
                              {val && uploadStatus[path] === "uploaded" && (
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center gap-1.5 text-green-600 dark:text-green-400"
                                >
                                  <FiCheckCircle size={14} /> Uploaded
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        </>
                      ) : (
                        /* text / textarea */
                        <Tag
                          type={type === "number" ? "number" : "text"}
                          rows={type === "textarea" ? 5 : undefined}
                          value={val}
                          required={required}
                          onChange={(e) => handleField(path, e.target.value)}
                          className={`w-full rounded-lg p-3 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/40 outline-none transition placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                            type === "textarea" ? "min-h-[120px]" : ""
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* submit */}
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-3.5 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md flex items-center gap-2"
                >
                  <span>Save Changes</span>
                  <FiArrowRight />
                </motion.button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
