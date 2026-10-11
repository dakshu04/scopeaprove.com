import { ChevronDown } from "lucide-react";

import type { FreelanceRateFaq } from "@/lib/freelance-hourly-rate-calculator-schema";

type FreelanceHourlyRateCalculatorFaqProps = {
  items: readonly FreelanceRateFaq[];
};

export function FreelanceHourlyRateCalculatorFaq({
  items,
}: FreelanceHourlyRateCalculatorFaqProps) {
  return (
    <div className="mt-8 divide-y divide-[#dde2de] border-y border-[#dde2de] dark:divide-white/10 dark:border-white/10">
      {items.map((item, index) => (
        <details className="group py-1" key={item.question} open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-lg py-5 text-left font-semibold text-[#202b26] outline-none marker:content-none focus-visible:ring-2 focus-visible:ring-[#176b55] dark:text-white">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              className="size-5 shrink-0 text-[#176b55] transition-transform group-open:rotate-180 dark:text-[#9be2c4]"
            />
          </summary>
          <p className="max-w-3xl pb-5 pr-10 text-sm leading-7 text-[#616b66] dark:text-white/65 sm:text-base">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
