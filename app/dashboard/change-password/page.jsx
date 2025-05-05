"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, resetStatus } from "@/app/store/profileSlice";
import { FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { useToast } from "@/components/ToastProvider";
import { motion } from "framer-motion";
import Link from "next/link";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);
  const toast = useToast();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      return toast.error("All fields are required");
    }
    if (form.newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters");
    }
    if (form.newPassword !== form.confirmPassword) {
      return toast.error("New passwords do not match");
    }

    const result = await dispatch(
      changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      })
    );

    if (changePassword.fulfilled.match(result)) {
      toast.success(result.payload || "Password changed successfully");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      toast.error(result.payload?.error || "Failed to change password");
    }

    dispatch(resetStatus());
  };

  return (
    <div className=" min-h-[90vh] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <FiLock className="text-2xl" />
                <h2 className="text-xl font-bold">Change Password</h2>
              </div>
            </div>
            <p className="text-blue-100 mt-2 text-sm">
              Secure your account with a new password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.old ? "text" : "password"}
                    name="oldPassword"
                    value={form.oldPassword}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                    placeholder="Enter current password"
                  />
                  <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("old")}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword.old ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                    placeholder="Enter new password"
                  />
                  <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword.new ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Must be at least 6 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                    placeholder="Confirm new password"
                  />
                  <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="">
              <Link
                href={"/forgot-password"}
                className=" text-blue-600  dark:text-violet-600 font-semibold"
              >
                {" "}
                Forget Password ?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium shadow-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </>
              ) : (
                "Change Password"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePasswordPage;
