"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_ID = "G-17DB76ECR";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname]);

  return null;
}