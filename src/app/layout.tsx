import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/ui/GoogleAnalytics";

export const metadata: Metadata = {
  title: "Mirangga Jakti — AI-Powered Full-Stack Engineer",
  description:
    "AI-Powered Full-Stack Engineer from Indonesia. Building AI-driven web apps, SaaS tools, and intelligent automation. Open to global remote opportunities.",
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
    title: "Mirangga Jakti — AI-Powered Full-Stack Engineer",
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
      <body className="antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
