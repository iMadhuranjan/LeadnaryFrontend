import React from "react";

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;

export const metadata = {
  title: "Analytics – Leadnary",
  description:
    "Track performance metrics, device breakdowns, referral sources, and visitor locations for your landing pages. Stay informed with real-time analytics from Leadnary.",
  openGraph: {
    title: "Dashboard Analytics – Leadnary",
    description:
      "Monitor visits, referrals, and user behavior on your landing pages using Leadnary's built-in analytics dashboard. Powerful insights at your fingertips.",
    url: "https://leadnary.com/dashboard/analytics",
    type: "website",
  },
};
