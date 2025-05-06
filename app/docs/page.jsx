import React from "react";

export const metadata = {
  title: "Documentation Coming Soon - Leadnary",
  description:
    "Our documentation is currently under preparation and will be available soon. Stay tuned for updates and guides to help you make the most of Leadnary.",
  openGraph: {
    title: "Documentation In Progress | Leadnary",
    description:
      "Leadnary documentation is in progress and will be published shortly. Get ready for step-by-step guides, API references, and tutorials.",
    url: "https://leadnary.com/docs",
    type: "website",
  },
};

const DocsPlaceholderPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Documentation In Progress
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          We’re working on it! The docs are under preparation and will be live
          soon. Please check back shortly.
        </p>
      </div>
    </div>
  );
};

export default DocsPlaceholderPage;
