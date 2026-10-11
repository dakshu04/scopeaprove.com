import assert from "node:assert/strict";
import test from "node:test";

import { calculateFreelanceRate } from "../lib/freelance-hourly-rate-calculator";

test("calculates a sustainable rate from take-home income and realistic billable hours", () => {
  const result = calculateFreelanceRate({
    annualExpenses: 12_000,
    billablePercent: 60,
    desiredTakeHome: 60_000,
    hoursPerWeek: 40,
    projectHours: 20,
    taxPercent: 25,
    vacationWeeks: 4,
  });

  assert.equal(result.annualRevenueTarget, 92_000);
  assert.equal(result.annualBillableHours, 1_152);
  assert.equal(result.weeklyBillableHours, 24);
  assert.ok(Math.abs(result.hourlyRate - 79.861111) < 0.000001);
  assert.ok(Math.abs(result.projectMinimum - 1_597.222222) < 0.000001);
});

test("uses all working hours when billable time is one hundred percent", () => {
  const result = calculateFreelanceRate({
    annualExpenses: 0,
    billablePercent: 100,
    desiredTakeHome: 60_000,
    hoursPerWeek: 40,
    projectHours: 10,
    taxPercent: 0,
    vacationWeeks: 0,
  });

  assert.equal(result.annualRevenueTarget, 60_000);
  assert.equal(result.annualBillableHours, 2_080);
  assert.ok(Math.abs(result.hourlyRate - 28.846153846) < 0.000001);
});

test("returns finite values for empty-form boundary values", () => {
  const result = calculateFreelanceRate({
    annualExpenses: 0,
    billablePercent: 0,
    desiredTakeHome: 0,
    hoursPerWeek: 0,
    projectHours: 0,
    taxPercent: 100,
    vacationWeeks: 52,
  });

  for (const value of Object.values(result)) {
    assert.equal(Number.isFinite(value), true);
  }
});
