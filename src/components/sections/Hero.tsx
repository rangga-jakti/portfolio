"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowDown, MapPin, Zap } from "lucide-react";
import { siteConfig, heroStats } from "@/lib/data";
import ParticleField from "@/components/ui/ParticleField";
import SocialLinks from "@/components/ui/SocialLinks";
import HeroCard from "@/components/ui/HeroCard";

const roles = [
  "AI-Powered Full-Stack Engineer",
  "LLM Integration Specialist",
  "SaaS Product Builder",
  "Machine Learning Engineer",
];

export default function Hero() {
  const [roleIndex, setRoleIndex]   = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting]   = useState(false);
  const [charIndex, setCharIndex]     = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const orbX  = useTransform(mouseX, [0, 1], [-30,  30]);
  const orbY  = useTransform(mouseY, [0, 1], [-20,  20]);
  const orb2X = useTransform(mouseX, [0, 1], [ 20, -20]);
  const orb2Y = useTransform(mouseY, [0, 1], [ 10, -10]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  // Typewriter
  useEffect(() => {
    const current = roles[roleIndex];
    const speed   = isDeleting ? 35 : 75;
    const timer   = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        } else {
          setIsDeleting(false);
          setRoleIndex(i => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden:   { opacity: 0, y: 30 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-grid bg-grid-sm"
      id="home"
    >
      <ParticleField />
      <div className="scanline opacity-30" />

      {/* BG orbs */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="orb w-[700px] h-[700px] top-[-15%] left-[-10%] opacity-25"
        animate={{
          background: [
            "radial-gradient(circle, rgba(0,255,224,0.18) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(0,184,255,0.18) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(0,255,224,0.18) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="orb w-[500px] h-[500px] bottom-[-10%] right-[5%] opacity-15"
        animate={{
          background: [
            "radial-gradient(circle, rgba(255,184,0,0.10) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(255,184,0,0.10) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* ── Main layout ── */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">

          {/* ══ LEFT — Text content ══ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 max-w-2xl w-full"
          >
            {/* Available badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-cyan-glow/30 bg-cyan-dim rounded-full">
                <Zap size={12} className="text-cyan-glow" />
                <span className="font-mono text-cyan-glow text-xs tracking-widest">
                  Available for remote work
                </span>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.div variants={itemVariants} className="mb-2">
              <span className="font-mono text-text-secondary text-sm tracking-widest">
                Hi, I&apos;m
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="font-syne font-extrabold text-5xl md:text-7xl text-text-primary leading-none mb-3"
            >
              {siteConfig.name.split(" ")[0]}
              <br />
              <span className="gradient-text">{siteConfig.name.split(" ")[1]}.</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={itemVariants}
              className="font-syne font-bold text-xl md:text-3xl text-text-secondary leading-tight mb-4 h-10 md:h-12 flex items-center"
            >
              <span>{displayText}</span>
              <span className="typing-cursor" />
            </motion.div>

            {/* Location */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-5">
              <MapPin size={13} className="text-text-muted" />
              <span className="font-outfit text-text-secondary text-sm">
                {siteConfig.locationFull}
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="font-outfit text-text-secondary text-base leading-relaxed max-w-xl mb-8"
            >
              {siteConfig.heroDescription}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a
                href="#projects"
                className="group relative px-7 py-3.5 bg-cyan-glow text-void font-syne font-semibold text-sm rounded overflow-hidden transition-all duration-300 hover:shadow-cyan-md hover:scale-[1.02]"
              >
                <span className="relative z-10">View My Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-mid to-cyan-glow translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="group px-7 py-3.5 border border-border hover:border-cyan-glow/60 text-text-secondary hover:text-cyan-glow font-outfit text-sm rounded transition-all duration-300 hover:bg-surface-2 flex items-center gap-2"
              >
                Let&apos;s Build Something
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform inline-block">→</span>
              </a>
              <SocialLinks size="md" showTooltip={true} />
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-8 pt-6 border-t border-border/40"
            >
              {heroStats.map(({ number, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-syne font-bold text-2xl text-cyan-glow">{number}</span>
                  <span className="font-outfit text-xs text-text-muted uppercase tracking-wider mt-0.5 max-w-[120px]">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ══ RIGHT — Hero Card ══ */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-shrink-0 items-center justify-center w-full lg:w-[340px]"
          >
            <HeroCard />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-text-muted text-xs tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
