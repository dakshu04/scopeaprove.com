"use client";

import { useEffect } from "react";

export function SectionReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".landing-page");
    if (!root) return;

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("main > section:not(:first-child)"),
    );

    sections.forEach((section) => {
      section.dataset.sectionReveal = "";
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    root.classList.add("landing-reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -6% 0px",
        threshold: 0.08,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      root.classList.remove("landing-reveal-ready");
    };
  }, []);

  return null;
}
