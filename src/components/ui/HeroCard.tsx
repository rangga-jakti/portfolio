"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Cpu, Wifi, CheckCircle2 } from "lucide-react";

/* ── Terminal lines config ── */
const terminalLines = [
  { text: "$ initializing AI modules...",     delay: 0,    color: "text-text-muted" },
  { text: "> loading LLM engine",             delay: 800,  color: "text-cyan-glow"  },
  { text: "> fetching real-time data...",     delay: 1600, color: "text-text-muted" },
  { text: "> running Prophet forecast",       delay: 2400, color: "text-cyan-glow"  },
  { text: "> generating AI insights...",      delay: 3200, color: "text-text-muted" },
  { text: "✓ all systems operational",        delay: 4000, color: "text-emerald-400"},
];

function TerminalBg() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [typedTexts, setTypedTexts]     = useState<string[]>(Array(terminalLines.length).fill(""));

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    terminalLines.forEach((line, i) => {
      // Show line
      timers.push(setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        // Type char by char
        let charIdx = 0;
        const typeInterval = setInterval(() => {
          charIdx++;
          setTypedTexts(prev => {
            const next = [...prev];
            next[i] = line.text.slice(0, charIdx);
            return next;
          });
          if (charIdx >= line.text.length) clearInterval(typeInterval);
        }, 28);
        timers.push(typeInterval as unknown as ReturnType<typeof setTimeout>);
      }, line.delay));
    });

    // Reset loop
    const resetTimer = setTimeout(() => {
      setVisibleLines([]);
      setTypedTexts(Array(terminalLines.length).fill(""));
    }, 7000);
    timers.push(resetTimer);

    return () => timers.forEach(clearTimeout);
  }, [visibleLines.length === 0 ? 0 : -1]);

  // Re-trigger loop
  useEffect(() => {
    if (visibleLines.length === 0 && typedTexts.every(t => t === "")) {
      const t = setTimeout(() => setVisibleLines([]), 500);
      return () => clearTimeout(t);
    }
  }, [visibleLines, typedTexts]);

  return (
    <div className="absolute inset-0 p-5 font-mono text-[11px] leading-6 select-none pointer-events-none overflow-hidden">
      {terminalLines.map((line, i) => (
        <div
          key={i}
          className={`transition-opacity duration-300 ${
            visibleLines.includes(i) ? "opacity-100" : "opacity-0"
          } ${line.color}`}
        >
          {typedTexts[i]}
          {visibleLines.includes(i) && typedTexts[i].length < line.text.length && (
            <span className="inline-block w-1.5 h-3 bg-cyan-glow/70 ml-0.5 animate-pulse" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Status dot ── */
function StatusDot({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <span className="font-mono text-[10px] text-emerald-400">{label}</span>
    </div>
  );
}

/* ── Main HeroCard ── */
export default function HeroCard() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full max-w-[340px] mx-auto">

      {/* ── Terminal background layer ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute -inset-6 rounded-2xl bg-surface/60 border border-border/30 overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <TerminalBg />
        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-glow/30" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-glow/30" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-glow/30" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-glow/30" />
      </motion.div>

      {/* ── Floating glass card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ zIndex: 1, position: "relative" }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(13,17,23,0.92) 0%, rgba(22,27,34,0.88) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,255,224,0.15)",
            boxShadow: "0 0 40px rgba(0,255,224,0.08), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Top gradient bar */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-glow/60 to-transparent" />

          <div className="p-6">
            {/* Top row: status */}
            <div className="flex items-center justify-between mb-5">
              <StatusDot label="Available for work" />
              <div className="flex items-center gap-1.5 text-text-muted">
                <Cpu size={11} />
                <span className="font-mono text-[10px]">v2.4.1</span>
              </div>
            </div>

            {/* Profile image */}
            <div className="flex justify-center mb-5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{ boxShadow: "0 0 30px rgba(0,255,224,0.2), 0 0 60px rgba(0,255,224,0.08)" }}
                />
                {!imgError ? (
                  <Image
                    src="/images/profile.jpeg"
                    alt="Mirangga Jakti"
                    width={110}
                    height={110}
                    className="rounded-xl object-cover relative z-10 border border-cyan-glow/20"
                    onError={() => setImgError(true)}
                    priority
                  />
                ) : (
                  /* Fallback avatar if no image */
                  <div className="w-[110px] h-[110px] rounded-xl bg-gradient-to-br from-cyan-glow/20 to-blue-500/20 border border-cyan-glow/20 flex items-center justify-center relative z-10">
                    <span className="font-syne font-bold text-3xl text-cyan-glow">MJ</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Name & role */}
            <div className="text-center mb-5">
              <h3 className="font-syne font-bold text-base text-text-primary leading-tight mb-1">
                Mirangga (Rangga) Jakti
              </h3>
              <p className="font-mono text-[11px] text-cyan-glow mb-1">
                AI-Powered Full-Stack Engineer
              </p>
              <p className="font-outfit text-xs text-text-muted italic">
                &ldquo;Building intelligent systems&rdquo;
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />

            {/* Skills pills */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-5">
              {["LLM", "Next.js", "Python", "FastAPI", "ML"].map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[10px] text-text-secondary border border-border/70 bg-surface-3/60 px-2 py-0.5 rounded-sm hover:text-cyan-glow hover:border-cyan-glow/30 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { value: "15+", label: "Projects" },
                { value: "2",   label: "SaaS" },
                { value: "5+",  label: "ML Models" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-surface-3/50 rounded-lg py-2 px-1 border border-border/40">
                  <div className="font-syne font-bold text-sm text-cyan-glow">{value}</div>
                  <div className="font-mono text-[9px] text-text-muted uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>

            {/* Bottom: location + online */}
            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono text-[10px] text-text-muted flex items-center gap-1">
                <Wifi size={9} />
                Indonesia 🇮🇩
              </span>
              <span className="flex items-center gap-1 font-mono text-[10px] text-text-muted">
                <CheckCircle2 size={9} className="text-emerald-400" />
                Open to remote
              </span>
            </div>
          </div>

          {/* Bottom gradient bar */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-amber-glow/30 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Ambient glow behind card */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,224,0.08) 0%, transparent 70%)",
          filter: "blur(20px)",
          zIndex: 0,
        }}
      />
    </div>
  );
}
