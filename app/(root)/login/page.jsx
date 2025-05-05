"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { RiSparkling2Fill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  authUser,
  loginUser,
  resendOtp,
  VerifyOtp,
} from "@/app/store/authSlice";
import { useToast } from "@/components/ToastProvider";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  // Verification states
  const [needsVerification, setNeedsVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const toast = useToast();
  const [resendCount, setResendCount] = useState(0);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error === "google_auth_failed") {
      toast.error("Google login failed. Please try again.");
    }
  }, []);

  const auth = useSelector((state) => state.auth.isAuthenticated);

  console.log("Auth state:", auth);   
  if (auth) {
    router.push("/dashboard");
  }

  function resendotpfn() {
    dispatch(resendOtp({ email: formData.email }))
      .then((result) => {
        if (result.payload.success) {
          toast.success("OTP sent successfully!");
        } else {
          toast.error(result.payload?.message || "Error occurred");
        }
      })
      .catch((err) => {
        toast.error(err?.message || "Error occurred");
      });
  }

  // countdown effect
  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(() => {
      setResendTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

  const handleResend = () => {
    if (resendTimer > 0) return; // still in cooldown
    resendotpfn(); // actually send OTP
    setResendCount((c) => c + 1);
    setResendCount((c) => {
      const next = c + 1;
      setResendTimer(next === 1 ? 30 : 60);
      return next;
    });
  };

  const handleOtpChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setOtp(input.slice(0, 6));
    setError("");
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text/plain")
      .trim()
      .replace(/\D/g, "");
    setOtp(pasteData.slice(0, 6));
    setError("");

    // Visual feedback for paste action
    document.getElementById("otp-input").animate(
      [
        { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(124, 58, 237, 0)" },
        {
          transform: "scale(1.02)",
          boxShadow: "0 0 0 10px rgba(124, 58, 237, 0.1)",
        },
        { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(124, 58, 237, 0)" },
      ],
      {
        duration: 500,
        easing: "ease-out",
      }
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    dispatch(loginUser({ email: formData.email, password: formData.password }))
      .then((result) => {
        console.log(result);
        if (result.payload.success) {
          toast.success(result.payload.message || "Login successful!");
          dispatch(authUser()).then(() => {
            router.push("/dashboard");
          });
        } else {
          if (result.payload.message == "Please verify your account") {
            toast.error(result.payload.message || "Login failed!");
            setNeedsVerification(true);
          } else {
            toast.error(result.payload.message || "Login failed!");
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        toast.error(result.payload.message || "Login failed!");
      });
    try {
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");

      document
        .getElementById("otp-container")
        .animate(
          [
            { transform: "translateX(0)" },
            { transform: "translateX(-5px)" },
            { transform: "translateX(5px)" },
            { transform: "translateX(-5px)" },
            { transform: "translateX(5px)" },
            { transform: "translateX(0)" },
          ],
          {
            duration: 300,
          }
        );
      return;
    }

    dispatch(VerifyOtp({ email: formData.email, code: Number(otp) }))
      .then((result) => {
        setVerifying(true);
        if (result.payload.success) {
          setVerifying(false);
          toast.success("Verification successful!");
          setVerified(true);
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        } else {
          toast.error(result.payload?.message || "Error occurred");
          setVerifying(false);
        }
      })
      .catch((err) => {
        toast.error(err?.message || "Error occurred");
      });
  };

  if (needsVerification) {
    if (verified) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50/50 to-indigo-50/50 p-4 dark:from-gray-900 dark:to-gray-800">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl dark:bg-gray-900/80"
          >
            <div className="relative z-10 flex flex-col items-center p-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                }}
                className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.5,
                    type: "spring",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-4 text-3xl font-bold text-gray-900 dark:text-white"
              >
                Email Verified!
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8 text-lg text-gray-600 dark:text-gray-300"
              >
                Your account has been successfully verified.
              </motion.p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
                className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-600" />
              </motion.div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-sm text-gray-500 dark:text-gray-400"
              >
                Redirecting to your dashboard...
              </motion.p>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50/50 to-indigo-50/50 p-4 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-full max-w-md overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl dark:bg-gray-900/80"
        >
          <div className="p-5 md:p-10">
            <div className="flex flex-col items-center text-center">
              {/* Animated envelope with floating effect */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  animate={{
                    y: [0, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </motion.svg>
              </motion.div>

              <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
                Verify Your Email
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-5 text-lg text-gray-600 dark:text-gray-300"
              >
                We sent a code to{" "}
                <span className="font-semibold text-violet-600 dark:text-violet-400">
                  {formData.email}
                </span>
                <br />
                <button
                  onClick={() => {
                    setVerified(false); // optional
                    setNeedsVerification(false); // optional
                  }}
                  className="font-bold text-red-600 text-base"
                >
                  {" "}
                  Change Email?
                </button>
              </motion.p>

              {/* OTP Input Container */}
              <div id="otp-container" className="w-full mb-8">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  6-digit verification code
                </label>

                <motion.div whileHover={{ scale: 1.01 }} className="relative">
                  <input
                    id="otp-input"
                    type="text"
                    inputMode="numeric"
                    maxLength="6"
                    value={otp}
                    onChange={handleOtpChange}
                    onPaste={handlePaste}
                    placeholder="• • • • • •"
                    className={`w-full h-16 rounded-xl border-2 text-center text-3xl font-bold tracking-widest focus:outline-none focus:ring-4 ${
                      error
                        ? "border-red-400 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900/30"
                        : "border-gray-300 focus:border-violet-500 focus:ring-violet-200 dark:border-gray-700 dark:focus:border-violet-500 dark:focus:ring-violet-900/30"
                    } bg-white/50 dark:bg-gray-800/50 dark:text-white backdrop-blur-sm`}
                  />

                  {/* Digit indicators */}
                  {/* {otp.length < 6 && (
                         <div className="pointer-events-none absolute inset-y-0 left-0 flex w-full items-center justify-between px-4">
                           {[...Array(6)].map((_, i) => (
                             <div
                               key={i}
                               className={`h-2 w-2 rounded-full ${
                                 i < otp.length
                                   ? "bg-violet-500"
                                   : "bg-gray-300 dark:bg-gray-600"
                               }`}
                             />
                           ))}
                         </div>
                       )} */}
                </motion.div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-6 w-full overflow-hidden rounded-lg bg-red-50/80 p-3 text-center dark:bg-red-900/20"
                >
                  <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}

              {/* Verify Button */}
              <motion.button
                onClick={verifyOtp}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 20px -5px rgba(124, 58, 237, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                disabled={verifying || otp.length !== 6}
                className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 ${
                  verifying || otp.length !== 6 ? "opacity-80" : ""
                }`}
              >
                {/* Animated background */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700 opacity-0 hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />

                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {verifying ? (
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
                    <>
                      Verify My Account
                      <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col items-center text-sm text-gray-500 dark:text-gray-400"
              >
                <span>Didn't receive a code?</span>
                <motion.button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  whileHover={resendTimer === 0 ? { scale: 1.05 } : {}}
                  whileTap={resendTimer === 0 ? { scale: 0.95 } : {}}
                  className={`
               mt-1 font-semibold
               ${
                 resendTimer > 0
                   ? "text-gray-400 cursor-not-allowed"
                   : "text-violet-600 hover:underline dark:text-violet-400"
               }
             `}
                >
                  {resendTimer > 0
                    ? `Resend code in ${resendTimer}s`
                    : "Resend code"}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleGoogleLogin = () => {
    window.location.href = "https://api.leadnary.com/api/auth/google";
  };
  return (
    <div className="flex flex-col md:min-h-screen bg-white md:flex-row dark:bg-gray-900">
      {/* Left Column - Visual */}
      <div className="relative hidden md:block md:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/90 to-indigo-900/90">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-[length:300px_300px] opacity-10 mix-blend-overlay"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-lg"
          >
            <h3 className="mb-4 text-3xl font-bold">Welcome to Our Platform</h3>
            <p className="mb-8 text-lg text-gray-200">
              Access powerful tools and resources to grow your business and
              streamline your workflow.
            </p>

            <div className="flex justify-center">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <motion.img
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + item * 0.1 }}
                    className="h-12 w-12 rounded-full border-2 border-white/30 object-cover shadow-lg"
                    src={`https://randomuser.me/api/portraits/${
                      item % 2 === 0 ? "women" : "men"
                    }/${item * 10}.jpg`}
                    alt="User"
                  />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 rounded-xl bg-white/10 p-4 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="font-medium">Rated 4.9/5 by our users</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex items-center min-h-screen justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-5 md:w-1/2 md:p-8 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="mb-2 text-center text-3xl font-bold text-gray-800 dark:text-white">
            Welcome Back
          </h1>
          <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
            Sign in to access your account
          </p>

          {/* Social Login Buttons */}
          <div className="mb-6 flex-1 flex justify-center items-center">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-400 p-3 transition hover:bg-gray-50 dark:border-gray-00 dark:hover:bg-gray-800"
            >
              <FcGoogle className="h-5 w-5" />
              <span className="text-sm font-medium">Login With Google</span>
            </motion.button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-2 text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-200">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-gray-300 p-3 pl-10 text-base font-semibold focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-gray-300 p-3 pl-10 pr-10 text-base font-semibold focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="rounded-lg bg-red-50/80 p-3 text-center dark:bg-red-900/20"
              >
                <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className={`w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-3.5 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                isLoading ? "opacity-80" : ""
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {isLoading ? (
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
                    Signing in...
                  </>
                ) : (
                  <>
                    <RiSparkling2Fill className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </div>
            </motion.button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-violet-600 hover:underline dark:text-violet-400"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
