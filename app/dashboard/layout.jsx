"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DashboardTopbar from "../../components/DashboardTopBar";
import DashboardSidebar from "../../components/Dashboardsidebar";
import { SharingunLoader } from "@/components/Spinner";
import { authUser } from "../store/authSlice";

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, loading, user } = useSelector((s) => s.auth);
  const [initialCheck, setInitialCheck] = useState(true);

  useEffect(() => {
    // Trigger auth check only if user is null
    if (!user) {
      dispatch(authUser()).finally(() => setInitialCheck(false));
    } else {
      setInitialCheck(false);
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!loading && !isAuthenticated && !initialCheck) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, initialCheck, router]);

  // ✅ Block all rendering until auth is verified
  if (loading || initialCheck || !isAuthenticated) {
    return <SharingunLoader loadingText="Securing your session..." />;
  }

  // ✅ Only render layout if authenticated
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <div className="sticky top-0 z-40">
          <DashboardTopbar toggleSidebar={() => {}} />
        </div>
        <main className="flex-1 overflow-auto lg:ml-72">
          <div className="mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
