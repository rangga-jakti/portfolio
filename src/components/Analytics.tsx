"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_ID = "G-17DB76ECR";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("config", GA_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}