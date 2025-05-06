import React from 'react'

const layout = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default layout

export const metadata = {
    title: "Upgrade Plan - Leadnary",
    description:
      "Choose a plan that fits your needs. Upgrade to Pro or Business for more websites, advanced templates, and priority support. Easy monthly billing with Razorpay.",
    openGraph: {
      title: "Upgrade Your Plan | Leadnary Dashboard",
      description:
        "Upgrade your Leadnary account to access advanced templates, create more websites, and unlock powerful features with our Pro and Business plans.",
      url: "https://leadnary.com/dashboard/upgrade",
      type: "website",
    },
  };
  