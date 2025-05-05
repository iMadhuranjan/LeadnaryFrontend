// DashboardLayout.jsx
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const [initialCheck, setInitialCheck] = useState(true);

  useEffect(() => {
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

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area with proper spacing */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Sticky Topbar with proper z-index */}
        <div className="sticky top-0 z-40">
          <DashboardTopbar toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Area with proper margins */}
        <main className="flex-1 overflow-auto lg:ml-72">
          {initialCheck || loading ? (
            <SharingunLoader loadingText="Securing your session" />
          ) : (
            <div className=" mx-auto w-full">{children}</div>
          )}
        </main>
      </div>
    </div>
  );
}
