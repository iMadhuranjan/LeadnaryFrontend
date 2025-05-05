"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyTickets,
  raiseTicket,
  resetSupportState,
} from "@/app/store/supportSlice";
import { useToast } from "@/components/ToastProvider";
import {
  FiHelpCircle,
  FiMail,
  FiPlus,
  FiClock,
  FiCheckCircle,
  FiMessageSquare,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { SharingunLoader } from "@/components/Spinner";

const SupportPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { loading } = useSelector((state) => state.support);

  useEffect(() => {
    dispatch(getMyTickets());
  }, [dispatch]);

  const { tickets } = useSelector((state) => state.support);

  const filteredTickets = tickets?.filter((ticket) => {
    if (activeTab === "all") return true;
    return ticket.status === activeTab;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(raiseTicket({ subject, message }))
      .unwrap()
      .then(() => {
        toast.success("✅ Ticket submitted successfully");
        setSubject("");
        setMessage("");
        setIsFormOpen(false);
        dispatch(resetSupportState());
      })
      .catch((err) => {
        toast.error("❌ " + (err?.message || "Failed to send ticket"));
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return {
          bg: "bg-green-100 dark:bg-green-900/30",
          text: "text-green-800 dark:text-green-400",
          icon: <FiCheckCircle className="text-green-500" />,
        };
      case "pending":
        return {
          bg: "bg-yellow-100 dark:bg-yellow-900/30",
          text: "text-yellow-800 dark:text-yellow-400",
          icon: <FiClock className="text-yellow-500" />,
        };
      case "closed":
        return {
          bg: "bg-gray-100 dark:bg-gray-700/50",
          text: "text-gray-800 dark:text-gray-300",
          icon: <FiMessageSquare className="text-gray-500" />,
        };
      default:
        return {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-800 dark:text-blue-400",
          icon: <FiMessageSquare className="text-blue-500" />,
        };
    }
  };

  if (loading && !tickets) {
    return <SharingunLoader />;
  }
  return (
    <div className="min-h-screen dark:from-gray-900 dark:to-gray-800 p-2 md:px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <FiHelpCircle className="text-indigo-600 dark:text-indigo-400" />
                Support Center
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
                Our team is here to help you with any questions or issues you
                may have.
              </p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white font-medium px-5 py-2.5 rounded-lg shadow-lg transition-all"
            >
              <FiPlus /> New Ticket
            </button>
          </div>
        </motion.div>

        {/* Support Form Modal */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setIsFormOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Create New Support Ticket
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Briefly describe your issue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Provide detailed information about your issue"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white font-medium px-5 py-2 rounded-lg shadow transition flex items-center gap-2"
                      >
                        {loading ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-white"
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
                            Submitting...
                          </>
                        ) : (
                          <>
                            <FiMail /> Submit Ticket
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ticket Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex space-x-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-w-max">
            {["all", "open", "pending", "closed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab !== "all" && (
                  <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                    {
                      tickets?.filter((t) =>
                        tab === "all" ? true : t.status === tab
                      ).length
                    }
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Ticket List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredTickets?.length === 0 ? (
            <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                <FiHelpCircle className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
                No {activeTab === "all" ? "" : activeTab} tickets found
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {activeTab === "all"
                  ? "You haven't created any support tickets yet."
                  : `You don't have any ${activeTab} tickets.`}
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white font-medium px-5 py-2.5 rounded-lg shadow-lg transition-all"
              >
                <FiPlus /> Create New Ticket
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTickets?.map((ticket) => (
                <motion.div
                  key={ticket._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                        {ticket.subject}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                          getStatusColor(ticket.status).bg
                        } ${getStatusColor(ticket.status).text}`}
                      >
                        {getStatusColor(ticket.status).icon}
                        {ticket.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {ticket.message}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        {new Date(ticket.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span>
                        {ticket.updatedAt !== ticket.createdAt
                          ? "Updated"
                          : "Created"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SupportPage;
