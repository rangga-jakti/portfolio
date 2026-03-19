"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experiences } from "@/lib/data";

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="py-32 relative">
      <div className="absolute inset-0 bg-surface/40" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="section-number">03.</span>
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-text-primary">
            Where I&apos;ve Worked
          </h2>
          <div className="flex-1 h-px bg-border max-w-xs" />
        </motion.div>

        {/* Desktop: Tab layout (Brittany Chiang inspired but elevated) */}
        <div className="hidden md:flex gap-0">
          {/* Company tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col min-w-[180px] border-r border-border"
          >
            {experiences.map((exp, i) => (
              <button
                key={exp.id}
                onClick={() => setActive(i)}
                className={`group relative px-5 py-4 text-left font-outfit text-sm transition-all duration-300 ${
                  active === i
                    ? "text-cyan-glow bg-cyan-dim"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                }`}
              >
                {/* Active indicator */}
                {active === i && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute right-0 top-0 bottom-0 w-0.5 bg-cyan-glow"
                    transition={{ duration: 0.2 }}
                  />
                )}
                {exp.company}
              </button>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex-1 px-10 py-2"
          >
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                className={`${active === i ? "block" : "hidden"}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={active}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-4 mb-1">
                    <h3 className="font-syne font-bold text-xl text-text-primary">
                      {exp.role}
                    </h3>
                    <span className="text-cyan-glow font-syne font-bold text-xl">
                      @ {exp.company}
                    </span>
                  </div>
                  <p className="font-mono text-text-muted text-sm mb-6">
                    {exp.period}
                  </p>
                  <p className="font-outfit text-text-secondary leading-relaxed mb-6">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span
                        key={h}
                        className="font-mono text-xs text-cyan-glow border border-cyan-glow/20 bg-cyan-dim px-3 py-1 rounded-sm"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative pl-12 pb-10"
            >
              {/* Timeline line */}
              {i < experiences.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-px bg-border" />
              )}

              {/* Dot */}
              <div
                className={`absolute left-0 top-1 w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-bold ${
                  i === 0
                    ? "bg-cyan-dim border-cyan-glow/50 text-cyan-glow"
                    : "bg-surface-2 border-border text-text-muted"
                }`}
              >
                {exp.logo}
              </div>

              <div>
                <p className="font-mono text-cyan-glow text-xs mb-1">{exp.period}</p>
                <h3 className="font-syne font-bold text-lg text-text-primary mb-1">
                  {exp.role}
                </h3>
                <p className="font-outfit text-text-secondary text-sm mb-1">
                  {exp.company}
                </p>
                <p className="font-outfit text-text-muted text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
