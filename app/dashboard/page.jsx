"use client";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/app/store/profileSlice";
import { fetchUserLeads } from "../store/leadSlice";
import { getAnalyticsSummary } from "../store/analyticSlice";
import {
  FiUser,
  FiGlobe,
  FiTrendingUp,
  FiMail,
  FiActivity,
  FiClock,
  FiDollarSign,
  FiCalendar,
  FiAward,
  FiBarChart2,
  FiPieChart,
  FiSmartphone,
  FiTablet,
  FiMonitor,
  FiMapPin,
  FiNavigation,
  FiExternalLink,
  FiRefreshCw,
  FiDownload,
  FiFilter,
  FiSearch,
} from "react-icons/fi";
import { Bar, Pie, Line, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  TimeScale,
  Filler,
} from "chart.js";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import "chartjs-adapter-date-fns";
import { format, subDays, parseISO } from "date-fns";
import Link from "next/link";
import { SharingunLoader } from "@/components/Spinner";

// Register all ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  TimeScale,
  Filler
);

const Page = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const { profile } = useSelector((state) => state.profile);
  const { sites } = useSelector((state) => state.analytic.summary);
  const { leads } = useSelector((state) => state.lead);

  // Initial fetch
  useEffect(() => {
    dispatch(getProfile());
    dispatch(fetchUserLeads());
  }, [dispatch]);

  // When profile is loaded, trigger analytics fetch
  useEffect(() => {
    if (profile && profile.subdomains && profile.subdomains.length > 0) {
      const siteIds = profile.subdomains
        .filter((s) => s.pageId)
        .map((s) => s.pageId);

      dispatch(getAnalyticsSummary(siteIds));
    }
  }, [dispatch, profile]);

  // Calculate comprehensive metrics
  const metrics = useMemo(() => {
    if (!sites || !profile || !leads) return null;

    const totalVisits = Object.values(sites).reduce(
      (sum, site) => sum + (site.totalVisits || 0),
      0
    );
    const totalLeads = leads.length;
    const totalSites = profile.subdomains?.length || 0;
    const uniqueVisitors = Object.values(sites).reduce(
      (sum, site) => sum + (site.uniqueVisitors || 0),
      0
    );

    // Engagement metrics
    const avgVisitDuration =
      Object.values(sites).reduce((sum, site) => {
        return sum + (site.avgVisitDuration || 0);
      }, 0) / Object.keys(sites).length;

    const bounceRate =
      Object.values(sites).reduce((sum, site) => {
        return sum + (site.bounceRate || 0);
      }, 0) / Object.keys(sites).length;

    // Lead conversion rate
    const conversionRate =
      totalVisits > 0 ? ((totalLeads / totalVisits) * 100).toFixed(2) : 0;

    // Device distribution
    const deviceDistribution = Object.values(sites)[0]?.devices || {};

    // Referrer sources
    const referrers = Object.values(sites).reduce((acc, site) => {
      if (!site.topReferrers) return acc;

      Object.entries(site.topReferrers).forEach(([key, value]) => {
        acc[key] = (acc[key] || 0) + value;
      });

      return acc;
    }, {});

    // Location data
    const locations = Object.values(sites).reduce((acc, site) => {
      if (!site.locations) return acc;

      Object.entries(site.locations).forEach(([key, value]) => {
        acc[key] = (acc[key] || 0) + value;
      });

      return acc;
    }, {});

    // Time series data for last 7 days
    const timeSeries = {};
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return format(date, "yyyy-MM-dd");
    });

    last7Days.forEach((date) => {
      timeSeries[date] = { visits: 0, visitors: 0 };
    });

    Object.values(sites).forEach((site) => {
      if (site.dailyStats) {
        Object.entries(site.dailyStats).forEach(([date, stats]) => {
          if (timeSeries[date]) {
            timeSeries[date].visits += stats.visits || 0;
            timeSeries[date].visitors += stats.visitors || 0;
          }
        });
      }
    });

    return {
      totalVisits,
      totalLeads,
      totalSites,
      uniqueVisitors,
      avgVisitDuration,
      bounceRate,
      conversionRate,
      deviceDistribution,
      referrers,
      locations,
      timeSeries,
    };
  }, [sites, profile, leads]);

  // Prepare all chart data
  const chartData = useMemo(() => {
    if (!metrics) return null;

    const textColor = theme === "dark" ? "#E5E7EB" : "#374151";
    const gridColor =
      theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
    const tooltipBgColor = theme === "dark" ? "#1F2937" : "#FFFFFF";

    return {
      // Performance Overview Chart
      performanceChart: {
        data: {
          labels: sites ? Object.keys(sites) : [],
          datasets: [
            {
              label: "Total Visits",
              data: sites
                ? Object.values(sites).map((site) => site.totalVisits)
                : [],
              backgroundColor: "rgba(99, 102, 241, 0.8)",
              borderColor: "rgba(99, 102, 241, 1)",
              borderWidth: 1,
            },
            {
              label: "Unique Visitors",
              data: sites
                ? Object.values(sites).map((site) => site.uniqueVisitors)
                : [],
              backgroundColor: "rgba(236, 72, 153, 0.8)",
              borderColor: "rgba(236, 72, 153, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: { color: textColor },
            },
            tooltip: {
              backgroundColor: tooltipBgColor,
              titleColor: textColor,
              bodyColor: textColor,
              borderColor: gridColor,
              borderWidth: 1,
            },
          },
          scales: {
            x: { grid: { color: gridColor }, ticks: { color: textColor } },
            y: { grid: { color: gridColor }, ticks: { color: textColor } },
          },
        },
      },

      // Device Distribution Chart
      deviceChart: {
        data: {
          labels: Object.keys(metrics.deviceDistribution),
          datasets: [
            {
              data: Object.values(metrics.deviceDistribution),
              backgroundColor: [
                "rgba(99, 102, 241, 0.8)",
                "rgba(236, 72, 153, 0.8)",
                "rgba(16, 185, 129, 0.8)",
              ],
              borderColor: [
                "rgba(99, 102, 241, 1)",
                "rgba(236, 72, 153, 1)",
                "rgba(16, 185, 129, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: textColor },
            },
            tooltip: {
              backgroundColor: tooltipBgColor,
              titleColor: textColor,
              bodyColor: textColor,
              borderColor: gridColor,
              borderWidth: 1,
            },
          },
        },
      },

      // Referrer Sources Chart
      referrerChart: {
        data: {
          labels: Object.keys(metrics.referrers),
          datasets: [
            {
              data: Object.values(metrics.referrers),
              backgroundColor: [
                "rgba(99, 102, 241, 0.8)",
                "rgba(236, 72, 153, 0.8)",
                "rgba(16, 185, 129, 0.8)",
                "rgba(245, 158, 11, 0.8)",
                "rgba(249, 115, 22, 0.8)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: textColor },
            },
            tooltip: {
              backgroundColor: tooltipBgColor,
              titleColor: textColor,
              bodyColor: textColor,
              borderColor: gridColor,
              borderWidth: 1,
            },
          },
        },
      },

      // Time Series Chart
      timeSeriesChart: {
        data: {
          labels: Object.keys(metrics.timeSeries),
          datasets: [
            {
              label: "Visits",
              data: Object.values(metrics.timeSeries).map((d) => d.visits),
              borderColor: "rgba(99, 102, 241, 1)",
              backgroundColor: "rgba(99, 102, 241, 0.2)",
              tension: 0.3,
              fill: true,
            },
            {
              label: "Unique Visitors",
              data: Object.values(metrics.timeSeries).map((d) => d.visitors),
              borderColor: "rgba(236, 72, 153, 1)",
              backgroundColor: "rgba(236, 72, 153, 0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: { color: textColor },
            },
            tooltip: {
              backgroundColor: tooltipBgColor,
              titleColor: textColor,
              bodyColor: textColor,
              borderColor: gridColor,
              borderWidth: 1,
            },
          },
          scales: {
            x: { grid: { color: gridColor }, ticks: { color: textColor } },
            y: { grid: { color: gridColor }, ticks: { color: textColor } },
          },
        },
      },

      // Location Radar Chart
      locationChart: {
        data: {
          labels: Object.keys(metrics.locations),
          datasets: [
            {
              label: "Visits by Location",
              data: Object.values(metrics.locations),
              backgroundColor: "rgba(99, 102, 241, 0.2)",
              borderColor: "rgba(99, 102, 241, 1)",
              pointBackgroundColor: "rgba(99, 102, 241, 1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(99, 102, 241, 1)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: { color: textColor },
            },
            tooltip: {
              backgroundColor: tooltipBgColor,
              titleColor: textColor,
              bodyColor: textColor,
              borderColor: gridColor,
              borderWidth: 1,
            },
          },
          scales: {
            r: {
              angleLines: { color: gridColor },
              grid: { color: gridColor },
              pointLabels: { color: textColor },
              ticks: { display: false },
            },
          },
        },
      },
    };
  }, [metrics, sites, theme]);

  // Recent leads with calculated metrics
  const enrichedLeads = useMemo(() => {
    if (!leads || !sites) return [];

    return leads.slice(0, 10).map((lead) => {
      // Find which site this lead came from
      const sourceSite = profile?.subdomains?.find(
        (site) => site.pageId && lead.source?.includes(site.subdomain)
      );

      // Calculate time to conversion if we have both timestamps
      const timeToConversion =
        lead.visitedAt && lead.convertedAt
          ? new Date(lead.convertedAt) - new Date(lead.visitedAt)
          : null;

      return {
        ...lead,
        sourceSite: sourceSite?.subdomain || "Unknown",
        timeToConversion: timeToConversion
          ? `${Math.floor(timeToConversion / (1000 * 60))} min`
          : "N/A",
        value: lead.value || "N/A",
      };
    });
  }, [leads, sites, profile]);

  // Site performance with calculated metrics
  const enrichedSites = useMemo(() => {
    if (!profile?.subdomains || !sites) return [];

    return profile.subdomains.map((site) => {
      const siteData = sites[site.subdomain] || {};
      const leadsFromSite =
        leads?.filter((lead) => lead.source?.includes(site.subdomain)).length ||
        0;

      const conversionRate =
        siteData.totalVisits > 0
          ? ((leadsFromSite / siteData.totalVisits) * 100).toFixed(2)
          : 0;

      return {
        ...site,
        ...siteData,
        leads: leadsFromSite,
        conversionRate,
        lastUpdated: siteData.date || "N/A",
      };
    });
  }, [profile, sites, leads]);

  if (!profile || !sites || !leads || !metrics || !chartData) {
    return <SharingunLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      {/* Header with User Profile */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Welcome back,{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              {profile.username}
            </span>
          </h1>
        </div>

        <div className="flex items-center mt-4 md:mt-0">
          <div className="relative">
            <img
              src={profile.profileImageUrl}
              alt={profile.username}
              className="w-12 h-12 rounded-full border-2 border-indigo-500"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-900 dark:text-white">
              {profile.username}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {profile.plan} plan
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* Total Sites */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-indigo-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Sites
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {metrics.totalSites}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
              <FiGlobe className="text-indigo-600 dark:text-indigo-400 text-xl" />
            </div>
          </div>
        </motion.div>

        {/* Total Visits */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-pink-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Visits
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {metrics.totalVisits.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-pink-100 dark:bg-pink-900/30">
              <FiTrendingUp className="text-pink-600 dark:text-pink-400 text-xl" />
            </div>
          </div>
        </motion.div>

        {/* Unique Visitors */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Unique Visitors
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {metrics.uniqueVisitors.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
              <FiUser className="text-green-600 dark:text-green-400 text-xl" />
            </div>
          </div>
        </motion.div>

        {/* Total Leads */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Leads
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {metrics.totalLeads.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <FiMail className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
          </div>
        </motion.div>

        {/* Lead Conversion */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Lead Conversion
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {metrics.conversionRate}%
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
              <FiAward className="text-green-600 dark:text-green-400 text-xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${metrics.conversionRate}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Performance Overview
            </h2>
          </div>
          <div className="h-fit md:h-80">
            <Bar
              data={chartData.performanceChart.data}
              options={chartData.performanceChart.options}
            />
          </div>
        </motion.div>

        {/* Device Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Device Distribution
            </h2>
            <div className="flex items-center space-x-2"></div>
          </div>
          <div className="h-80">
            <Doughnut
              data={chartData.deviceChart.data}
              options={chartData.deviceChart.options}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {Object.entries(metrics.deviceDistribution).map(
              ([device, count]) => (
                <div key={device} className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      device === "desktop"
                        ? "bg-indigo-500"
                        : device === "mobile"
                        ? "bg-pink-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {device}
                  </span>
                  <span className="ml-auto text-sm font-medium text-gray-900 dark:text-white">
                    {((count / metrics.totalVisits) * 100).toFixed(1)}%
                  </span>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
