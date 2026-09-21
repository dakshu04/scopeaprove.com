"use client";

import { useEffect, useState } from "react";

export function HeroLiveStatus() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const elapsed = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <span
      className="inline-flex items-center gap-2 text-xs text-[#65716b]"
      aria-label={`Client is reviewing this request. Review open for ${elapsed}.`}
    >
      <span className="relative flex size-2.5" aria-hidden="true">
        <span className="absolute inline-flex size-full rounded-full bg-[#2a9d78] opacity-35 motion-safe:animate-ping" />
        <span className="relative inline-flex size-2.5 rounded-full bg-[#176b55]" />
      </span>
      <span className="font-medium text-[#365c50]">Client reviewing</span>
      <span className="font-mono tabular-nums text-[#8a8d87]">{elapsed}</span>
    </span>
  );
}
