import React from "react";

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;

export const metadata = {
  title: "Login to Your Dashboard – Leadnary",
  description:
    "Access your Leadnary dashboard to manage landing pages, capture leads, and view real-time analytics. Secure login with email, password, or Google.",
  openGraph: {
    title: "Login to Your Dashboard – Leadnary",
    description:
      "Sign in to your Leadnary account using email or Google. Easily manage your landing pages, track leads, and grow your business online.",
    url: "https://leadnary.com/login",
    type: "website",
  },
};
