// components/ui/Toast.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";

export default function Toast({
  message,
  type = "error",
  onClose,
  autoClose = true,
  autoCloseDuration = 2000,
}) {
  const [remaining, setRemaining] = useState(autoCloseDuration);
  const timerRef = useRef();
  const startRef = useRef();

  // start or restart the timer
  const runTimer = (duration) => {
    startRef.current = Date.now();
    timerRef.current = setTimeout(onClose, duration);
  };

  // pause the timer
  const pauseTimer = () => {
    clearTimeout(timerRef.current);
    const elapsed = Date.now() - startRef.current;
    setRemaining((r) => r - elapsed);
  };

  // resume the timer
  const resumeTimer = () => {
    runTimer(remaining);
  };

  useEffect(() => {
    if (autoClose) runTimer(remaining);
    return () => clearTimeout(timerRef.current);
  }, []);

  const variantConfig = {
    error: {
      icon: <FiAlertCircle />,
      bgGradient: "bg-gradient-to-r from-red-600 to-red-700",
      progressColor: "bg-red-300/80",
    },
    success: {
      icon: <FiCheckCircle />,
      bgGradient: "bg-gradient-to-r from-green-600 to-green-700",
      progressColor: "bg-green-300/80",
    },
    warning: {
      icon: <FiAlertTriangle />,
      bgGradient: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      progressColor: "bg-yellow-300/80",
    },
    info: {
      icon: <FiInfo />,
      bgGradient: "bg-gradient-to-r from-blue-600 to-blue-700",
      progressColor: "bg-blue-300/80",
    },
  };

  const config = variantConfig[type] || variantConfig.error;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.8 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", damping: 20, stiffness: 300 },
          }}
          exit={{ y: -30, opacity: 0, transition: { duration: 0.2 } }}
          onMouseEnter={autoClose ? pauseTimer : undefined}
          onMouseLeave={autoClose ? resumeTimer : undefined}
          className={`
            fixed top-4 z-[9999]
            inset-x-4 sm:inset-x-auto sm:right-6
            w-[min(90%,18rem)]
            ${config.bgGradient} text-white
            rounded-lg border border-white/20
            backdrop-blur-lg bg-white/10 dark:bg-black/20
            shadow-2xl
          `}
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex-shrink-0 text-2xl">{config.icon}</div>
            <div className="flex-1 text-sm leading-snug">{message}</div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close"
            >
              <FiX className="text-lg" />
            </button>
          </div>
          {autoClose && (
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: 0 }}
              transition={{
                duration: autoCloseDuration / 1000,
                ease: "linear",
                delay: 0 // no delay
              }}
              className={`h-1 ${config.progressColor} rounded-b-xl`}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
