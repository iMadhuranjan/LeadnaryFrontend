"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserLeads,
  updateLeadQuality,
  deleteLead,
} from "@/app/store/leadSlice";
import { SharingunLoader } from "@/components/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiTrash2,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiDownload,
  FiX,
  FiCalendar,
  FiGlobe,
  FiPhone,
  FiMail,
  FiServer,
} from "react-icons/fi";
import {
  BsThreeDotsVertical,
  BsCheckCircle,
  BsExclamationCircle,
  BsDashCircle,
} from "react-icons/bs";
import { RiUserStarLine } from "react-icons/ri";

/* ------- constants ------- */
const PAGE_SIZE = 20;
const qualityOptions = [
  {
    value: "new",
    label: "New",
    icon: <RiUserStarLine className="text-blue-500" />,
  },
  {
    value: "good",
    label: "Good",
    icon: <BsCheckCircle className="text-green-500" />,
  },
  {
    value: "neutral",
    label: "Neutral",
    icon: <BsDashCircle className="text-gray-500" />,
  },
  {
    value: "bad",
    label: "Bad",
    icon: <BsExclamationCircle className="text-red-500" />,
  },
];

const badgeColors = {
  new: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200",
  good: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200",
  neutral: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200",
  bad: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200",
};

const badgeBorderColors = {
  new: "border-blue-200 dark:border-blue-700",
  good: "border-green-200 dark:border-green-700",
  neutral: "border-gray-200 dark:border-gray-600",
  bad: "border-red-200 dark:border-red-700",
};

/* ------- helper: windowed page list ------- */
function getPageWindow(current, last) {
  const win = 2;
  const list = [];
  for (let p = 1; p <= last; p++) {
    if (p === 1 || p === last || (p >= current - win && p <= current + win))
      list.push(p);
  }
  const out = [];
  let prev;
  for (const n of list) {
    if (prev && n - prev > 2) out.push("dots");
    else if (prev && n - prev === 2) out.push(prev + 1);
    out.push(n);
    prev = n;
  }
  return out;
}

