"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import {
  Calculator,
  Check,
  Clipboard,
  Info,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import {
  CurrencySelect,
  type CurrencyCode,
} from "@/components/calculators/currency-select";
import { calculateFreelanceRate } from "@/lib/freelance-hourly-rate-calculator";

type CalculatorValues = {
  annualExpenses: string;
  billablePercent: string;
  currency: CurrencyCode;
  desiredTakeHome: string;
  hoursPerWeek: string;
  projectHours: string;
  taxPercent: string;
  vacationWeeks: string;
};

type CopyStatus = "idle" | "copying" | "copied" | "error";

const initialValues: CalculatorValues = {
  annualExpenses: "12000",
  billablePercent: "60",
  currency: "USD",
  desiredTakeHome: "60000",
  hoursPerWeek: "40",
  projectHours: "20",
  taxPercent: "25",
  vacationWeeks: "4",
};

function parseAmount(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function FreelanceHourlyRateCalculator() {
  const [values, setValues] = useState<CalculatorValues>(initialValues);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const results = useMemo(
    () =>
      calculateFreelanceRate({
        annualExpenses: parseAmount(values.annualExpenses),
        billablePercent: parseAmount(values.billablePercent),
        desiredTakeHome: parseAmount(values.desiredTakeHome),
        hoursPerWeek: parseAmount(values.hoursPerWeek),
        projectHours: parseAmount(values.projectHours),
        taxPercent: parseAmount(values.taxPercent),
        vacationWeeks: parseAmount(values.vacationWeeks),
      }),
    [values],
  );

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en", {
        currency: values.currency,
        maximumFractionDigits: 0,
        style: "currency",
      }),
    [values.currency],
  );

  const rateFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en", {
        currency: values.currency,
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
        style: "currency",
      }),
    [values.currency],
  );

  const setField = <Key extends keyof CalculatorValues>(field: Key, value: CalculatorValues[Key]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setCopyStatus("idle");
  };

  const copySummary = async () => {
    setCopyStatus("copying");
    const lines = [
      "Freelance rate plan",
      `Target hourly rate: ${rateFormatter.format(results.hourlyRate)}/hour`,
      `Annual revenue target: ${currencyFormatter.format(results.annualRevenueTarget)}`,
      `Monthly revenue target: ${currencyFormatter.format(results.monthlyRevenueTarget)}`,
      `Planned billable time: ${results.weeklyBillableHours.toFixed(1)} hours/week`,
      `${values.projectHours || "0"}-hour project minimum: ${currencyFormatter.format(results.projectMinimum)}`,
      "Calculated with the free ScopeYes freelance hourly rate calculator.",
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
      aria-labelledby="rate-calculator-heading"
      className="min-w-0 rounded-[2rem] border border-[#d6e0db] bg-[#edf4f0]/90 p-1.5 shadow-[0_32px_90px_rgba(19,61,47,0.16),0_2px_8px_rgba(19,61,47,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/[0.055]"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-[0.9rem] bg-[#176b55] text-white shadow-[0_8px_20px_rgba(23,107,85,0.2)]">
            <Calculator aria-hidden="true" className="size-[1.05rem]" />
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold tracking-[-0.02em] text-[#1b2923] dark:text-white sm:text-base" id="rate-calculator-heading">
              Freelance rate planner
            </h2>
            <p className="mt-0.5 text-[0.7rem] font-medium text-[#738079] dark:text-white/45">
              Build a rate around the life you want
            </p>
          </div>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full border border-[#cee0d7] bg-white/75 px-2.5 py-1 text-[0.66rem] font-semibold text-[#36705f] shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-[#a9e5cc] sm:inline-flex">
          <span className="size-1.5 rounded-full bg-[#2a9a75] shadow-[0_0_0_3px_rgba(42,154,117,0.12)]" />
          Live calculation
        </span>
      </div>

      <div className="grid min-w-0 gap-1.5 md:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.85fr)]">
        <form
          className="min-w-0 rounded-[1.55rem] border border-white/90 bg-white p-5 shadow-[0_8px_30px_rgba(24,55,45,0.055)] dark:border-white/8 dark:bg-[#17251f] sm:p-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <fieldset>
            <legend className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-[#8a948f] dark:text-white/40">
              <span className="grid size-5 place-items-center rounded-md bg-[#edf4f0] text-[0.62rem] text-[#176b55] dark:bg-white/7 dark:text-[#a9e5cc]">1</span>
              Income target
            </legend>
            <div className="mt-4 grid min-w-0 gap-4 sm:grid-cols-2">
              <CurrencySelect onValueChange={(value) => setField("currency", value)} value={values.currency} />
              <RateField label="Annual take-home" min={0} onChange={(value) => setField("desiredTakeHome", value)} required value={values.desiredTakeHome} />
              <RateField hint="Software, insurance, equipment" label="Business expenses" min={0} onChange={(value) => setField("annualExpenses", value)} value={values.annualExpenses} />
              <RateField hint="Planning estimate only" label="Tax reserve" max={95} min={0} onChange={(value) => setField("taxPercent", value)} suffix="%" value={values.taxPercent} />
            </div>
          </fieldset>

          <fieldset className="mt-6 border-t border-[#edf0ee] pt-5 dark:border-white/8">
            <legend className="flex translate-y-[0.65rem] items-center gap-2 bg-white pr-3 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-[#8a948f] dark:bg-[#17251f] dark:text-white/40">
              <span className="grid size-5 place-items-center rounded-md bg-[#edf4f0] text-[0.62rem] text-[#176b55] dark:bg-white/7 dark:text-[#a9e5cc]">2</span>
              Working capacity
            </legend>
            <div className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2">
              <RateField label="Weekly work hours" max={100} min={1} onChange={(value) => setField("hoursPerWeek", value)} required suffix="hrs" value={values.hoursPerWeek} />
              <RateField hint="Time you can actually invoice" label="Billable time" max={100} min={1} onChange={(value) => setField("billablePercent", value)} required suffix="%" value={values.billablePercent} />
              <RateField label="Vacation per year" max={51} min={0} onChange={(value) => setField("vacationWeeks", value)} suffix="weeks" value={values.vacationWeeks} />
              <RateField label="Example project" min={0} onChange={(value) => setField("projectHours", value)} suffix="hrs" value={values.projectHours} />
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
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.15em] text-[#a9e5cc]">Sustainable hourly rate</p>
              <span className="grid size-8 place-items-center rounded-xl bg-white/8 text-[#a9e5cc] ring-1 ring-white/10">
                <Sparkles aria-hidden="true" className="size-3.5" />
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-end gap-x-1.5 gap-y-1">
              <p className="break-words text-[2.65rem] font-semibold leading-none tracking-[-0.06em] sm:text-5xl">
                {rateFormatter.format(results.hourlyRate)}
              </p>
              <span className="pb-1 text-xs font-semibold text-white/40">/ hour</span>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-5 text-white/55">
              Your financial floor after costs, taxes, time off, and non-billable work.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-2.5 text-xs">
              <ResultMetric label="Annual target" value={currencyFormatter.format(results.annualRevenueTarget)} />
              <ResultMetric label="Monthly target" value={currencyFormatter.format(results.monthlyRevenueTarget)} />
              <ResultMetric label="Billable / week" value={`${results.weeklyBillableHours.toFixed(1)} hrs`} />
              <ResultMetric
                icon={<TrendingUp aria-hidden="true" className="size-3" />}
                label={`${values.projectHours || "0"}-hour floor`}
                value={currencyFormatter.format(results.projectMinimum)}
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
              {copyStatus === "copying" ? "Copying…" : copyStatus === "copied" ? "Rate plan copied" : "Copy my rate plan"}
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
      <dt className="flex items-center gap-1 truncate text-[0.65rem] font-medium text-white/42">{icon}{label}</dt>
      <dd className="mt-1.5 truncate text-sm font-semibold tracking-[-0.015em] text-white/90">{value}</dd>
    </div>
  );
}

type RateFieldProps = {
  hint?: string;
  label: string;
  max?: number;
  min: number;
  onChange: (value: string) => void;
  required?: boolean;
  suffix?: string;
  value: string;
};

function RateField({ hint, label, max, min, onChange, required, suffix, value }: RateFieldProps) {
  const inputId = useId();
  const helpId = `${inputId}-help`;
  const numericValue = Number(value);
  const isInvalid =
    (required && value === "") ||
    (value !== "" && (!Number.isFinite(numericValue) || numericValue < min || (max !== undefined && numericValue > max)));
  const rangeMessage = max === undefined ? `${min} or more` : `${min} to ${max}`;

  return (
    <div className="min-w-0">
      <label className="text-[0.78rem] font-semibold tracking-[-0.01em] text-[#49564f] dark:text-white/70" htmlFor={inputId}>{label}</label>
      <span className="relative block">
        <input
          aria-describedby={hint || isInvalid ? helpId : undefined}
          aria-invalid={isInvalid}
          className={`mt-2 h-[3.25rem] w-full rounded-[0.9rem] border border-[#d7e0db] bg-[#f8faf8] px-3.5 text-base font-semibold tabular-nums text-[#1d2924] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_2px_rgba(20,50,40,0.03)] outline-none transition hover:border-[#b8cbc2] hover:bg-white focus:border-[#2b8069] focus:bg-white focus:ring-4 focus:ring-[#2b8069]/10 aria-invalid:border-red-500 aria-invalid:ring-4 aria-invalid:ring-red-500/10 dark:border-white/12 dark:bg-white/[0.055] dark:text-white dark:hover:border-white/20 dark:hover:bg-white/[0.08] dark:focus:border-[#79c9a9] dark:focus:bg-white/[0.08] ${suffix ? "pr-16" : ""}`}
          id={inputId}
          inputMode="decimal"
          max={max}
          min={min}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          step="any"
          type="number"
          value={value}
        />
        {suffix ? <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center pt-2 text-[0.68rem] font-semibold text-[#87918c] dark:text-white/35">{suffix}</span> : null}
      </span>
      {isInvalid ? (
        <span className="mt-1.5 block text-[0.68rem] font-medium text-red-600 dark:text-red-400" id={helpId} role="alert">Enter a number from {rangeMessage}.</span>
      ) : hint ? (
        <span className="mt-1.5 block text-[0.68rem] leading-4 text-[#8a948f] dark:text-white/35" id={helpId}>{hint}</span>
      ) : null}
    </div>
  );
}
