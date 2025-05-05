// components/LayoutWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean); // ["site", "aaaa"]

  const hideNavbar =
    segments[0] === "dashboard" ||
    segments[0] === "login" ||
    segments[0] === "register" ||
    segments[0] === "site" || // <--- FIXED: check first segment!
    (segments[0] === "template" && segments.length > 1); // Hide only for /template/xyz

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
