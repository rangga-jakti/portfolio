"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Mail, MapPin, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { trackContactSubmit } from "@/lib/analytics";
import { siteConfig } from "@/lib/data";
import SocialLinks from "@/components/ui/SocialLinks";
import { trackContactSubmit, trackContactSuccess } from "@/lib/gtag";

type Status = "idle" | "sending" | "success" | "error";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const [form, setForm]         = useState({ name: "", email: "", message: "" });
  const [status, setStatus]     = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [touched, setTouched]   = useState({ name: false, email: false, message: false });

  /* ── Field-level validation ── */
  const emailValid   = emailRegex.test(form.email);
  const emailDirty   = touched.email && form.email.length > 0;
  const emailInvalid = emailDirty && !emailValid;
  const emailOk      = emailDirty && emailValid;

  const isFormValid =
    form.name.trim().length > 0 &&
    emailValid &&
    form.message.trim().length >= 10;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all touched on submit attempt
    setTouched({ name: true, email: true, message: true });
    if (!isFormValid) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      trackContactSuccess();
      setForm({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });

    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-glow/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="section-number">04.</span>
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-text-primary">
            Get In Touch
          </h2>
          <div className="flex-1 h-px bg-border max-w-xs" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h3 className="font-syne font-bold text-2xl text-text-primary mb-4">
              Let&apos;s build something{" "}
              <span className="gradient-text">remarkable</span> together.
            </h3>
            <p className="font-outfit text-text-secondary leading-relaxed mb-8">
              Whether you have a project in mind, want to discuss a role, or just
              want to say hi — my inbox is always open. I&apos;ll get back to you
              within 24 hours.
            </p>

            <div className="space-y-4 mb-8">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border group-hover:border-cyan-glow/40 flex items-center justify-center transition-all">
                  <Mail size={15} className="text-text-muted group-hover:text-cyan-glow transition-colors" />
                </div>
                <span className="font-mono text-sm text-text-secondary group-hover:text-cyan-glow transition-colors">
                  {siteConfig.email}
                </span>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center">
                  <MapPin size={15} className="text-text-muted" />
                </div>
                <span className="font-mono text-sm text-text-secondary">
                  {siteConfig.location}
                </span>
              </div>
            </div>

            <SocialLinks size="lg" showTooltip={true} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8 flex items-center gap-2 px-4 py-3 bg-surface-2 border border-border/60 rounded-lg w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-text-secondary">
                Avg. response time:{" "}
                <span className="text-emerald-400">under 24 hours</span>
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (

                /* ── Success ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="min-h-[460px] flex flex-col items-center justify-center text-center p-8 bg-surface-2 border border-emerald-400/20 rounded-xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mb-5"
                  >
                    <CheckCircle2 size={28} className="text-emerald-400" />
                  </motion.div>
                  <h3 className="font-syne font-bold text-xl text-text-primary mb-2">
                    Message Sent! 🎉
                  </h3>
                  <p className="font-outfit text-text-secondary text-sm mb-6 max-w-xs">
                    Thanks for reaching out! I&apos;ll reply to your email within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="font-mono text-xs text-text-muted hover:text-cyan-glow transition-colors border border-border hover:border-cyan-glow/30 px-4 py-2 rounded-lg"
                  >
                    Send another message
                  </button>
                </motion.div>

              ) : (

                /* ── Form ── */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <label className="font-mono text-xs text-text-muted mb-2 block tracking-wider uppercase">
                      Name
                    </label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur("name")}
                      required placeholder="John Doe"
                      className="w-full bg-surface-2 border border-border focus:border-cyan-glow/60 rounded-lg px-4 py-3 font-outfit text-text-primary text-sm placeholder:text-text-muted outline-none transition-all duration-300 focus:ring-1 focus:ring-cyan-glow/20"
                    />
                  </div>

                  {/* Email — with validation */}
                  <div>
                    <label className="font-mono text-xs text-text-muted mb-2 block tracking-wider uppercase">
                      Email
                    </label>

                    {/* Input wrapper with icon */}
                    <div className="relative">
                      <input
                        type="email" name="email" value={form.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        required placeholder="john@example.com"
                        className={`w-full bg-surface-2 border rounded-lg px-4 py-3 pr-10 font-outfit text-text-primary text-sm placeholder:text-text-muted outline-none transition-all duration-300 focus:ring-1 ${
                          emailInvalid
                            ? "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20"
                            : emailOk
                            ? "border-emerald-400/50 focus:border-emerald-400/70 focus:ring-emerald-400/20"
                            : "border-border focus:border-cyan-glow/60 focus:ring-cyan-glow/20"
                        }`}
                      />

                      {/* Status icon inside input */}
                      <AnimatePresence>
                        {emailInvalid && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <AlertCircle size={16} className="text-red-400" />
                          </motion.div>
                        )}
                        {emailOk && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <CheckCircle2 size={16} className="text-emerald-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Validation messages */}
                    <AnimatePresence mode="wait">
                      {emailInvalid ? (
                        <motion.p
                          key="error"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] text-red-400"
                        >
                          <AlertCircle size={10} />
                          Please enter a valid email address.
                        </motion.p>
                      ) : emailOk ? (
                        <motion.p
                          key="ok"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] text-emerald-400"
                        >
                          <CheckCircle2 size={10} />
                          Looks good!
                        </motion.p>
                      ) : (
                        <motion.p
                          key="hint"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="mt-1.5 font-mono text-[11px] text-text-muted"
                        >
                          Please use a valid email address so I can get back to you.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-mono text-xs text-text-muted mb-2 block tracking-wider uppercase">
                      Message
                    </label>
                    <textarea
                      name="message" value={form.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur("message")}
                      required rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full bg-surface-2 border border-border focus:border-cyan-glow/60 rounded-lg px-4 py-3 font-outfit text-text-primary text-sm placeholder:text-text-muted outline-none transition-all duration-300 resize-none focus:ring-1 focus:ring-cyan-glow/20"
                    />
                    <div className="flex items-center justify-between mt-1">
                      <AnimatePresence>
                        {touched.message && form.message.length > 0 && form.message.length < 10 && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="font-mono text-[11px] text-amber-glow flex items-center gap-1"
                          >
                            <AlertCircle size={10} />
                            At least 10 characters required.
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <p className={`font-mono text-[10px] ml-auto ${
                        form.message.length < 10 && form.message.length > 0
                          ? "text-amber-glow"
                          : "text-text-muted"
                      }`}>
                        {form.message.length} chars
                      </p>
                    </div>
                  </div>

                  {/* API error */}
                  <AnimatePresence>
                    {status === "error" && errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                      >
                        <AlertCircle size={15} className="text-red-400 shrink-0" />
                        <p className="font-outfit text-sm text-red-400">{errorMsg}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending" || !isFormValid}
                    className="group w-full flex items-center justify-center gap-2 py-3.5 bg-cyan-glow hover:bg-cyan-mid text-void font-syne font-semibold text-sm rounded-lg transition-all duration-300 hover:shadow-cyan-md disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="font-mono text-[10px] text-text-muted text-center">
                    Your message goes directly to my inbox 📬
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
