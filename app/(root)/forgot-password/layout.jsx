import React from "react";

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;

export const metadata = {
  title: "Reset Your Password – Leadnary",
  description:
    "Forgot your password? No worries. Use Leadnary’s secure OTP-based password reset system to regain access to your dashboard and continue building landing pages that convert.",
  openGraph: {
    title: "Reset Your Password – Leadnary",
    description:
      "Easily reset your Leadnary account password using your email and a secure OTP code. No complications — just get back to growing your business.",
    url: "https://leadnary.com/forgot-password",
    type: "website",
  },
};
