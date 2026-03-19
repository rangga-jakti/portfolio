"use client";

import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";

const socials = [
  {
    icon:    Github,
    href:    siteConfig.github,
    label:   "GitHub",
    tooltip: "View my GitHub",
    newTab:  true,
  },
  {
    icon:    Linkedin,
    href:    siteConfig.linkedin,
    label:   "LinkedIn",
    tooltip: "Connect on LinkedIn",
    newTab:  true,
  },
  {
    icon:    Mail,
    href:    `mailto:${siteConfig.email}`,
    label:   "Email",
    tooltip: "Send me an email",
    newTab:  false,
  },
];

interface SocialLinksProps {
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
  className?: string;
}

export default function SocialLinks({
  size = "md",
  showTooltip = true,
  className = "",
}: SocialLinksProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const iconSize = size === "sm" ? 15 : size === "lg" ? 22 : 18;
  const padClass = size === "sm" ? "p-1.5" : size === "lg" ? "p-3" : "p-2";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socials.map(({ icon: Icon, href, label, tooltip, newTab }) => (
        <div key={label} className="relative">
          <motion.a
            href={href}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noopener noreferrer" : undefined}
            aria-label={label}
            onMouseEnter={() => setHovered(label)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`
              relative flex items-center justify-center rounded-lg
              ${padClass}
              text-text-muted
              border border-transparent
              hover:text-cyan-glow
              hover:border-cyan-glow/30
              hover:bg-cyan-dim
              transition-colors duration-200
            `}
            style={{
              boxShadow: hovered === label
                ? "0 0 16px rgba(0,255,224,0.15)"
                : "none",
              transition: "box-shadow 0.2s ease, color 0.2s ease, border-color 0.2s ease, background 0.2s ease",
            }}
          >
            <Icon size={iconSize} />
          </motion.a>

          {/* Tooltip */}
          {showTooltip && (
            <AnimatePresence>
              {hovered === label && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
                >
                  <div className="bg-surface-3 border border-border text-text-primary font-mono text-[10px] px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-lg">
                    {tooltip}
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ))}
    </div>
  );
}
