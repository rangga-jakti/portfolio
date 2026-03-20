"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// 🔥 Fix TypeScript error
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function GATracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("event", "page_view", {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}