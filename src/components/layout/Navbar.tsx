"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";
import { trackResumeClick } from "@/lib/analytics";
import { trackResumeDownload } from "@/lib/gtag";
import { siteConfig } from "@/lib/data";

const navLinks = [
  { label: "About",      href: "#about",      number: "01" },
  { label: "Projects",   href: "#projects",   number: "02" },
  { label: "Experience", href: "#experience", number: "03" },
  { label: "Contact",    href: "#contact",    number: "04" },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    const sections  = document.querySelectorAll("section[id]");
    const observer  = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.4 }
    );

    sections.forEach((s) => observer.observe(s));
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); observer.disconnect(); };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 bg-void/80 backdrop-blur-xl border-b border-border/50" : "py-5"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo — initials */}
          <a href="#" className="font-syne font-bold text-xl text-text-primary hover:text-cyan-glow transition-colors duration-300 group">
            <span className="text-cyan-glow group-hover:opacity-80 transition-opacity">{"<"}</span>
            MJ
            <span className="text-cyan-glow group-hover:opacity-80 transition-opacity">{"/>"}</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`group flex items-center gap-1.5 text-sm font-outfit transition-colors duration-300 hover:text-text-primary ${
                    activeSection === link.href.slice(1) ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  <span className="font-mono text-cyan-glow text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                    {link.number}.
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Mirangga Jakti Resume PDF"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={trackResumeClick}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-outfit text-cyan-glow border border-cyan-glow/40 rounded transition-all duration-300 hover:bg-cyan-dim hover:border-cyan-glow hover:shadow-cyan-sm"
              >
                <FileText size={13} />
                Resume
              </motion.a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            aria-label="Toggle menu"
          >
            <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}  className="block w-6 h-0.5 bg-text-primary group-hover:bg-cyan-glow transition-colors" />
            <motion.span animate={{ opacity: mobileOpen ? 0 : 1, x: mobileOpen ? -10 : 0 }} className="block w-4 h-0.5 bg-text-primary group-hover:bg-cyan-glow transition-colors" />
            <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} className="block w-6 h-0.5 bg-text-primary group-hover:bg-cyan-glow transition-colors" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMobileOpen(false)}
                className="group flex flex-col items-center gap-1"
              >
                <span className="font-mono text-cyan-glow text-sm">{link.number}.</span>
                <span className="font-syne text-3xl font-bold text-text-primary hover:text-cyan-glow transition-colors">
                  {link.label}
                </span>
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume PDF"
              className="mt-4 flex items-center gap-2 px-6 py-3 border border-cyan-glow/50 text-cyan-glow font-outfit rounded hover:bg-cyan-dim transition-all"
            >
              <FileText size={15} />
              Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
