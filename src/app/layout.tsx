import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mirangga Jakti — AI-Powered Software Engineer",
  description:
    "AI-Powered Software Engineer from Indonesia. Building AI-driven web apps, SaaS tools, and intelligent automation. Open to global remote opportunities.",
  keywords: [
    "AI Software Engineer",
    "Full-Stack Developer",
    "LLM Integration",
    "SaaS Builder",
    "Indonesia",
    "Remote",
    "Next.js",
    "Python",
    "LangChain",
  ],
  authors: [{ name: "Mirangga Jakti" }],
  openGraph: {
    title: "Mirangga Jakti — AI-Powered Software Engineer",
    description:
      "Building AI-powered web apps that solve real-world problems. Open to global remote opportunities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
