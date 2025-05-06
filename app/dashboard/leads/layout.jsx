import React from "react";

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;

export const metadata = {
  title: "Leads Management - Leadnary",
  description:
    "Manage, filter, and analyze all your landing page leads in one place. Export data, rate lead quality, and gain valuable insights through a modern dashboard.",
  openGraph: {
    title: "Leads Management | Leadnary Dashboard",
    description:
      "Track and manage your leads on Leadnary with built-in filters, export tools, and lead quality ratings — all in a powerful dashboard interface.",
    url: "https://leadnary.com/dashboard/leads",
    type: "website",
  },
};
