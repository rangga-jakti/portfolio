"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: pathname,
      })
    }
  }, [pathname])

  return null
}