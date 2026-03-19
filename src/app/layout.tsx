import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Mirangga Jakti — AI-Powered Full-Stack Engineer",
  description:
    "AI-Powered Full-Stack Engineer from Indonesia. Building AI-driven web apps, SaaS tools, and intelligent automation. Open to global remote opportunities.",
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
        {/* GA script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />

        {/* GA init */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}