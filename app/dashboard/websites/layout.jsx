import React from "react";

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;

export const metadata = {
  title: "Manage Your Website - Leadnary",
  description:
    "View, edit, and control all your landing pages in one place. Instantly activate, deactivate, or update your websites from your Leadnary dashboard.",
  openGraph: {
    title: "Landing Page Manager | Leadnary Dashboard",
    description:
      "Manage your subdomains and landing pages with ease. Toggle page status, edit content, or preview live sites — all in one streamlined dashboard.",
    url: "https://leadnary.com/dashboard/websites",
    type: "website",
  },
};
