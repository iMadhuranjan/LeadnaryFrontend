"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ToastProvider";
import { useDispatch, useSelector } from "react-redux";
import { getPlanInfo, verifyPayment } from "@/app/store/profileSlice";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiZap,
  FiBriefcase,
  FiArrowRight,
  FiUser,
} from "react-icons/fi";
import { SharingunLoader } from "@/components/Spinner";

const UpgradePage = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { plan, planExpiresAt, planActive } = useSelector(
    (state) => state.profile
  );
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    dispatch(getPlanInfo());
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, [dispatch]);

  const handlePayment = async (planType) => {
    if (loading || plan === planType) return;
    if (plan === "business" && planType === "pro") {
      toast.warning("Please contact support to downgrade from Business plan");
      return;
    }

    setLoading(true);
    setSelectedPlan(planType);
    try {
      const { data } = await axios.post(
        "https://api.leadnary.com/api/payment/create-order",
        { planType },
        { withCredentials: true }
      );

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Leadnary",
        description: `${
          planType.charAt(0).toUpperCase() + planType.slice(1)
        } Plan – 1 Month`,
        order_id: data.order.id,
        prefill: {
          name: user?.username || "User",
          email: user?.email,
        },
        theme: { color: "#6366f1" },
        handler: async function (response) {
          toast.success("✅ Payment successful! Verifying...");
          try {
            const result = await dispatch(
              verifyPayment({
                razorpay_payment_id: response.razorpay_payment_id,
                planType,
              })
            ).unwrap();

            if (result.success) {
              toast.success("🎉 Plan upgraded successfully!");
              dispatch(getPlanInfo());
            } else {
              toast.error("⚠️ Payment succeeded but plan upgrade failed.");
            }
          } catch (err) {
            console.error("Verification failed:", err);
            toast.error("❌ Error verifying payment.");
          } finally {
            setLoading(false);
            setSelectedPlan(null);
          }
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled.");
            setLoading(false);
            setSelectedPlan(null);
          },
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to initiate payment");
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  const plans = [
    {
      id: "free",
      name: "Free Plan",
      price: "₹0",
      duration: "forever",
      features: ["Create 1 Website", "Basic Templates", "Community Support"],
      icon: <FiUser className="text-gray-500" size={20} />,
      color: "from-gray-400 to-gray-500",
      borderColor: "border-gray-400",
      buttonText: plan === "free" ? "Current Plan" : "Downgrade",
      disabled: true,
      disabledMessage: "Contact support to downgrade",
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: "₹99",
      duration: "per month",
      features: [
        "Create up to 5 Websites",
        "Access to Pro Templates",
        "Priority email support",
      ],
      icon: <FiZap className="text-yellow-500" size={20} />,
      color: "from-blue-500 to-indigo-600",
      borderColor: "border-blue-500",
      buttonText: plan === "pro" ? "Current Plan" : "Upgrade to Pro",
      disabled: plan === "business",
      disabledMessage: "Contact support to downgrade",
    },
    {
      id: "business",
      name: "Business Plan",
      price: "₹299",
      duration: "per month",
      features: [
        "Create up to 10 Websites",
        "Pro + Business Templates",
        "Dedicated email support",
        "Custom Domain Integration (Coming Soon)",
      ],
      icon: <FiBriefcase className="text-purple-500" size={20} />,
      color: "from-violet-600 to-purple-700",
      borderColor: "border-violet-600",
      buttonText: plan === "business" ? "Current Plan" : "Upgrade to Business",
      disabled: false,
    },
  ];

  const getPlanStatus = () => {
    if (!plan) return "No active plan";
    const status = planActive ? "Active" : "Expired";
    return `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan (${status})`;
  };

  if (loading && !selectedPlan) {
    return <SharingunLoader />;
  }

  return (
    <div className="mx-auto p-2 md:px-4 md:py-8 sm:px-6 lg:px-8">
      {/* Header */}

      {/* Current Plan Status */}
      {plan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 mx-auto max-w-2xl px-4 sm:px-0 w-full"
        >
          <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Left side */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Current Subscription
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-gray-700 dark:text-gray-300">
                    {getPlanStatus()}
                  </span>
                  {planExpiresAt && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      Renews {format(new Date(planExpiresAt), "MMM d, yyyy")}
                    </span>
                  )}
                </div>
              </div>

              {/* Right side: Plan badge */}
              <div className="flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-blue-200 px-4 text-sm font-medium text-blue-800 dark:from-violet-900/30 dark:to-violet-800/30 dark:text-violet-400">
                {plan.toUpperCase()}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Plan Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((planItem) => (
          <motion.div
            key={planItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay:
                planItem.id === "free"
                  ? 0.1
                  : planItem.id === "pro"
                  ? 0.2
                  : 0.3,
            }}
            whileHover={{ y: -5 }}
            className={`relative rounded-xl overflow-hidden border ${
              plan === planItem.id
                ? "ring-2 ring-blue-500 dark:ring-violet-600"
                : "border-gray-200 dark:border-gray-700"
            } bg-white dark:bg-gray-800 shadow-lg`}
          >
            {plan === planItem.id && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                CURRENT PLAN
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${planItem.color} text-white`}
                >
                  {planItem.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {planItem.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {planItem.id === "free"
                      ? "For getting started"
                      : planItem.id === "pro"
                      ? "For professionals"
                      : "For businesses"}
                  </p>
                </div>
              </div>

              <div className="my-5">
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {planItem.price}
                  </span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400 text-sm">
                    {planItem.duration}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6">
                {planItem.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheck className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePayment(planItem.id)}
                disabled={plan === planItem.id || loading || planItem.disabled}
                className={`w-full flex items-center justify-center px-4 py-2.5 rounded-lg font-medium transition-all text-sm ${
                  plan === planItem.id
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : planItem.disabled
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    : `bg-gradient-to-r ${planItem.color} text-white shadow hover:opacity-90`
                }`}
              >
                {loading && selectedPlan === planItem.id ? (
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
                ) : (
                  <>
                    {planItem.buttonText}
                    {plan !== planItem.id && !planItem.disabled && (
                      <FiArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </>
                )}
              </button>

              {planItem.disabled && planItem.disabledMessage && (
                <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                  {planItem.disabledMessage}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePage;
