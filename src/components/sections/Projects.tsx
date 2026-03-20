"use client";

import { useRef, MouseEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Github, Star, Brain, TrendingUp,
  ShieldAlert, BarChart2, Bug, Lock, Clock,
  MessageSquare
} from "lucide-react";
import { featuredProjects, mlProjects } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  shield:      ShieldAlert,
  trending:    TrendingUp,
  bug:         Bug,
  "bar-chart": BarChart2,
};

const featuredIcons = [TrendingUp, Brain];

/* ─── Featured Card ─── */
function FeaturedCard({
  project, index, inView,
}: {
  project: (typeof featuredProjects)[0];
  index: number;
  inView: boolean;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [glow, setGlow]       = useState({ x: 50, y: 50 });
  const Icon = featuredIcons[index] ?? Brain;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    setTilt({
      x: ((y - r.height / 2) / (r.height / 2)) * -8,
      y: ((x - r.width  / 2) / (r.width  / 2)) *  8,
    });
    setGlow({ x: (x / r.width) * 100, y: (y / r.height) * 100 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered ? "transform 0.05s ease" : "transform 0.5s ease",
        }}
        className="group relative bg-surface-2 border border-border hover:border-cyan-glow/40 rounded-xl p-8 flex flex-col overflow-hidden h-full cursor-default"
      >
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{ background: `radial-gradient(400px circle at ${glow.x}% ${glow.y}%, rgba(0,255,224,0.07), transparent)` }}
          />
        )}

        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-dim border border-cyan-glow/20 flex items-center justify-center group-hover:border-cyan-glow/50 transition-all">
              <Icon size={22} className="text-cyan-glow" />
            </div>
            <span className={`flex items-center gap-1.5 font-mono text-xs border px-2.5 py-1 rounded-full ${project.typeColor}`}>
              <Star size={9} fill="currentColor" />
              {project.type}
            </span>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 border border-emerald-400/20 bg-emerald-400/5 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        </div>

        <h3 className="font-syne font-bold text-xl text-text-primary group-hover:text-cyan-glow transition-colors duration-300 mb-3">
          {project.title}
        </h3>
        <p className="font-outfit text-text-secondary text-sm leading-relaxed flex-1 mb-6">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="font-mono text-xs text-text-muted border border-border/60 px-2.5 py-1 rounded-sm hover:text-cyan-glow hover:border-cyan-glow/30 transition-colors">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-border/40">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 bg-surface-3 border border-border hover:border-cyan-glow/50 hover:bg-cyan-dim hover:text-cyan-glow text-text-secondary font-outfit text-xs rounded-lg transition-all duration-200"
          >
            <Github size={13} />
            View Code
          </motion.a>
          <div className="flex items-center gap-2 px-4 py-2 border border-dashed border-border/40 text-text-muted font-outfit text-xs rounded-lg cursor-not-allowed select-none">
            <Clock size={13} />
            Coming Soon
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/0 to-transparent group-hover:via-cyan-glow/60 transition-all duration-500" />
      </div>
    </motion.div>
  );
}

