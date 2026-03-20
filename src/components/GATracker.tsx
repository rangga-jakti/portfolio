"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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