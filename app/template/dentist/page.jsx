import { defaultDataTemplateDentist } from "@/templates";
import TemplateDentist from "@/templates/temp/doctor/Dentist1";
import React from "react";

const page = () => {
  return (
    <div>
      <TemplateDentist data={defaultDataTemplateDentist} />
    </div>
  );
};

export default page;