/* ─── Private badge tooltip ─── */
function PrivateButton() {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-3 border border-border/70 hover:border-amber-glow/40 hover:bg-amber-dim text-text-muted hover:text-amber-glow font-outfit text-[11px] rounded-lg transition-all duration-200 cursor-pointer"
      >
        <Lock size={11} />
        Private Project
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 mb-2 z-50 pointer-events-none w-44"
          >
            <div className="bg-surface-3 border border-border text-text-secondary font-mono text-[10px] px-3 py-2 rounded-lg shadow-lg leading-relaxed">
              Click to contact me for details
              <div className="absolute top-full left-4 border-4 border-transparent border-t-border" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── ML Card ─── */
function MLCard({
  project, index, inView,
}: {
  project: (typeof mlProjects)[0];
  index: number;
  inView: boolean;
}) {
  const Icon = iconMap[project.icon] ?? Brain;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`group flex flex-col gap-4 p-5 border rounded-xl transition-all duration-300 cursor-default ${
        project.private
          ? "bg-surface-2 border-border hover:border-amber-glow/25 hover:bg-surface-3"
          : "bg-surface-2 border-border hover:border-emerald-400/30 hover:bg-surface-3"
      }`}
    >
      {/* Top row */}
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all ${
          project.private
            ? "bg-amber-glow/5 border border-amber-glow/15 group-hover:border-amber-glow/35"
            : "bg-emerald-400/10 border border-emerald-400/20 group-hover:border-emerald-400/50"
        }`}>
          {project.private
            ? <Lock size={16} className="text-amber-glow/60 group-hover:text-amber-glow transition-colors" />
            : <Icon size={18} className="text-emerald-400" />
          }
        </div>

        {/* Title + badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <h4 className={`font-syne font-semibold text-sm transition-colors ${
              project.private
                ? "text-text-primary group-hover:text-amber-glow"
                : "text-text-primary group-hover:text-emerald-400"
            }`}>
              {project.title}
            </h4>
            {project.private && (
              <span className="flex items-center gap-1 font-mono text-[10px] text-amber-glow/70 border border-amber-glow/20 bg-amber-dim px-2 py-0.5 rounded-full">
                <Lock size={8} />
                Private
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="font-outfit text-text-muted text-xs leading-relaxed mb-2">
          {project.description}
        </p>

        {/* Private notice */}
        {project.private && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-1.5 font-mono text-[10px] text-amber-glow/60 italic leading-relaxed"
          >
            <Lock size={9} className="mt-0.5 shrink-0" />
            This project is private. Details available upon request.
          </motion.p>
        )}
      </div>

      {/* Tech */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="font-mono text-[10px] text-text-muted border border-border/50 px-2 py-0.5 rounded-sm">
            {t}
          </span>
        ))}
      </div>

      {/* Action button */}
      <div className="pt-1 border-t border-border/30">
        {project.private ? (
          <div className="flex items-center justify-between gap-3">
            <PrivateButton />
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted hover:text-cyan-glow transition-colors"
            >
              <MessageSquare size={10} />
              Request details →
            </motion.a>
          </div>
        ) : (
          <motion.a
            href={project.github!}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-3 border border-border hover:border-emerald-400/40 hover:text-emerald-400 text-text-muted font-outfit text-[11px] rounded-lg transition-all duration-200"
          >
            <Github size={11} />
            View Code
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-radial from-amber-glow/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-gradient-radial from-emerald-400/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="section-number">02.</span>
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-text-primary">
            What I&apos;ve Built
          </h2>
          <div className="flex-1 h-px bg-border max-w-xs" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="font-outfit text-text-secondary mb-16 ml-[3.5rem] max-w-xl"
        >
          A mix of production SaaS products and machine learning models — built to solve real problems.
        </motion.p>

        {/* ══ FEATURED ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-cyan-glow tracking-widest uppercase">Featured Projects</span>
            <div className="flex-1 h-px bg-border/60 max-w-[200px]" />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {featuredProjects.map((p, i) => (
              <FeaturedCard key={p.id} project={p} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>

        {/* ══ ML PROJECTS ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase">AI / Machine Learning Projects</span>
            <div className="flex-1 h-px bg-border/60 max-w-[200px]" />
          </div>
          <p className="font-mono text-[11px] text-text-muted mb-6 flex items-center gap-1.5">
            <Lock size={10} />
            Most ML projects are kept private — click &ldquo;Private Project&rdquo; to request access.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {mlProjects.map((p, i) => (
              <MLCard key={p.id} project={p} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="border border-dashed border-border/60 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-cyan-glow/20 transition-colors duration-300">
            <div>
              <p className="font-syne font-semibold text-text-primary mb-1">More projects on GitHub</p>
              <p className="font-outfit text-text-muted text-sm">Continuously building and experimenting. See the latest public work.</p>
            </div>
            <motion.a
              href="https://github.com/rangga-jakti"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 border border-border hover:border-cyan-glow/50 rounded text-text-secondary hover:text-cyan-glow font-outfit text-sm transition-all duration-300 whitespace-nowrap hover:bg-surface-2"
            >
              <Github size={15} />
              View GitHub
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
