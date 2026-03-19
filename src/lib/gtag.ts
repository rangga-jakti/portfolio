export const GA_ID = "G-17DB76ECR";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const pageview = (url: string) => {
  if (typeof window.gtag === "undefined") return;
  window.gtag("config", GA_ID, { page_path: url });
};

export const event = (action: string, params?: Record<string, unknown>) => {
  if (typeof window.gtag === "undefined") return;
  window.gtag("event", action, params);
};
