"use client";

import { useEffect } from "react";

export function HeroMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = document.querySelector<HTMLElement>(
      ".landing-page main > section:first-child",
    );
    if (!hero) return;

    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      const bounds = hero.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;

      const progress = Math.min(
        1,
        Math.max(0, -bounds.top / Math.max(bounds.height, 1)),
      );

      hero.style.setProperty("--hero-card-parallax", `${progress * 22}px`);
      hero.style.setProperty("--hero-copy-parallax", `${progress * 10}px`);
    };

    const requestParallax = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateParallax);
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty(
        "--hero-pointer-x",
        `${event.clientX - bounds.left}px`,
      );
      hero.style.setProperty(
        "--hero-pointer-y",
        `${event.clientY - bounds.top}px`,
      );
    };

    const resetPointer = () => {
      hero.style.setProperty("--hero-pointer-x", "72%");
      hero.style.setProperty("--hero-pointer-y", "30%");
    };

    updateParallax();
    resetPointer();
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);
    hero.addEventListener("pointermove", updatePointer);
    hero.addEventListener("pointerleave", resetPointer);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
      hero.removeEventListener("pointermove", updatePointer);
      hero.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  return null;
}
