import React from "react";

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;

export const metadata = {
  title: "Edit Website - Leadnary",
  description:
    "Edit your landing pages with ease using Leadnary’s intuitive dashboard. Update content, design, and settings instantly.",
  openGraph: {
    title: "Edit Website | Leadnary Dashboard",
    description:
      "Access the Leadnary dashboard to manage and edit your websites in real-time. Simple tools for powerful updates.",
    url: "https://leadnary.com/dashboard/edit",
    type: "website",
  },
};
