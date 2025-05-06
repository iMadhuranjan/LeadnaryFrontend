import React from "react";

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;

// app/profile/metadata.js or within generateMetadata if dynamic
export const metadata = {
  title: "My Profile - Leadnary",
  description:
    "View and manage your personal profile, subscription plan, and projects on Leadnary. Edit your information, track your usage, and upgrade your experience.",
   openGraph: {
    title: "My Profile | Leadnary",
    description:
      "Manage your profile, subscription, and projects in one place with Leadnary.",
    url: "https://leadnary.com/dashboard/profile",
    siteName: "Leadnary",
  },
};
