"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserSubdomain } from "@/app/store/authSlice";
import {
  FiPlus,
  FiGlobe,
  FiCheckCircle,
  FiAlertTriangle,
  FiTrendingUp,
  FiExternalLink,
  FiClock,
  FiEdit2,
  FiSettings,
  FiBarChart2,
  FiZap,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";

const ROOT_DOMAIN = "leadnary.com";
const PLAN_LIMITS = { free: 1, pro: 5, business: 10 };

export default function WebsiteManager() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const toast = useToast();
  const router = useRouter();

  // Get user's website limit based on plan
  const getLimit = () =>
    user?.projectsLimit > 0 ? user.projectsLimit : PLAN_LIMITS[user?.plan] || 1;

  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [websites, setWebsites] = useState({
    current: user?.subdomains?.length || 0,
    limit: getLimit(),
    list: (user?.subdomains || []).map((s) =>
      typeof s === "string" ? s : s.name
    ),
  });

  // Sync when user changes
  useEffect(() => {
    if (user) {
      setWebsites({
        current: user.subdomains?.length || 0,
        limit: getLimit(),
        list: (user.subdomains || []).map((s) =>
          typeof s === "string" ? s : s.name
        ),
      });
    }
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!path.trim()) return;
    setLoading(true);

    try {
      const res = await dispatch(setUserSubdomain(path.trim())).unwrap();
      if (res.success) {
        toast.success(res.msg || "Website created successfully");
        setWebsites((w) => ({
          ...w,
          current: w.current + 1,
          list: [...w.list, path.trim()],
        }));
        setPath("");
        router.push("/dashboard/create");
      } else {
        toast.error(res.msg || "Failed to create website");
      }
    } catch (err) {
      toast.error(err || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <AuthScreen />;

  return (
    <div className=" dark:bg-gray-900 p-2">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  My Websites
                </span>
              </h1>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto p-2 md:p-4">
        {/* Stats and Create Section */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Stats Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Your Website Usage
            </h2>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span>Websites Created</span>
                  <span>
                    {websites.current} / {websites.limit}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(websites.current / websites.limit) * 100}%`,
                    }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Available
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {websites.limit - websites.current}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Created
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {websites.current}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Limit
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {websites.limit}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Create Card */}
          {websites.current >= websites.limit ? (
            <UpgradeScreen user={user} websites={websites} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800"
            >
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Create New Website
              </h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Choose your website path
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-4 text-gray-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      {ROOT_DOMAIN}/
                    </span>
                    <input
                      type="text"
                      value={path}
                      onChange={(e) => setPath(e.target.value)}
                      className="block w-full min-w-0 flex-1 rounded-none border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                      placeholder="your-site"
                      pattern="[A-Za-z0-9\\-]+"
                      minLength={3}
                      maxLength={32}
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Only letters, numbers and hyphens allowed
                  </p>
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <svg
                        className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
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
                      Creating...
                    </>
                  ) : (
                    <>
                      <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                      Create Website
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>

        {/* Websites List */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Your Websites
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {websites.current} of {websites.limit} websites created
            </p>
          </div>

          {websites.list.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {websites.list.map((site) => (
                <WebsiteCard key={site} site={site} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
}

function WebsiteCard({ site }) {
  const router = useRouter();
  const fullUrl = `${ROOT_DOMAIN}/${site}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <FiGlobe className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {site}
            </h3>
            <a
              href={`https://${fullUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              {fullUrl}
            </a>
          </div>
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <FiCheckCircle className="mr-1 h-3 w-3" /> Active
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`https://${fullUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <FiExternalLink className="mr-2 h-4 w-4" /> Visit
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(`/dashboard/edit?site=${site}`)}
            className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <FiEdit2 className="mr-2 h-4 w-4" /> Manage
          </motion.button>
        </div>

        <div className="mt-4 flex items-center text-xs text-gray-500 dark:text-gray-400">
          <FiClock className="mr-1.5 h-3.5 w-3.5" />
          <span>Created {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
        <FiGlobe className="h-8 w-8" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
        No websites yet
      </h3>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Create your first website to get started
      </p>
    </motion.div>
  );
}

function AuthScreen() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800"
      >
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-8 text-center text-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <FiGlobe className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold">Welcome to Leadnary</h2>
          <p className="mt-2 text-blue-100">
            Sign in to access your website dashboard
          </p>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/login")}
              className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-medium text-white shadow hover:from-blue-700 hover:to-violet-700"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/register")}
              className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Create Account
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function UpgradeScreen({ user, websites }) {
  const router = useRouter();

  return (
    <div className=" bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        {/* Upgrade Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 p-8 text-center shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10"></div>

          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <FiZap className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-white">Upgrade Required</h2>
            <p className="mx-auto mt-3 max-w-md text-blue-100">
              Your{" "}
              <strong className="font-semibold text-white">{user.plan}</strong>{" "}
              plan is limited to{" "}
              <strong className="font-semibold text-white">
                {websites.limit}
              </strong>{" "}
              websites.
            </p>

            <div className="mt-8">
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/pricing")}
                className="inline-flex items-center justify-center rounded-md bg-white px-8 py-4 text-sm font-semibold text-blue-600 shadow-lg transition-all hover:shadow-xl"
              >
                View Upgrade Options
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
