import { defaultDataTemplateGym } from "@/templates";
import TemplateGym from "@/templates/temp/gym/gym1";
import React from "react";

const page = () => {
  return (
    <div>
      <TemplateGym data={defaultDataTemplateGym} />
    </div>
  );
};

export default page;
