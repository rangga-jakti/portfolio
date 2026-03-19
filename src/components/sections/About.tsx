"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/lib/data";

const categoryColors: Record<string, string> = {
  language: "text-cyan-glow border-cyan-glow/30 bg-cyan-dim",
  frontend:  "text-purple-400 border-purple-400/30 bg-purple-400/10",
  backend:   "text-amber-glow border-amber-glow/30 bg-amber-dim",
  ai:        "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  database:  "text-blue-400 border-blue-400/30 bg-blue-400/10",
  devops:    "text-rose-400 border-rose-400/30 bg-rose-400/10",
};

const categoryLabel: Record<string, string> = {
  language: "Language",
  frontend: "Frontend",
  backend:  "Backend",
  ai:       "AI / ML",
  database: "Database",
  devops:   "DevOps",
};

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="about" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-radial from-cyan-glow/[0.03] via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="section-number">01.</span>
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-text-primary">
            About Me
          </h2>
          <div className="flex-1 h-px bg-border max-w-xs" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-5">
            {[
              "I'm an AI-powered software engineer from Indonesia, focused on building intelligent web applications that solve real problems. My passion sits at the intersection of large language models, data pipelines, and modern full-stack development.",
              "I've been building in public — shipping SaaS products like TrendPulse AI and VentureLens AI that combine real-time data, LLM-powered insights, and clean UI into tools that founders and businesses can actually use.",
              "I'm self-taught and driven by curiosity. Every project is an opportunity to go deeper — whether that's integrating a new LLM API, designing a faster backend, or crafting a UI that feels effortless. I build with intention, and I ship.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.6 }}
                className="font-outfit text-text-secondary text-base leading-relaxed"
              >
                {text}
              </motion.p>
            ))}

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-4"
            >
              <p className="font-mono text-xs text-text-muted mb-4 tracking-widest uppercase">
                Technologies & Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.04 }}
                    title={categoryLabel[skill.category]}
                    className={`px-3 py-1 text-xs font-mono border rounded-sm cursor-default transition-all duration-200 hover:scale-105 ${
                      categoryColors[skill.category]
                    }`}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
              {/* Legend */}
              <div className="flex flex-wrap gap-3 mt-4">
                {Object.entries(categoryLabel).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${categoryColors[key].split(" ")[2].replace("bg-", "bg-").replace("/10", "")}`} />
                    <span className="font-mono text-[10px] text-text-muted">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Terminal card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            <div className="bg-surface-2 border border-border rounded-lg overflow-hidden shadow-card-hover">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-xs text-text-muted">mirangga.ts</span>
              </div>

              {/* Code */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="space-y-1">
                  <p>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-cyan-glow">mirangga</span>{" "}
                    <span className="text-text-secondary">= {"{"}</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-text-secondary">name:</span>{" "}
                    <span className="text-amber-glow">&quot;Mirangga Jakti&quot;</span>
                    <span className="text-text-muted">,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-text-secondary">location:</span>{" "}
                    <span className="text-amber-glow">&quot;Indonesia 🇮🇩&quot;</span>
                    <span className="text-text-muted">,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-text-secondary">focus:</span>{" "}
                    <span className="text-amber-glow">&quot;AI-Powered SaaS&quot;</span>
                    <span className="text-text-muted">,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-text-secondary">aiStack:</span>{" "}
                    <span className="text-text-muted">[</span>
                  </p>
                  {["LLaMA", "Groq API", "LangChain", "Prophet"].map((item) => (
                    <p key={item} className="pl-8">
                      <span className="text-emerald-400">&quot;{item}&quot;</span>
                      <span className="text-text-muted">,</span>
                    </p>
                  ))}
                  <p className="pl-4">
                    <span className="text-text-muted">],</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-text-secondary">remote:</span>{" "}
                    <span className="text-cyan-glow">true</span>
                    <span className="text-text-muted">,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-text-secondary">building:</span>{" "}
                    <span className="text-amber-glow">&quot;AI products that matter&quot;</span>
                  </p>
                  <p>
                    <span className="text-text-secondary">{"}"}</span>
                  </p>
                  <p className="mt-4 text-text-muted">
                    <span className="text-emerald-400">// </span>
                    <span className="animate-pulse">open to global opportunities</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 border border-cyan-glow/10 rounded-lg" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-amber-glow/10 rounded-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
