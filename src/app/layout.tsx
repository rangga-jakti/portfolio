import type { Metadata } from "next";
import "./globals.css";

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
        {/* 🔥 GOOGLE ANALYTICS FIX FINAL */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;

              gtag('js', new Date());

              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}