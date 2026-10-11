"use client";

import { useId, useMemo, useState } from "react";
import {
  Calculator,
  Check,
  Clipboard,
  Info,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { calculateFreelanceRate } from "@/lib/freelance-hourly-rate-calculator";

type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "INR";

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

const currencyOptions: ReadonlyArray<{ code: CurrencyCode; label: string }> = [
  { code: "USD", label: "USD ($)" },
  { code: "EUR", label: "EUR (€)" },
  { code: "GBP", label: "GBP (£)" },
  { code: "CAD", label: "CAD (C$)" },
  { code: "AUD", label: "AUD (A$)" },
  { code: "INR", label: "INR (₹)" },
];

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

export function FreelanceHourlyRateCalculatorWidget() {
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
        style: "currency",
        currency: values.currency,
        maximumFractionDigits: 0,
      }),
    [values.currency],
  );

  const rateFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: values.currency,
        minimumFractionDigits: 0,
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

  const fieldClassName =
    "mt-2 h-12 w-full rounded-xl border border-[#d8ded9] bg-white px-3.5 text-base font-medium text-[#1d2924] shadow-sm outline-none transition placeholder:text-[#9a9f9b] focus:border-[#2b8069] focus:ring-4 focus:ring-[#2b8069]/10 dark:border-white/15 dark:bg-white/5 dark:text-white";

  return (
    <section
      aria-labelledby="rate-calculator-heading"
      className="min-w-0 overflow-hidden rounded-[1.75rem] border border-[#d9e2dd] bg-white shadow-[0_28px_80px_rgba(25,70,55,0.13)] dark:border-white/10 dark:bg-[#15231e]"
    >
      <div className="border-b border-[#e6ebe8] bg-[#f1f7f4] px-5 py-4 dark:border-white/10 dark:bg-white/5 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-[#176b55] text-white">
            <Calculator aria-hidden="true" className="size-4" />
          </span>
          <div>
            <h2
              className="font-semibold text-[#1b2923] dark:text-white"
              id="rate-calculator-heading"
            >
              Calculate your sustainable rate
            </h2>
            <p className="text-xs text-[#68746f] dark:text-white/60">
              Income + costs + realistic billable time
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        <form
          className="grid min-w-0 gap-5 p-5 sm:grid-cols-2 sm:p-7"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="min-w-0 text-sm font-semibold text-[#35423c] dark:text-white/80">
            Currency
            <select
              aria-label="Currency"
              className={fieldClassName}
              onChange={(event) =>
                setField("currency", event.target.value as CurrencyCode)
              }
              value={values.currency}
            >
              {currencyOptions.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <RateField
            className={fieldClassName}
            label="Desired annual take-home"
            min={0}
            onChange={(value) => setField("desiredTakeHome", value)}
            required
            value={values.desiredTakeHome}
          />
          <RateField
            className={fieldClassName}
            hint="Software, insurance, equipment, and other overhead."
            label="Annual business expenses"
            min={0}
            onChange={(value) => setField("annualExpenses", value)}
            value={values.annualExpenses}
          />
          <RateField
            className={fieldClassName}
            hint="Planning estimate only; tax rules vary."
            label="Tax reserve"
            max={95}
            min={0}
            onChange={(value) => setField("taxPercent", value)}
            suffix="%"
            value={values.taxPercent}
          />
          <RateField
            className={fieldClassName}
            label="Hours worked per week"
            max={100}
            min={1}
            onChange={(value) => setField("hoursPerWeek", value)}
            required
            suffix="hrs"
            value={values.hoursPerWeek}
          />
          <RateField
            className={fieldClassName}
            hint="The share of work time clients can actually be billed for."
            label="Billable time"
            max={100}
            min={1}
            onChange={(value) => setField("billablePercent", value)}
            required
            suffix="%"
            value={values.billablePercent}
          />
          <RateField
            className={fieldClassName}
            label="Vacation weeks per year"
            max={51}
            min={0}
            onChange={(value) => setField("vacationWeeks", value)}
            suffix="weeks"
            value={values.vacationWeeks}
          />
          <RateField
            className={fieldClassName}
            label="Example project size"
            min={0}
            onChange={(value) => setField("projectHours", value)}
            suffix="hrs"
            value={values.projectHours}
          />
        </form>

        <div
          aria-live="polite"
        className="flex min-w-0 flex-col justify-between bg-[#173d32] p-5 text-white sm:p-7"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a9e5cc]">
              Your target hourly rate
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              {rateFormatter.format(results.hourlyRate)}
              <span className="ml-1 text-base font-medium tracking-normal text-white/55">
                / hour
              </span>
            </p>
            <p className="mt-3 text-sm leading-6 text-white/65">
              This rate funds your take-home goal, business costs, tax reserve,
              and planned time off.
            </p>

            <dl className="mt-7 space-y-3 border-y border-white/10 py-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/60">Annual revenue target</dt>
                <dd className="font-semibold">
                  {currencyFormatter.format(results.annualRevenueTarget)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/60">Monthly revenue target</dt>
                <dd className="font-semibold">
                  {currencyFormatter.format(results.monthlyRevenueTarget)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/60">Billable hours per week</dt>
                <dd className="font-semibold">
                  {results.weeklyBillableHours.toFixed(1)} hours
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-1.5 text-white/60">
                  <TrendingUp aria-hidden="true" className="size-3.5" />
                  {values.projectHours || "0"}-hour project floor
                </dt>
                <dd className="font-semibold">
                  {currencyFormatter.format(results.projectMinimum)}
                </dd>
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
              {copyStatus === "copied" ? (
                <Check aria-hidden="true" className="size-4" />
              ) : (
                <Clipboard aria-hidden="true" className="size-4" />
              )}
              {copyStatus === "copying"
                ? "Copying…"
                : copyStatus === "copied"
                  ? "Rate plan copied"
                  : "Copy rate plan"}
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

type RateFieldProps = {
  className: string;
  hint?: string;
  label: string;
  max?: number;
  min: number;
  onChange: (value: string) => void;
  required?: boolean;
  suffix?: string;
  value: string;
};

function RateField({
  className,
  hint,
  label,
  max,
  min,
  onChange,
  required,
  suffix,
  value,
}: RateFieldProps) {
  const inputId = useId();
  const helpId = `${inputId}-help`;
  const numericValue = Number(value);
  const isInvalid =
    (required && value === "") ||
    (value !== "" &&
      (!Number.isFinite(numericValue) ||
        numericValue < min ||
        (max !== undefined && numericValue > max)));
  const rangeMessage = max === undefined ? `${min} or more` : `${min} to ${max}`;

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
          max={max}
          min={min}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          step="any"
          type="number"
          value={value}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-[#7b837f] dark:text-white/50">
            {suffix}
          </span>
        ) : null}
      </span>
      {isInvalid ? (
        <span
          className="mt-1.5 block text-xs font-medium text-red-600 dark:text-red-400"
          id={helpId}
          role="alert"
        >
          Enter a number from {rangeMessage}.
        </span>
      ) : hint ? (
        <span
          className="mt-1.5 block text-xs font-normal text-[#7b837f] dark:text-white/50"
          id={helpId}
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
}
