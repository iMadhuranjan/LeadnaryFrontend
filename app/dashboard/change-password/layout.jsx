import React from "react";

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;

export const metadata = {
  title: "Change Password – Leadnary",
  description:
    "Update your account password securely on Leadnary. Protect your data and manage access to your dashboard with a new password.",
  openGraph: {
    title: "Change Password – Leadnary",
    description:
      "Secure your Leadnary account by changing your password. Keep your credentials safe and stay protected.",
    url: "https://leadnary.com/dashboard/change-password",
    type: "website",
  },
};
