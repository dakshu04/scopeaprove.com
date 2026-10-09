"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

const CONSENT_KEY = "scopeyes_analytics_consent";

type ConsentState = "granted" | "denied" | null;

type GoogleTagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

function updateGoogleConsent(value: Exclude<ConsentState, null>) {
  const analyticsStorage = value === "granted" ? "granted" : "denied";

  (window as GoogleTagWindow).gtag?.("consent", "update", {
    analytics_storage: analyticsStorage,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function readConsent(): ConsentState {
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("scopeyes-consent-changed", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("scopeyes-consent-changed", callback);
  };
}

export function GoogleAnalyticsConsent({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readConsent,
    () => null,
  );

  const isPrivateSurface =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/approve") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/checkout");

  function saveConsent(value: Exclude<ConsentState, null>) {
    window.localStorage.setItem(CONSENT_KEY, value);
    updateGoogleConsent(value);

    if (value === "granted") {
      (window as GoogleTagWindow).gtag?.("event", "page_view", {
        page_location: window.location.href,
        page_path: `${window.location.pathname}${window.location.search}`,
        page_title: document.title,
      });
    }

    window.dispatchEvent(new Event("scopeyes-consent-changed"));
  }

  if (isPrivateSurface) {
    return null;
  }

  return (
    <>
      <GoogleAnalytics gaId={gaId} />

      {consent === null ? (
        <aside
          aria-label="Analytics preference"
          className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-2xl rounded-2xl border border-[#d9ddd7] bg-white/95 p-4 text-[#1b1c18] shadow-[0_20px_60px_rgba(31,49,42,0.18)] backdrop-blur-xl sm:inset-x-6 sm:flex sm:items-center sm:justify-between sm:gap-5"
        >
          <div>
            <p className="text-sm font-semibold">Help us improve ScopeYes</p>
            <p className="mt-1 text-xs leading-5 text-[#696b65]">
              We use optional Google Analytics on public pages. Essential
              account features work without it.
            </p>
          </div>
          <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
            <button
              className="rounded-lg border border-[#d9ddd7] bg-white px-3.5 py-2 text-xs font-semibold hover:bg-[#f5f6f3]"
              onClick={() => saveConsent("denied")}
              type="button"
            >
              Essential only
            </button>
            <button
              className="rounded-lg bg-[#176b55] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#125844]"
              onClick={() => saveConsent("granted")}
              type="button"
            >
              Allow analytics
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}

export function AnalyticsPreferencesButton() {
  function reopenPreferences() {
    window.localStorage.removeItem(CONSENT_KEY);
    updateGoogleConsent("denied");
    window.dispatchEvent(new Event("scopeyes-consent-changed"));
  }

  return (
    <button
      className="font-semibold text-[#176b55] underline underline-offset-4"
      onClick={reopenPreferences}
      type="button"
    >
      Review analytics preference
    </button>
  );
}
