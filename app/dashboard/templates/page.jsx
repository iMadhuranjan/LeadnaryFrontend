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
