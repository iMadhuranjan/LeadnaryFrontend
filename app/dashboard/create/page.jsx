// pages/dashboard/create.js
"use client";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import LandingPageCreator from "@/components/LandingPageCreator";
import { useRouter } from "next/navigation";
import { SharingunLoader } from "@/components/Spinner";

export default function DashboardCreate() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading || !isAuthenticated) {
    return <SharingunLoader />;
  }

  return <LandingPageCreator />;
}
