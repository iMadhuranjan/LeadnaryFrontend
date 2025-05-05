"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import {
  FiMonitor,
  FiSmartphone,
  FiTablet,
  FiTrendingUp,
  FiUsers,
  FiGlobe,
  FiLink,
  FiCalendar,
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { getAnalyticsSummary } from "@/app/store/analyticSlice";
import { SharingunLoader } from "@/components/Spinner";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

/* -------------------------------------------------------------------- */
/* --------------------------  MAIN PAGE  ----------------------------- */
/* -------------------------------------------------------------------- */

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { subdomains } = useSelector((state) => state.auth.user);
  const { summary, loading } = useSelector((state) => state.analytic);

  const [selectedSite, setSelectedSite] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    referrers: true,
    devices: true,
    countries: true,
  });

  /* -------------------------------------------------------------- */
  /* --------------------  DATA FETCHING  ------------------------- */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subdomains]);

  const fetchData = async () => {
    await dispatch(getAnalyticsSummary({ siteId: subdomains }));
    setLastUpdated(new Date());
  };

  const refreshData = () => fetchData();

  /* -------------------------------------------------------------- */
  /* -----------------------  RENDER  ----------------------------- */
  /* -------------------------------------------------------------- */
  if (loading || !summary?.sites) return <SharingunLoader />;

  const sites = Object.entries(summary.sites || {});
  const defaultSiteId = sites.length ? sites[0][0] : null;
  const activeSiteId =
    selectedSite && summary.sites[selectedSite] ? selectedSite : defaultSiteId;
  const activeSite = activeSiteId ? summary.sites[activeSiteId] : null;

  return (
    <div className=" mx-auto min-h-screen dark:bg-black py-4">
      {/* SITE SELECTOR */}

      <SiteSelector
        sites={sites}
        activeSiteId={activeSiteId}
        setSelectedSite={setSelectedSite}
      />

      {/* ANALYTICS SECTIONS */}
      {activeSite ? (
        <div className="space-y-5 lg:space-y-8">
          <AnalyticsSection
            title="Overview"
            id="overview"
            expanded={expandedSections.overview}
            toggle={() =>
              setExpandedSections((s) => ({ ...s, overview: !s.overview }))
            }
          >
            <OverviewGrid site={activeSite} />
          </AnalyticsSection>

          <AnalyticsSection
            title="Top Referrers"
            id="referrers"
            expanded={expandedSections.referrers}
            toggle={() =>
              setExpandedSections((s) => ({ ...s, referrers: !s.referrers }))
            }
          >
            <ReferrerSection referrers={activeSite.topReferrers} />
          </AnalyticsSection>

          <AnalyticsSection
            title="Device Breakdown"
            id="devices"
            expanded={expandedSections.devices}
            toggle={() =>
              setExpandedSections((s) => ({ ...s, devices: !s.devices }))
            }
          >
            <DeviceSection devices={activeSite.devices} />
          </AnalyticsSection>

          <AnalyticsSection
            title="Visitor Locations"
            id="countries"
            expanded={expandedSections.countries}
            toggle={() =>
              setExpandedSections((s) => ({ ...s, countries: !s.countries }))
            }
          >
            <CountryTable countries={activeSite.countries} />
          </AnalyticsSection>
        </div>
      ) : (
        <EmptyState message="No analytics available for selected site." />
      )}
    </div>

    
  );
};

export default DashboardPage;

