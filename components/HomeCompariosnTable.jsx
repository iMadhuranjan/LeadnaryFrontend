"use client";

import {
  FiCheck,
  FiX,
  FiZap,
  FiStar,
  FiBarChart2,
  FiAward,
} from "react-icons/fi";

export const ComparisonTable = () => {
  const features = [
    {
      name: "No-Code Setup",
      traditional: false,
      competitors: "Limited",
      leadnary: "Form Based Website Builder",
    },
    {
      name: "Unlimited Traffic",
      traditional: false,
      competitors: "5 K/mo limit",
      leadnary: "Truly unlimited",
    },
    {
      name: "Lead Capture",
      traditional: "Basic only",
      competitors: "Premium feature",
      leadnary: "Advanced + UTM/IP tracking",
    },
    {
      name: "Deployment Speed",
      traditional: "Days (manual)",
      competitors: "1–2 hrs",
      leadnary: "Instant (30 sec)",
    },
    {
      name: "Total Cost",
      traditional: "$300+/year",
      competitors: "Free (crippled)",
      leadnary: "Free (full power)",
    },
    {
      name: "Enterprise Security",
      traditional: "Basic",
      competitors: "Standard",
      leadnary: "Military-grade",
    },
  ];

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800 mb-10 rounded-sm">
      <table className="min-w-full text-left">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-gray-700 dark:text-gray-300 text-sm font-semibold">
              Feature
            </th>
            <th className="px-6 py-3 text-center text-gray-500 dark:text-gray-400 text-sm font-medium">
              <div className="flex flex-col items-center">
                <FiBarChart2 className="w-5 h-5 mb-1" />
                Traditional
              </div>
            </th>
            <th className="px-6 py-3 text-center text-gray-500 dark:text-gray-400 text-sm font-medium">
              <div className="flex flex-col items-center">
                <FiStar className="w-5 h-5 mb-1 text-amber-400" />
                Competitors
              </div>
            </th>
            <th className="px-6 py-3 text-center text-gray-500 dark:text-gray-400 text-sm font-medium relative">
              <div className="flex flex-col items-center">
                <FiAward className="w-5 h-5 mb-1 text-purple-500" />
                Leadnary
              </div>
               
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {features.map((f, idx) => (
            <tr
              key={idx}
              className={
                idx % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              }
            >
              <td className="px-6 py-4 text-gray-900 dark:text-gray-100 font-medium">
                {f.name}
              </td>

              <td className="px-6 py-4 text-center">
                {typeof f.traditional === "boolean" ? (
                  f.traditional ? (
                    <FiCheck className="mx-auto text-green-500 w-5 h-5" />
                  ) : (
                    <FiX className="mx-auto text-red-500 w-5 h-5" />
                  )
                ) : (
                  <span className="text-gray-700 dark:text-gray-300">
                    {f.traditional}
                  </span>
                )}
              </td>

              <td className="px-6 py-4 text-center">
                <span className="text-gray-700 dark:text-gray-300">
                  {f.competitors}
                </span>
              </td>

              <td className="px-6 py-4 text-center">
                {f.name === "Total Cost" ? (
                  <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {f.leadnary}
                  </span>
                ) : (
                  <div className="flex items-center justify-center gap-1 text-gray-900 dark:text-white">
                    <FiZap className="w-4 h-4 text-purple-500" />
                    <span>{f.leadnary}</span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
