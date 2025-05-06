import React from "react";

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;

export const metadata = {
  title: "Support Center - Leadnary",
  description:
    "Need help with your landing pages, billing, or account? Use the Leadnary Support Center to create and track tickets for quick assistance.",
  openGraph: {
    title: "Support Center | Leadnary Dashboard",
    description:
      "Create, track, and manage support tickets directly from your Leadnary dashboard. Get help with your site, billing, or technical issues.",
    url: "https://leadnary.com/dashboard/support",
    type: "website",
  },
};
