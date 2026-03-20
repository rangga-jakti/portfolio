import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import GATracker from "@/components/GATracker";

export const metadata: Metadata = {
  title: "Mirangga Jakti – AI-Powered Full-Stack Engineer",
  description: "AI-powered web apps and SaaS builder",
};

const GA_ID = "G-G49EVP6QBP"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 🔥 LOAD GOOGLE ANALYTICS */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />

        {/* 🔥 INIT GOOGLE ANALYTICS */}
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;

              gtag('js', new Date());

              gtag('config', '${GA_ID}');
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