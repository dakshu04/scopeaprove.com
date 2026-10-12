"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import {
  Calculator,
  Check,
  Clipboard,
  Clock3,
  Info,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import {
  CurrencySelect,
  type CurrencyCode,
} from "@/components/calculators/currency-select";

type CalculatorValues = {
  currency: CurrencyCode;
  delayDays: string;
  extraHours: string;
  hourlyRate: string;
  originalFee: string;
  rushPercent: string;
};

type CopyStatus = "idle" | "copying" | "copied" | "error";

const initialValues: CalculatorValues = {
  currency: "USD",
  delayDays: "2",
  extraHours: "8",
  hourlyRate: "75",
  originalFee: "3000",
  rushPercent: "0",
};

function parseAmount(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function ScopeCreepCostCalculator() {
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
      projectIncrease: originalFee > 0 ? (total / originalFee) * 100 : null,
      rushFee,
      total,
    };
  }, [values]);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en", {
        currency: values.currency,
        maximumFractionDigits: 2,
        style: "currency",
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

  return (
    <section
      aria-labelledby="calculator-heading"
      className="min-w-0 rounded-[2rem] border border-[#d6e0db] bg-[#edf4f0]/90 p-1.5 shadow-[0_32px_90px_rgba(19,61,47,0.16),0_2px_8px_rgba(19,61,47,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/[0.055]"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-[0.9rem] bg-[#176b55] text-white shadow-[0_8px_20px_rgba(23,107,85,0.2)]">
            <Calculator aria-hidden="true" className="size-[1.05rem]" />
          </span>
          <div className="min-w-0">
            <h2
              className="truncate text-sm font-semibold tracking-[-0.02em] text-[#1b2923] dark:text-white sm:text-base"
              id="calculator-heading"
            >
              Scope change estimator
            </h2>
            <p className="mt-0.5 text-[0.7rem] font-medium text-[#738079] dark:text-white/45">
              Price the request before work begins
            </p>
          </div>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full border border-[#cee0d7] bg-white/75 px-2.5 py-1 text-[0.66rem] font-semibold text-[#36705f] shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-[#a9e5cc] sm:inline-flex">
          <span className="size-1.5 rounded-full bg-[#2a9a75] shadow-[0_0_0_3px_rgba(42,154,117,0.12)]" />
          Instant estimate
        </span>
      </div>

      <div className="grid min-w-0 gap-1.5 md:grid-cols-[minmax(0,1.08fr)_minmax(17rem,0.92fr)]">
        <form
          className="min-w-0 rounded-[1.55rem] border border-white/90 bg-white p-5 shadow-[0_8px_30px_rgba(24,55,45,0.055)] dark:border-white/8 dark:bg-[#17251f] sm:p-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <fieldset>
            <legend className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-[#8a948f] dark:text-white/40">
              <span className="grid size-5 place-items-center rounded-md bg-[#edf4f0] text-[0.62rem] text-[#176b55] dark:bg-white/7 dark:text-[#a9e5cc]">
                1
              </span>
              Project baseline
            </legend>
            <div className="mt-4 grid min-w-0 gap-4 sm:grid-cols-2">
              <CurrencySelect
                onValueChange={(value) => setField("currency", value)}
                value={values.currency}
              />
              <NumberField
                label="Original project fee"
                min={0}
                onChange={(value) => setField("originalFee", value)}
                value={values.originalFee}
              />
            </div>
          </fieldset>

          <fieldset className="mt-6 border-t border-[#edf0ee] pt-5 dark:border-white/8">
            <legend className="flex translate-y-[0.65rem] items-center gap-2 bg-white pr-3 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-[#8a948f] dark:bg-[#17251f] dark:text-white/40">
              <span className="grid size-5 place-items-center rounded-md bg-[#edf4f0] text-[0.62rem] text-[#176b55] dark:bg-white/7 dark:text-[#a9e5cc]">
                2
              </span>
              Change details
            </legend>
            <div className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2">
              <NumberField
                label="Extra hours"
                min={0}
                onChange={(value) => setField("extraHours", value)}
                required
                step="0.5"
                suffix="hours"
                value={values.extraHours}
              />
              <NumberField
                label="Hourly rate"
                min={0}
                onChange={(value) => setField("hourlyRate", value)}
                required
                step="0.01"
                value={values.hourlyRate}
              />
              <NumberField
                hint="Optional premium for urgent work"
                label="Rush premium"
                min={0}
                onChange={(value) => setField("rushPercent", value)}
                suffix="%"
                value={values.rushPercent}
              />
              <NumberField
                label="Timeline extension"
                min={0}
                onChange={(value) => setField("delayDays", value)}
                suffix="days"
                value={values.delayDays}
              />
            </div>
          </fieldset>
        </form>

        <div
          aria-live="polite"
          className="relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[1.55rem] bg-[radial-gradient(circle_at_85%_0%,rgba(103,200,163,0.2),transparent_37%),linear-gradient(145deg,#173d32_0%,#0f2f27_100%)] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-6"
        >
          <div aria-hidden="true" className="absolute -bottom-16 -left-14 size-48 rounded-full border border-white/5" />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.15em] text-[#a9e5cc]">
                Recommended change order
              </p>
              <span className="grid size-8 place-items-center rounded-xl bg-white/8 text-[#a9e5cc] ring-1 ring-white/10">
                <Sparkles aria-hidden="true" className="size-3.5" />
              </span>
            </div>
            <p className="mt-4 break-words text-[2.65rem] font-semibold leading-none tracking-[-0.06em] sm:text-5xl">
              {currencyFormatter.format(results.total)}
            </p>
            <p className="mt-3 max-w-sm text-xs leading-5 text-white/55">
              Add this amount to the original fee for the requested work.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-2.5 text-xs">
              <ResultMetric label="Extra work" value={currencyFormatter.format(results.laborCost)} />
              <ResultMetric label="Rush premium" value={currencyFormatter.format(results.rushFee)} />
              <ResultMetric
                icon={<TrendingUp aria-hidden="true" className="size-3" />}
                label="Fee increase"
                value={results.projectIncrease === null ? "—" : `${results.projectIncrease.toFixed(1)}%`}
              />
              <ResultMetric
                icon={<Clock3 aria-hidden="true" className="size-3" />}
                label="Timeline"
                value={`+${parseAmount(values.delayDays)} days`}
              />
            </dl>
          </div>

          <div className="relative mt-6">
            <button
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[0.9rem] bg-[#b4ecd5] px-4 text-sm font-semibold text-[#133b30] shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-[#c4f3df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#173d32] disabled:cursor-wait disabled:opacity-70"
              disabled={copyStatus === "copying"}
              onClick={copySummary}
              type="button"
            >
              {copyStatus === "copied" ? <Check aria-hidden="true" className="size-4" /> : <Clipboard aria-hidden="true" className="size-4" />}
              {copyStatus === "copying" ? "Copying…" : copyStatus === "copied" ? "Estimate copied" : "Copy client-ready estimate"}
            </button>
            {copyStatus === "error" ? (
              <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-[0.68rem] leading-4 text-red-200" role="alert">
                <Info aria-hidden="true" className="mt-0.5 size-3 shrink-0" />
                Copy was blocked. Select and copy the values above.
              </p>
            ) : (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[0.68rem] text-white/40">
                <ShieldCheck aria-hidden="true" className="size-3" />
                Private calculation · nothing is uploaded
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultMetric({ icon, label, value }: { icon?: ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/8 bg-white/[0.055] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
      <dt className="flex items-center gap-1 text-[0.65rem] font-medium text-white/42">
        {icon}
        {label}
      </dt>
      <dd className="mt-1.5 truncate text-sm font-semibold tracking-[-0.015em] text-white/90">
        {value}
      </dd>
    </div>
  );
}

type NumberFieldProps = {
  hint?: string;
  label: string;
  min: number;
  onChange: (value: string) => void;
  required?: boolean;
  step?: string;
  suffix?: string;
  value: string;
};

function NumberField({ hint, label, min, onChange, required, step = "1", suffix, value }: NumberFieldProps) {
  const inputId = useId();
  const helpId = `${inputId}-help`;
  const numericValue = Number(value);
  const isInvalid = (required && value === "") || (value !== "" && (!Number.isFinite(numericValue) || numericValue < min));

  return (
    <div className="min-w-0">
      <label className="text-[0.78rem] font-semibold tracking-[-0.01em] text-[#49564f] dark:text-white/70" htmlFor={inputId}>
        {label}
      </label>
      <span className="relative block">
        <input
          aria-describedby={hint || isInvalid ? helpId : undefined}
          aria-invalid={isInvalid}
          className={`mt-2 h-[3.25rem] w-full rounded-[0.9rem] border border-[#d7e0db] bg-[#f8faf8] px-3.5 text-base font-semibold tabular-nums text-[#1d2924] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_2px_rgba(20,50,40,0.03)] outline-none transition hover:border-[#b8cbc2] hover:bg-white focus:border-[#2b8069] focus:bg-white focus:ring-4 focus:ring-[#2b8069]/10 aria-invalid:border-red-500 aria-invalid:ring-4 aria-invalid:ring-red-500/10 dark:border-white/12 dark:bg-white/[0.055] dark:text-white dark:hover:border-white/20 dark:hover:bg-white/[0.08] dark:focus:border-[#79c9a9] dark:focus:bg-white/[0.08] ${suffix ? "pr-16" : ""}`}
          id={inputId}
          inputMode="decimal"
          min={min}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          step={step}
          type="number"
          value={value}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center pt-2 text-[0.68rem] font-semibold text-[#87918c] dark:text-white/35">
            {suffix}
          </span>
        ) : null}
      </span>
      {isInvalid ? (
        <span className="mt-1.5 block text-[0.68rem] font-medium text-red-600 dark:text-red-400" id={helpId} role="alert">
          Enter a number of {min} or more.
        </span>
      ) : hint ? (
        <span className="mt-1.5 block text-[0.68rem] leading-4 text-[#8a948f] dark:text-white/35" id={helpId}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}
