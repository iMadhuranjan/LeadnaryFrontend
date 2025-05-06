import TemplateShowcase from "@/components/TempateShowCase";
import React from "react";

const templates = [
  {
    id: "1",
    name: "Gym Template",
    category: "gym",
    type: "free",
    imageUrl: "/image/gymtemplate.webp",
    description: "Modern, Responsive Gym Template.",
    demoUrl: "/template/gym",
  },
  {
    id: "2",
    name: "Dentist Template",
    category: "doctor",
    type: "Free",
    description: "Dentist Template for Doctor.",
    imageUrl: "/image/dentist.webp",
    demoUrl: "/template/dentist",
  },
  // Add more templates...
];

const TemplatesPage = () => {
  return (
    <div className="">
      <TemplateShowcase templates={templates} />
    </div>
  );
};

export default TemplatesPage;

export const metadata = {
  title: "Template Library - Leadnary",
  description:
    "Browse our collection of professionally designed templates for gyms, doctors, and more. Each template is responsive, SEO-optimized, and ready to launch.",
  openGraph: {
    title: "Template Library | Leadnary Dashboard",
    description:
      "Explore Leadnary’s free templates for various niches including gyms and doctors. Perfect for quick launches with built-in responsiveness and design.",
    url: "https://leadnary.com/dashboard/templates",
    type: "website",
  },
};