const SiteSelector = ({ sites, activeSiteId, setSelectedSite }) => (
  <div className="relative z-10  m-2 md:m-4 overflow-x-auto rounded-2xl border border-transparent bg-white/70 p-4 shadow-lg backdrop-blur dark:bg-gray-900">
    <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
      Your Websites
    </h2>
    <div className="flex flex-wrap gap-3">
      {sites.map(([siteId]) => (
        <button
          key={siteId}
          onClick={() => setSelectedSite(siteId)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            // highlight active site
            siteId === activeSiteId
              ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md dark:from-violet-600 dark:to-indigo-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {siteId}
        </button>
      ))}
    </div>
  </div>
);

/* -------------------------------------------------------------------- */
/* --------------------  ANALYTICS SECTION  --------------------------- */
/* -------------------------------------------------------------------- */

const AnalyticsSection = ({ title, children, expanded, toggle }) => (
  <motion.section
    layout
    className="overflow-hidden rounded-xl m-2 md:m-4 border border-gray-200 bg-white/60  backdrop-blur dark:border-gray-900 dark:bg-gray-900"
  >
    <button
      onClick={toggle}
      className="flex w-full items-center justify-between gap-4 px-6 py-5 backdrop-blur-sm hover:bg-gray-50/30 dark:hover:bg-gray-900"
    >
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      {expanded ? (
        <FiChevronUp className="h-5 w-5 text-gray-500" />
      ) : (
        <FiChevronDown className="h-5 w-5 text-gray-500" />
      )}
    </button>

    <AnimatePresence initial={false}>
      {expanded && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className=" p-3 md:px-6 md:pb-8"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.section>
);

/* -------------------------------------------------------------------- */
/* --------------------  OVERVIEW GRID  ------------------------------- */
/* -------------------------------------------------------------------- */

const OverviewGrid = ({ site }) => {
  const stats = [
    {
      icon: <FiTrendingUp className="h-6 w-6" />,
      label: "Total Visits",
      value: site.totalVisits,
    },
    {
      icon: <FiUsers className="h-6 w-6" />,
      label: "Unique Visitors",
      value: site.uniqueVisitors,
    },
    {
      icon: <FiGlobe className="h-6 w-6" />,
      label: "Countries",
      value: Object.keys(site.countries || {}).length,
    },
    {
      icon: <FiCalendar className="h-6 w-6" />,
      label: "Last Updated",
      value: site.date,
      change: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} index={idx} />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------- */
/* --------------------  REACH / REFERRERS  --------------------------- */
/* -------------------------------------------------------------------- */

const ReferrerSection = ({ referrers }) => {
  if (!referrers || !Object.keys(referrers).length)
    return <EmptyState message="No referral data available" />;

  const labels = Object.keys(referrers).slice(0, 7);
  const dataValues = Object.values(referrers).slice(0, 7);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-gray-200 bg-white p-2  md:p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-gray-200">
          Referral Sources
        </h3>
        <div className="h-72">
          <Bar
            data={{
              labels,
              datasets: [
                {
                  label: "Visits",
                  data: dataValues,
                  backgroundColor: labels.map(
                    (_, i) => `hsl(${220 + i * 15} 80% 60%)`
                  ),
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `${ctx.parsed.y} visits from ${ctx.label}`,
                  },
                },
              },
              scales: {
                x: { grid: { display: false } },
                y: { grid: { color: "#e5e7eb20" } },
              },
            }}
          />
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-2  md:p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-gray-200">
          Top Referrers
        </h3>
        <ReferrerTable referrers={referrers} />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------- */
/* --------------------  DEVICE SECTION  ------------------------------ */
/* -------------------------------------------------------------------- */

const DeviceSection = ({ devices }) => {
  if (!devices) return <EmptyState message="No device data available" />;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-gray-200 bg-white p-2  md:p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto h-72 w-full flex justify-center items-center max-w-md">
          <Pie
            data={{
              labels: ["Desktop", "Mobile", "Tablet"],
              datasets: [
                {
                  data: [
                    devices.desktop || 0,
                    devices.mobile || 0,
                    devices.tablet || 0,
                  ],
                  backgroundColor: ["#2563eb", "#4f46e5", "#9333ea"],
                  borderWidth: 0,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
                tooltip: {
                  callbacks: {
                    label: (ctx) => {
                      const total = ctx.dataset.data.reduce((a, c) => a + c, 0);
                      const value = ctx.parsed;
                      const pct = Math.round((value / total) * 100);
                      return `${ctx.label}: ${value} (${pct}%)`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-2  md:p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-gray-200">
          Device Comparison
        </h3>
        <DeviceStats devices={devices} />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------- */
/* --------------------  REUSABLE COMPONENTS  ------------------------- */
/* -------------------------------------------------------------------- */

const StatCard = ({ icon, label, value, change, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, type: "spring", stiffness: 150 }}
    whileHover={{ y: -4 }}
    className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white  p-2 md:p-4 shadow-sm transition-all duration-200 dark:border-gray-700 dark:bg-gray-900 cursor-pointer"
  >
    <div className="flex items-center justify-between">
      <div className="rounded-lg bg-gray-100 p-2 text-blue-600 dark:bg-gray-800 dark:text-violet-400">
        {icon}
      </div>
      {change && (
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600 dark:bg-green-900/30 dark:text-green-400">
          {change}
        </span>
      )}
    </div>
    <h3 className="mt-4 text-xl lg:text-2xl font-extrabold text-gray-900 dark:text-gray-50">
      {value}
    </h3>
    <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
      {label}
    </p>

    {/* subtle gradient accent on hover */}
    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-600/0 via-indigo-600/20 to-violet-600/0 opacity-0 transition group-hover:opacity-100 dark:via-violet-500/30" />
  </motion.div>
);

const ReferrerTable = ({ referrers }) => {
  const total = Object.values(referrers).reduce((a, c) => a + c, 0);
  const rows = Object.entries(referrers)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          <tr>
            <th className="px-4 py-3 text-left">Source</th>
            <th className="px-4 py-3 text-right">Visits</th>
            <th className="px-4 py-3 text-right">% of Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
          {rows.map(([src, vis], i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                <div className="flex items-center gap-2">
                  <FiLink className="text-blue-500 dark:text-violet-400" />
                  {src || "Direct"}
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                {vis}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                {((vis / total) * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DeviceStats = ({ devices }) => {
  const total = devices.desktop + devices.mobile + devices.tablet;
  const list = [
    {
      label: "Desktop",
      val: devices.desktop,
      icon: FiMonitor,
      color: "#2563eb",
    },
    {
      label: "Mobile",
      val: devices.mobile,
      icon: FiSmartphone,
      color: "#4f46e5",
    },
    {
      label: "Tablet",
      val: devices.tablet,
      icon: FiTablet,
      color: "#9333ea",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      {list.map(({ label, val, icon: Icon, color }, i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
        >
          <Icon className="mx-auto h-6 w-6" style={{ color }} />
          <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            {label}
          </p>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-50">
            {val || 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {total ? Math.round((val / total) * 100) : 0}%
          </p>
        </div>
      ))}
    </div>
  );
};

const CountryTable = ({ countries }) => {
  const total = Object.values(countries).reduce((a, c) => a + c, 0);
  const rows = Object.entries(countries)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-700">
        <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          <tr>
            <th className="px-4 py-3 text-left">Country</th>
            <th className="px-4 py-3 text-right">Visitors</th>
            <th className="px-4 py-3 text-right">% of Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {rows.map(([country, visitors], i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                {country}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                {visitors}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                {((visitors / total) * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const EmptyState = ({ message }) => (
  <div className="flex h-32 items-center justify-center rounded-xl bg-gray-50 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">
    {message}
  </div>
);