/* ------------- component ------------- */
export default function LeadsPage() {
  const dispatch = useDispatch();
  const { leads = [], fetching, fetchError } = useSelector((s) => s.lead || {});

  /* state */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expandedLead, setExpandedLead] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: null,
    source: null,
    campaign: null,
    dateRange: null,
  });

  /* initial fetch */
  useEffect(() => {
    dispatch(fetchUserLeads());
  }, [dispatch]);

  /* filter */
  const filtered = useMemo(() => {
    let result = leads;

    // Apply search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          (l.subdomain || "").toLowerCase().includes(q) ||
          (l.websiteUrl || "").toLowerCase().includes(q) ||
          (l.name || "").toLowerCase().includes(q) ||
          (l.email || "").toLowerCase().includes(q)
      );
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter((l) => l.leadQuality === filters.status);
    }

    // Apply source filter
    if (filters.source) {
      result = result.filter((l) => l.utmSource === filters.source);
    }

    // Apply campaign filter
    if (filters.campaign) {
      result = result.filter((l) => l.utmCampaign === filters.campaign);
    }

    // Apply date range filter (simplified example)
    if (filters.dateRange) {
      const now = new Date();
      const cutoff = new Date(now);

      if (filters.dateRange === "today") {
        cutoff.setDate(now.getDate() - 1);
      } else if (filters.dateRange === "week") {
        cutoff.setDate(now.getDate() - 7);
      } else if (filters.dateRange === "month") {
        cutoff.setMonth(now.getMonth() - 1);
      }

      result = result.filter((l) => new Date(l.createdAt) > cutoff);
    }

    return result;
  }, [leads, search, filters]);

  /* reset to first page when filter size changes */
  useEffect(() => {
    setPage(1);
  }, [filtered.length, search, filters]);

  // Get unique filter options from data
  const filterOptions = useMemo(() => {
    const sources = new Set();
    const campaigns = new Set();

    leads.forEach((lead) => {
      if (lead.utmSource) sources.add(lead.utmSource);
      if (lead.utmCampaign) campaigns.add(lead.utmCampaign);
    });

    return {
      sources: Array.from(sources).sort(),
      campaigns: Array.from(campaigns).sort(),
    };
  }, [leads]);

  const handleExport = () => {
    const dataToExport = filtered.map((lead) => ({
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone,
      Subdomain: lead.subdomain,
      Website: lead.websiteUrl,
      Quality: lead.leadQuality,
      Source: lead.utmSource,
      Medium: lead.utmMedium,
      Campaign: lead.utmCampaign,
      Term: lead.utmTerm,
      Content: lead.utmContent,
      Message: lead.message,
      "IP Address": lead.ipAddress,
      "Created At": new Date(lead.createdAt).toLocaleString(),
    }));

    const headers = Object.keys(dataToExport[0]).join(",");
    const rows = dataToExport
      .map((obj) =>
        Object.values(obj)
          .map((value) =>
            typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value
          )
          .join(",")
      )
      .join("\n");

    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `leads_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearFilters = () => {
    setFilters({
      status: null,
      source: null,
      campaign: null,
      dateRange: null,
    });
  };

  const hasActiveFilters = Object.values(filters).some((f) => f !== null);

  /* pagination calculations */
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSlice =
    filtered.length <= PAGE_SIZE
      ? filtered
      : filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* handlers */
  const onQuality = (id, q) =>
    dispatch(updateLeadQuality({ leadId: id, quality: q }));
  const onDelete = (id) =>
    window.confirm("Delete this lead?") && dispatch(deleteLead(id));
  const toggleExpandLead = (id) => {
    setExpandedLead(expandedLead === id ? null : id);
  };

  /* -------------------- JSX -------------------- */
  return (
    <div className="mx-auto p-2 md:p-6 ">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Leads Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {filtered.length} {filtered.length === 1 ? "lead" : "leads"} found
            {hasActiveFilters && " (filtered)"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 min-w-[250px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 dark:text-gray-500" />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-violet-600"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${
                showFilters || hasActiveFilters
                  ? "bg-blue-100 border-blue-300 text-blue-700 dark:bg-violet-900/50 dark:border-violet-700 dark:text-violet-200"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <FiFilter size={16} />
              Filters
              {hasActiveFilters && (
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-violet-500 text-white text-xs">
                  {Object.values(filters).filter((f) => f !== null).length}
                </span>
              )}
            </button>

            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <FiDownload size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={filters.status || ""}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value || null })
                }
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">All Statuses</option>
                {qualityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Source
              </label>
              <select
                value={filters.source || ""}
                onChange={(e) =>
                  setFilters({ ...filters, source: e.target.value || null })
                }
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">All Sources</option>
                {filterOptions.sources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Campaign
              </label>
              <select
                value={filters.campaign || ""}
                onChange={(e) =>
                  setFilters({ ...filters, campaign: e.target.value || null })
                }
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">All Campaigns</option>
                {filterOptions.campaigns.map((campaign) => (
                  <option key={campaign} value={campaign}>
                    {campaign}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date Range
              </label>
              <select
                value={filters.dateRange || ""}
                onChange={(e) =>
                  setFilters({ ...filters, dateRange: e.target.value || null })
                }
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                <FiX className="mr-1" /> Clear Filters
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && !showFilters && (
        <div className="mb-4 flex flex-wrap gap-2">
          {filters.status && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Status:{" "}
              {qualityOptions.find((o) => o.value === filters.status)?.label}
              <button
                onClick={() => setFilters({ ...filters, status: null })}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 dark:hover:bg-blue-800 dark:hover:text-blue-300"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.source && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              Source: {filters.source}
              <button
                onClick={() => setFilters({ ...filters, source: null })}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-500 dark:hover:bg-purple-800 dark:hover:text-purple-300"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.campaign && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Campaign: {filters.campaign}
              <button
                onClick={() => setFilters({ ...filters, campaign: null })}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500 dark:hover:bg-green-800 dark:hover:text-green-300"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.dateRange && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              Date:{" "}
              {
                {
                  today: "Today",
                  week: "Last 7 Days",
                  month: "Last 30 Days",
                }[filters.dateRange]
              }
              <button
                onClick={() => setFilters({ ...filters, dateRange: null })}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-yellow-400 hover:bg-yellow-200 hover:text-yellow-500 dark:hover:bg-yellow-800 dark:hover:text-yellow-300"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {fetching && (
        <div className="flex justify-center items-center h-full w-full">
          <SharingunLoader />
        </div>
      )}

      {fetchError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 mb-6 rounded-lg bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 border border-red-200 dark:border-red-700"
        >
          {fetchError}
        </motion.div>
      )}

      {!fetching && pageSlice.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-sm shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
        >
          <div className="overflow-x-auto hidden lg:block">
            <table className="w-full table-auto divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Lead
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Source
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Campaign
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                <AnimatePresence>
                  {pageSlice.map((lead) => (
                    <React.Fragment key={lead._id}>
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                        onClick={() => toggleExpandLead(lead._id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <span className="text-blue-600 dark:text-violet-400 font-medium">
                                {lead.name?.charAt(0) || "L"}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {lead.name || "Unknown"}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {lead.subdomain || "No subdomain"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {lead.email || "-"}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {lead.phone || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-900 dark:text-white">
                              {lead.utmSource || "Direct"}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {lead.utmMedium || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-900 dark:text-white">
                              {lead.utmCampaign || "-"}
                            </span>
                            <div className="flex gap-1">
                              {lead.utmTerm && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                  {lead.utmTerm}
                                </span>
                              )}
                              {lead.utmContent && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                  {lead.utmContent}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <select
                              value={lead.leadQuality}
                              onChange={(e) =>
                                onQuality(lead._id, e.target.value)
                              }
                              className={`rounded-full px-3 py-1 text-xs font-medium appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center border ${
                                badgeColors[lead.leadQuality]
                              } ${badgeBorderColors[lead.leadQuality]}`}
                            >
                              {qualityOptions.map((q) => (
                                <option key={q.value} value={q.value}>
                                  {q.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(lead.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end items-center gap-2">
                            {lead.websiteUrl && (
                              <a
                                href={lead.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-500 dark:hover:text-violet-400 p-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FiExternalLink size={18} />
                              </a>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(lead._id);
                              }}
                              className="text-red-400 hover:text-red-500 dark:hover:text-red-400 p-1"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>

                      {/* Expanded Lead Details */}
                      {expandedLead === lead._id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50 dark:bg-gray-900/30"
                        >
                          <td colSpan="7" className="px-3 py-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                              <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                  Message
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                  {lead.message || "No message provided"}
                                </p>
                              </div>

                              <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                  Details
                                </h3>
                                <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                  <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      IP Address
                                    </p>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      {lead.ipAddress || "Unknown"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      Website
                                    </p>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                      {lead.websiteUrl ? (
                                        <a
                                          href={lead.websiteUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 dark:text-violet-400 hover:underline"
                                        >
                                          {lead.websiteUrl}
                                        </a>
                                      ) : (
                                        "Not provided"
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      Subdomain
                                    </p>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      {lead.subdomain || "Not provided"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      Quality
                                    </p>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                          badgeColors[lead.leadQuality]
                                        } ${
                                          badgeBorderColors[lead.leadQuality]
                                        }`}
                                      >
                                        {lead.leadQuality}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </React.Fragment>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards   */}
          <div className="lg:hidden space-y-3">
            <AnimatePresence>
              {pageSlice.map((lead) => (
                <motion.div
                  key={lead._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-xs border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => toggleExpandLead(lead._id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center min-w-0">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-violet-400 font-medium">
                            {lead.name?.charAt(0) || "L"}
                          </span>
                        </div>
                        <div className="ml-3 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {lead.name || "Unknown"}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            {lead.email && (
                              <a
                                href={`mailto:${lead.email}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs text-blue-600 dark:text-violet-400 truncate hover:underline"
                              >
                                {lead.email}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <select
                          value={lead.leadQuality}
                          onChange={(e) => onQuality(lead._id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className={`rounded-full px-2 py-0.5 text-xs font-medium appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center border ${
                            badgeColors[lead.leadQuality]
                          } ${badgeBorderColors[lead.leadQuality]}`}
                        >
                          {qualityOptions.map((q) => (
                            <option key={q.value} value={q.value}>
                              {q.label}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(lead._id);
                          }}
                          className="text-red-400 hover:text-red-500 dark:hover:text-red-400"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Quick info chips */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {lead.phone && (
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1">
                          <FiPhone
                            className="text-gray-500 dark:text-gray-400 mr-1"
                            size={12}
                          />
                          <span className="text-xs text-gray-900 dark:text-white">
                            {lead.phone}
                          </span>
                        </div>
                      )}

                      {lead.utmSource && (
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1">
                          <FiGlobe
                            className="text-gray-500 dark:text-gray-400 mr-1"
                            size={12}
                          />
                          <span className="text-xs text-gray-900 dark:text-white">
                            {lead.utmSource}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1">
                        <FiCalendar
                          className="text-gray-500 dark:text-gray-400 mr-1"
                          size={12}
                        />
                        <span className="text-xs text-gray-900 dark:text-white">
                          {new Date(lead.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Lead Details */}
                  {expandedLead === lead._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gray-50 dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-4 space-y-4">
                        {/* Contact Info Section */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Contact
                            </h4>
                            <div className="space-y-1">
                              {lead.email && (
                                <div className="flex items-center">
                                  <FiMail
                                    className="text-gray-400 mr-2"
                                    size={14}
                                  />
                                  <a
                                    href={`mailto:${lead.email}`}
                                    className="text-sm text-blue-600 dark:text-violet-400 break-all hover:underline"
                                  >
                                    {lead.email}
                                  </a>
                                </div>
                              )}
                              {lead.phone && (
                                <div className="flex items-center">
                                  <FiPhone
                                    className="text-gray-400 mr-2"
                                    size={14}
                                  />
                                  <a
                                    href={`tel:${lead.phone}`}
                                    className="text-sm text-gray-900 dark:text-white hover:underline"
                                  >
                                    {lead.phone}
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Source
                            </h4>
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <FiGlobe
                                  className="text-gray-400 mr-2"
                                  size={14}
                                />
                                <span className="text-sm text-gray-900 dark:text-white">
                                  {lead.utmSource || "Direct"}
                                </span>
                              </div>
                              {lead.utmMedium && (
                                <div className="flex items-center">
                                  <FiLink
                                    className="text-gray-400 mr-2"
                                    size={14}
                                  />
                                  <span className="text-sm text-gray-900 dark:text-white">
                                    {lead.utmMedium}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Website & Subdomain */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                            Website
                          </h4>
                          <div className="flex items-center">
                            <FiExternalLink
                              className="text-gray-400 mr-2"
                              size={14}
                            />
                            {lead.websiteUrl ? (
                              <a
                                href={lead.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 dark:text-violet-400 break-all hover:underline"
                              >
                                {lead.websiteUrl}
                              </a>
                            ) : (
                              <span className="text-sm text-gray-500">
                                Not provided
                              </span>
                            )}
                          </div>
                          {lead.subdomain && (
                            <div className="mt-1 flex items-center">
                              <FiServer
                                className="text-gray-400 mr-2"
                                size={14}
                              />
                              <span className="text-sm text-gray-900 dark:text-white">
                                {lead.subdomain}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Message */}
                        {lead.message && (
                          <div>
                            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Message
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 whitespace-pre-line">
                              {lead.message}
                            </p>
                          </div>
                        )}

                        {/* Additional Details */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Campaign
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {lead.utmTerm && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                  {lead.utmTerm}
                                </span>
                              )}
                              {lead.utmContent && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                  {lead.utmContent}
                                </span>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                              IP Address
                            </h4>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {lead.ipAddress || "Unknown"}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                          <div>
                            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Quality
                            </h4>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                badgeColors[lead.leadQuality]
                              } ${badgeBorderColors[lead.leadQuality]}`}
                            >
                              {lead.leadQuality}
                            </span>
                          </div>

                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(lead.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {filtered.length > PAGE_SIZE && (
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={page === pageCount}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>

              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Showing{" "}
                    <span className="font-medium">
                      {(page - 1) * PAGE_SIZE + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(page * PAGE_SIZE, filtered.length)}
                    </span>{" "}
                    of <span className="font-medium">{filtered.length}</span>{" "}
                    results
                  </p>
                </div>

                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                      <span className="sr-only">Previous</span>
                      <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>

                    {getPageWindow(page, pageCount).map((p, i) =>
                      p === "dots" ? (
                        <span
                          key={`d${i}`}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            p === page
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-violet-900/30 dark:border-violet-700 dark:text-violet-300"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                      disabled={page === pageCount}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                      <span className="sr-only">Next</span>
                      <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {!fetching && filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500">
            <RiUserStarLine size={96} className="opacity-30" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            No leads found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {search.trim() || hasActiveFilters
              ? "Try adjusting your search or filters"
              : "Get started by capturing your first lead"}
          </p>
        </motion.div>
      )}
    </div>
  );
}
