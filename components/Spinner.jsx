"use client";
import { useState, useEffect } from "react";
export const SharingunLoader = () => {
  const [dots, setDots] = useState("");
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 300);

    const textTimeout = setTimeout(() => {
      setLoadingText("Authenticating");
    }, 2000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(textTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
      <div className="relative h-32 w-32 animate-[spin_2s_ease-in-out_infinite] rounded-full border-[5px] border-black bg-[#e41414] dark:bg-[#ff1a1a]">
        <div className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-[rgba(110,13,13,0.5)]">
          <div className="absolute top-[-0.5rem] left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-black "></div>
          <div className="absolute bottom-[0.5rem] left-[-0.3rem] z-10 h-4 w-4 rotate-[-120deg] rounded-full bg-black "></div>
          <div className="absolute right-[-0.3rem] bottom-[0.5rem] z-10 h-4 w-4 rotate-[120deg] rounded-full bg-black "></div>
          <div className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black  shadow-[0_0_15px_5px_rgba(0,0,0,0.4)] ]"></div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 tracking-wider">
          {loadingText}
          {dots}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 animate-pulse">
          Please wait while we secure your session...
        </p>
      </div>
    </div>
  );
};
