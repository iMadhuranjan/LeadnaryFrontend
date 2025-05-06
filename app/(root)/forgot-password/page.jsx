"use client";

import React, { useEffect, useState } from "react";
import { FiMail, FiKey, FiCheck, FiArrowLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ToastProvider";
import { ForgetPassword } from "@/app/store/authSlice";
import Link from "next/link";

const ForgotPasswordPage = () => {
  const [stage, setStage] = useState("email"); // email | otp | done
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const [cooldown, setCooldown] = useState(30); // seconds

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSend = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    dispatch(ForgetPassword({ email }))
      .then((result) => {
         if (result?.payload?.success) {
          toast.success(result?.payload?.message || "OTP sent to your email");
          setStage("otp");
          // RESET cooldown every time OTP is resent
          setCooldown(30);
          return;
        } else {
          toast.error(result?.payload?.message || "Failed to send OTP");
        }
      })
      .catch((err) => setError(err.message || "Failed to send OTP"))
      .finally(() => setLoading(false));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (code.length !== 6) return setError("Enter 6 digits");
    setError("");
    setLoading(true);
    const NumCode = Number(code);
    dispatch(ForgetPassword({ email, code: NumCode }))
      .then((result) => {
        if (result?.payload?.success) {
          toast.success(
            result?.payload?.message || "Password reset successfully"
          );
          setStage("done");
          return;
        } else {
          toast.error(result?.payload?.message || "Invalid OTP");
        }
      })
      .catch((err) => setError(err.message || "Invalid OTP"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex min-h-[92vh] items-center justify-center bg-gradient-to-br from-violet-50 via-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl bg-white/90 shadow-2xl backdrop-blur-lg dark:bg-gray-900/90 dark:shadow-black/30">
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl dark:bg-indigo-600/10" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/10" />

          <div className="relative z-10 p-8">
            {/* Header with back button */}
            <div className="mb-8 flex items-center justify-between">
              {stage !== "email" && (
                <button
                  onClick={() => {
                    setStage("email");
                    setError("");
                  }}
                  className="flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                >
                  <FiArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {stage === "email" && "Reset Password"}
                {stage === "otp" && "Verify OTP"}
                {stage === "done" && "Success!"}
              </h1>
              <div className="w-6" /> {/* Spacer */}
            </div>

            {/* Progress indicator */}
            <div className="mb-8 flex items-center justify-center">
              <div className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    stage === "email"
                      ? "bg-violet-600 text-white"
                      : "bg-violet-100 text-violet-600 dark:bg-gray-700 dark:text-violet-300"
                  }`}
                >
                  {stage === "email" ? "1" : <FiCheck className="h-4 w-4" />}
                </div>
                <div
                  className={`h-1 w-16 ${
                    stage !== "email"
                      ? "bg-violet-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    stage === "otp"
                      ? "bg-violet-600 text-white"
                      : stage === "done"
                      ? "bg-violet-100 text-violet-600 dark:bg-gray-700 dark:text-violet-300"
                      : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                  }`}
                >
                  {stage === "done" ? <FiCheck className="h-4 w-4" /> : "2"}
                </div>
                <div
                  className={`h-1 w-16 ${
                    stage === "done"
                      ? "bg-violet-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    stage === "done"
                      ? "bg-violet-600 text-white"
                      : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                  }`}
                >
                  3
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* Email Stage */}
              {stage === "email" && (
                <motion.form
                  key="email"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleSend}
                  className="space-y-6"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Enter your email address to receive a verification code
                  </p>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email address
                    </label>
                    <div className="relative">
                      <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-white p-3 pl-10 font-medium transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-violet-500 dark:focus:ring-violet-900/50 font-bold"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    >
                      {error}
                    </motion.div>
                  )}

                  <button
                    disabled={loading}
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 font-medium text-white shadow-lg transition-all duration-200 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin text-white"
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
                        Sending...
                      </>
                    ) : (
                      "Send Verification Code"
                    )}
                  </button>
                </motion.form>
              )}

              {/* OTP Stage */}
              {stage === "otp" && (
                <motion.form
                  key="otp"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleVerify}
                  className="space-y-6"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We sent a 6-digit code to{" "}
                    <span className="font-semibold text-violet-600 dark:text-violet-400">
                      {email}
                    </span>
                  </p>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Verification Code
                    </label>
                    <div className="relative">
                      <FiKey className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <input
                        type="text"
                        maxLength={6}
                        value={code}
                        onChange={(e) =>
                          setCode(e.target.value.replace(/\D/g, ""))
                        }
                        required
                        className="w-full rounded-xl border border-gray-200 bg-white p-3 pl-10 text-center text-xl tracking-[0.5em] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        placeholder="••••••"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Didn't receive code?{" "}
                      <button
                        type="button"
                        onClick={handleSend}
                        className="font-medium text-violet-600 dark:text-violet-400"
                        disabled={cooldown > 0}
                      >
                        {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
                      </button>
                    </p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    >
                      {error}
                    </motion.div>
                  )}

                  <button
                    disabled={loading}
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 font-medium text-white shadow-lg transition-all duration-200 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin text-white"
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
                        Verifying...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </motion.form>
              )}

              {/* Success Stage */}
              {stage === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg"
                  >
                    <FiCheck className="h-8 w-8" strokeWidth={3} />
                  </motion.div>

                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Password Reset Successfully!
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300">
                    Your new password has been sent to{" "}
                    <span className="font-semibold text-violet-600 dark:text-violet-400">
                      {email}
                    </span>
                    . Please check your inbox.
                  </p>

                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    Back to Sign In
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-violet-600 hover:underline dark:text-violet-400"
          >
            Sign in here
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
