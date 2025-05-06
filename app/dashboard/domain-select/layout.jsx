import React from "react";

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;

export const metadata = {
  title: "Select Your Domain – Leadnary",
  description:
    "Use your Leadnary dashboard to create new landing pages, manage your existing websites, and monitor your usage limits based on your plan.",
  openGraph: {
    title: "Select Your Domain to Get Started – Leadnary Dashboard",
    description:
      "Build, edit, and monitor your landing pages on Leadnary. View plan limits and upgrade when needed to manage more websites.",
    url: "https://leadnary.com/dashboard/domain-select",
    type: "website",
  },
};
