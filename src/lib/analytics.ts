// ─── GA4 Event Tracker ───────────────────────────────────────────────
// Safe wrapper — works only client-side, never throws on SSR

type GTagEvent = {
  action: string;
  params?: Record<string, string | number | boolean>;
};

export const trackEvent = ({ action, params }: GTagEvent): void => {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", action, params ?? {});
};

// ─── Recruiter Funnel Events ─────────────────────────────────────────

/** Hero CTA — "View My Projects" button */
export const trackViewProjects = () =>
  trackEvent({ action: "click_view_projects" });

/** Hero CTA — "Let's Build Something" button */
export const trackContactCTA = () =>
  trackEvent({ action: "click_contact_cta" });

/** Navbar / Resume button click */
export const trackResumeClick = () =>
  trackEvent({ action: "download_cv" });

/** Project card — View Code button */
export const trackProjectClick = (projectName: string) =>
  trackEvent({
    action: "view_project",
    params: { project_name: projectName },
  });

/** Contact form — submitted */
export const trackContactSubmit = () =>
  trackEvent({ action: "contact_form_submit" });

/** Social link click */
export const trackSocialClick = (platform: string) =>
  trackEvent({
    action: "click_social",
    params: { platform },
  });

// ─── Funnel Steps ────────────────────────────────────────────────────
// Step 1: landing_page_view  → auto-tracked by GA4
// Step 2: click_view_projects OR view_project
// Step 3: click_contact_cta OR download_cv OR contact_form_submit
