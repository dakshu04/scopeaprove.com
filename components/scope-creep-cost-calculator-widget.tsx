"use client";

import { useId, useMemo, useState } from "react";
import { Calculator, Check, Clipboard, Clock3, Info, ShieldCheck } from "lucide-react";

type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "INR";

type CalculatorValues = {
  currency: CurrencyCode;
  extraHours: string;
  hourlyRate: string;
  originalFee: string;
  rushPercent: string;
  delayDays: string;
};

type CopyStatus = "idle" | "copying" | "copied" | "error";

const currencyOptions: ReadonlyArray<{ code: CurrencyCode; label: string }> = [
  { code: "USD", label: "USD ($)" },
  { code: "EUR", label: "EUR (€)" },
  { code: "GBP", label: "GBP (£)" },
  { code: "CAD", label: "CAD (C$)" },
  { code: "AUD", label: "AUD (A$)" },
  { code: "INR", label: "INR (₹)" },
];

const initialValues: CalculatorValues = {
  currency: "USD",
  extraHours: "8",
  hourlyRate: "75",
  originalFee: "3000",
  rushPercent: "0",
  delayDays: "2",
};

function parseAmount(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function ScopeCreepCostCalculatorWidget() {
  const [values, setValues] = useState<CalculatorValues>(initialValues);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const results = useMemo(() => {
    const extraHours = parseAmount(values.extraHours);
    const hourlyRate = parseAmount(values.hourlyRate);
    const originalFee = parseAmount(values.originalFee);
    const rushPercent = parseAmount(values.rushPercent);
    const laborCost = extraHours * hourlyRate;
    const rushFee = laborCost * (rushPercent / 100);
    const total = laborCost + rushFee;

    return {
      laborCost,
      rushFee,
      total,
      projectIncrease: originalFee > 0 ? (total / originalFee) * 100 : null,
    };
  }, [values]);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: values.currency,
        maximumFractionDigits: 2,
      }),
    [values.currency],
  );

  const setField = <Key extends keyof CalculatorValues>(
    field: Key,
    value: CalculatorValues[Key],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setCopyStatus("idle");
  };

  const copySummary = async () => {
    setCopyStatus("copying");
    const timeline = parseAmount(values.delayDays);
    const lines = [
      "Scope change estimate",
      `Additional work: ${values.extraHours || "0"} hours × ${currencyFormatter.format(parseAmount(values.hourlyRate))}/hour`,
      `Base cost: ${currencyFormatter.format(results.laborCost)}`,
      `Rush fee (${values.rushPercent || "0"}%): ${currencyFormatter.format(results.rushFee)}`,
      `Change order total: ${currencyFormatter.format(results.total)}`,
      `Schedule impact: ${timeline} additional day${timeline === 1 ? "" : "s"}`,
      "Estimate created with the free ScopeYes scope creep cost calculator.",
    ];

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2500);
    } catch {
      setCopyStatus("error");
    }
  };

  const fieldClassName =
    "mt-2 h-12 w-full rounded-xl border border-[#d8ded9] bg-white px-3.5 text-base font-medium text-[#1d2924] shadow-sm outline-none transition placeholder:text-[#9a9f9b] focus:border-[#2b8069] focus:ring-4 focus:ring-[#2b8069]/10 dark:border-white/15 dark:bg-white/5 dark:text-white";

  return (
    <section
      aria-labelledby="calculator-heading"
      className="min-w-0 overflow-hidden rounded-[1.75rem] border border-[#d9e2dd] bg-white shadow-[0_28px_80px_rgba(25,70,55,0.13)] dark:border-white/10 dark:bg-[#15231e]"
    >
      <div className="border-b border-[#e6ebe8] bg-[#f1f7f4] px-5 py-4 dark:border-white/10 dark:bg-white/5 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-[#176b55] text-white">
            <Calculator aria-hidden="true" className="size-4" />
          </span>
          <div>
            <h2 id="calculator-heading" className="font-semibold text-[#1b2923] dark:text-white">
              Calculate the cost of extra work
            </h2>
            <p className="text-xs text-[#68746f] dark:text-white/60">Free, instant, and private</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        <form className="grid min-w-0 gap-5 p-5 sm:grid-cols-2 sm:p-7" onSubmit={(event) => event.preventDefault()}>
          <label className="min-w-0 text-sm font-semibold text-[#35423c] dark:text-white/80">
            Currency
            <select
              aria-label="Currency"
              className={fieldClassName}
              onChange={(event) => setField("currency", event.target.value as CurrencyCode)}
              value={values.currency}
            >
              {currencyOptions.map(({ code, label }) => (
                <option key={code} value={code}>{label}</option>
              ))}
            </select>
          </label>

          <NumberField
            className={fieldClassName}
            label="Original project fee"
            min="0"
            onChange={(value) => setField("originalFee", value)}
            value={values.originalFee}
          />
          <NumberField
            className={fieldClassName}
            label="Extra hours requested"
            min="0"
            onChange={(value) => setField("extraHours", value)}
            required
            step="0.5"
            value={values.extraHours}
          />
          <NumberField
            className={fieldClassName}
            label="Your hourly rate"
            min="0"
            onChange={(value) => setField("hourlyRate", value)}
            required
            step="0.01"
            value={values.hourlyRate}
          />
          <NumberField
            className={fieldClassName}
            hint="Use 0 if there is no rush premium."
            label="Rush fee"
            min="0"
            onChange={(value) => setField("rushPercent", value)}
            suffix="%"
            value={values.rushPercent}
          />
          <NumberField
            className={fieldClassName}
            label="Timeline extension"
            min="0"
            onChange={(value) => setField("delayDays", value)}
            suffix="days"
            value={values.delayDays}
          />
        </form>

        <div className="flex min-w-0 flex-col justify-between bg-[#173d32] p-5 text-white sm:p-7" aria-live="polite">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a9e5cc]">Suggested change order</p>
            <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              {currencyFormatter.format(results.total)}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Charge this in addition to the original project fee for the requested work.
            </p>

            <dl className="mt-7 space-y-3 border-y border-white/10 py-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/60">Extra work</dt>
                <dd className="font-semibold">{currencyFormatter.format(results.laborCost)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/60">Rush fee</dt>
                <dd className="font-semibold">{currencyFormatter.format(results.rushFee)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/60">Project value increase</dt>
                <dd className="font-semibold">
                  {results.projectIncrease === null ? "—" : `${results.projectIncrease.toFixed(1)}%`}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-1.5 text-white/60"><Clock3 aria-hidden="true" className="size-3.5" /> Schedule impact</dt>
                <dd className="font-semibold">+{parseAmount(values.delayDays)} days</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6">
            <button
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#a9e5cc] px-4 py-3 text-sm font-semibold text-[#173d32] transition hover:bg-[#baf0da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#173d32] disabled:cursor-wait disabled:opacity-70"
              disabled={copyStatus === "copying"}
              onClick={copySummary}
              type="button"
            >
              {copyStatus === "copied" ? <Check aria-hidden="true" className="size-4" /> : <Clipboard aria-hidden="true" className="size-4" />}
              {copyStatus === "copying" ? "Copying…" : copyStatus === "copied" ? "Estimate copied" : "Copy estimate"}
            </button>
            {copyStatus === "error" ? (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-red-200" role="alert">
                <Info aria-hidden="true" className="size-3.5" /> Copy was blocked by your browser. Select and copy the values above.
              </p>
            ) : (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-white/50">
                <ShieldCheck aria-hidden="true" className="size-3.5" /> Your numbers never leave this browser.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type NumberFieldProps = {
  className: string;
  hint?: string;
  label: string;
  min: string;
  onChange: (value: string) => void;
  required?: boolean;
  step?: string;
  suffix?: string;
  value: string;
};

function NumberField({ className, hint, label, min, onChange, required, step = "1", suffix, value }: NumberFieldProps) {
  const inputId = useId();
  const helpId = `${inputId}-help`;
  const numericValue = Number(value);
  const isInvalid = (required && value === "") || (value !== "" && (!Number.isFinite(numericValue) || numericValue < Number(min)));

  return (
    <div className="min-w-0 text-sm font-semibold text-[#35423c] dark:text-white/80">
      <label htmlFor={inputId}>{label}</label>
      <span className="relative block">
        <input
          aria-describedby={hint || isInvalid ? helpId : undefined}
          aria-invalid={isInvalid}
          className={`${className} ${suffix ? "pr-16" : ""} aria-invalid:border-red-500 aria-invalid:ring-4 aria-invalid:ring-red-500/10`}
          id={inputId}
          inputMode="decimal"
          min={min}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          step={step}
          type="number"
          value={value}
        />
        {suffix ? <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-[#7b837f] dark:text-white/50">{suffix}</span> : null}
      </span>
      {isInvalid ? (
        <span className="mt-1.5 block text-xs font-medium text-red-600 dark:text-red-400" id={helpId} role="alert">
          Enter a number of {min} or more.
        </span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs font-normal text-[#7b837f] dark:text-white/50" id={helpId}>{hint}</span>
      ) : null}
    </div>
  );
}
