import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "Mirangga Jakti — AI-Powered Full-Stack Engineer",
  description:
    "AI-Powered Full-Stack Engineer from Indonesia. Building AI-driven web apps, SaaS tools, and intelligent automation. Open to global remote opportunities.",
  authors: [{ name: "Mirangga Jakti" }],
  openGraph: {
    title: "Mirangga Jakti — AI-Powered Full-Stack Engineer",
    description: "Building AI-powered web apps that solve real-world problems.",
    type: "website",
  },
};

const GA_ID = "G-17DB76ECR";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Load GA script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />

        {/* ✅ Init GA properly */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;

              gtag('js', new Date());

              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `,
          }}
        />
      </head>

      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}