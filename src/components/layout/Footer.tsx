"use client";

import { siteConfig } from "@/lib/data";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <SocialLinks size="md" showTooltip={true} />
        <p className="font-mono text-xs text-text-muted text-center">
          Designed & built by{" "}
          <span className="text-cyan-glow">{siteConfig.name}</span>
          {" "}· {siteConfig.location}
        </p>
      </div>
    </footer>
  );
}
