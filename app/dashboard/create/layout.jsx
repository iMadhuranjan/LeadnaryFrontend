import React from "react";

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;

export const metadata = {
  title: "Create Landing Page – Leadnary",
  description:
    "Use the Leadnary dashboard to create a new landing page for your business. Choose templates, customize content, and launch instantly.",
  openGraph: {
    title: "Create Landing Page – Leadnary Dashboard",
    description:
      "Design and launch a landing page using your Leadnary dashboard. Access templates and customize your site in minutes.",
    url: "https://leadnary.com/dashboard/create",
    type: "website",
  },
};
