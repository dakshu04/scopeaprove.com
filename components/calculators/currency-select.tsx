"use client";

import { Select } from "@base-ui/react/select";
import { Check, ChevronsUpDown } from "lucide-react";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "INR";

const currencyOptions: ReadonlyArray<{
  code: CurrencyCode;
  name: string;
  symbol: string;
}> = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
];

const selectItems = currencyOptions.map(({ code }) => ({
  label: code,
  value: code,
}));

type CurrencySelectProps = {
  onValueChange: (value: CurrencyCode) => void;
  value: CurrencyCode;
};

export function CurrencySelect({ onValueChange, value }: CurrencySelectProps) {
  const selected = currencyOptions.find((option) => option.code === value) ?? currencyOptions[0];

  return (
    <Select.Root<CurrencyCode>
      items={selectItems}
      onValueChange={(nextValue) => {
        if (nextValue) onValueChange(nextValue);
      }}
      value={value}
    >
      <div className="min-w-0">
        <Select.Label className="text-[0.78rem] font-semibold tracking-[-0.01em] text-[#49564f] dark:text-white/70">
          Currency
        </Select.Label>
        <Select.Trigger className="group mt-2 flex h-[3.25rem] w-full items-center justify-between gap-3 rounded-[0.9rem] border border-[#d7e0db] bg-[#f8faf8] px-3.5 text-left text-sm font-semibold text-[#1d2924] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_2px_rgba(20,50,40,0.03)] outline-none transition hover:border-[#b8cbc2] hover:bg-white focus-visible:border-[#2b8069] focus-visible:ring-4 focus-visible:ring-[#2b8069]/10 data-[popup-open]:border-[#2b8069] data-[popup-open]:bg-white data-[popup-open]:ring-4 data-[popup-open]:ring-[#2b8069]/10 dark:border-white/12 dark:bg-white/[0.055] dark:text-white dark:hover:border-white/20 dark:hover:bg-white/[0.08]">
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#e4f1eb] text-[0.7rem] font-bold text-[#176b55] dark:bg-[#a9e5cc]/10 dark:text-[#a9e5cc]">
              {selected.symbol}
            </span>
            <span className="min-w-0 truncate">
              <Select.Value />
            </span>
          </span>
          <Select.Icon className="text-[#7b8982] transition-transform group-data-[popup-open]:rotate-180 dark:text-white/45">
            <ChevronsUpDown aria-hidden="true" className="size-4" />
          </Select.Icon>
        </Select.Trigger>
      </div>

      <Select.Portal>
        <Select.Positioner
          align="start"
          alignItemWithTrigger={false}
          className="z-[100] outline-none"
          sideOffset={8}
        >
          <Select.Popup className="min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-hidden rounded-2xl border border-[#d9e1dc] bg-white text-[#1d2924] shadow-[0_24px_70px_rgba(20,47,38,0.2)] outline-none transition-[transform,opacity] duration-150 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 dark:border-white/12 dark:bg-[#182721] dark:text-white">
            <div className="border-b border-[#edf0ee] px-3.5 py-3 dark:border-white/8">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.13em] text-[#87918c] dark:text-white/40">
                Choose currency
              </p>
            </div>
            <Select.List className="max-h-80 p-1.5">
              {currencyOptions.map((option) => (
                <Select.Item
                  className="grid cursor-default grid-cols-[2rem_1fr_1rem] items-center gap-2 rounded-xl px-2.5 py-2.5 text-sm outline-none transition data-[highlighted]:bg-[#edf5f1] data-[highlighted]:text-[#124f3f] dark:data-[highlighted]:bg-white/8 dark:data-[highlighted]:text-[#baf0da]"
                  key={option.code}
                  value={option.code}
                >
                  <span className="grid size-8 place-items-center rounded-lg bg-[#f0f4f2] text-[0.7rem] font-bold text-[#53615a] dark:bg-white/7 dark:text-white/65">
                    {option.symbol}
                  </span>
                  <Select.ItemText className="flex min-w-0 flex-col">
                    <span className="font-semibold">{option.code}</span>
                    <span className="text-[0.7rem] font-medium text-[#89918d] dark:text-white/40">
                      {option.name}
                    </span>
                  </Select.ItemText>
                  <Select.ItemIndicator className="text-[#176b55] dark:text-[#a9e5cc]">
                    <Check aria-hidden="true" className="size-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
