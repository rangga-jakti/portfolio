import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import GATracker from "@/components/GATracker";

export const metadata: Metadata = {
  title: "Mirangga Jakti – AI-Powered Full-Stack Engineer",
  description: "AI-powered web apps and SaaS builder",
};

const GA_ID = "G-17DB76ECR";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 🔥 GA LOAD */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />

        {/* 🔥 GA INIT */}
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;

              gtag('js', new Date());

              gtag('config', '${GA_ID}', {
                send_page_view: false
              });
            `,
          }}
        />

        {/* 🔥 TRACK PAGE VIEW */}
        <GATracker />

        {children}
      </body>
    </html>
  );
}