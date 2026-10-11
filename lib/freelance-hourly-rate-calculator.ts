export type FreelanceRateInputs = {
  annualExpenses: number;
  billablePercent: number;
  desiredTakeHome: number;
  hoursPerWeek: number;
  projectHours: number;
  taxPercent: number;
  vacationWeeks: number;
};

export type FreelanceRateResults = {
  annualBillableHours: number;
  annualRevenueTarget: number;
  hourlyRate: number;
  monthlyRevenueTarget: number;
  projectMinimum: number;
  weeklyBillableHours: number;
};

export function calculateFreelanceRate(inputs: FreelanceRateInputs): FreelanceRateResults {
  const workingWeeks = Math.max(1, 52 - inputs.vacationWeeks);
  const taxMultiplier = Math.max(0.05, 1 - inputs.taxPercent / 100);
  const billableMultiplier = Math.max(0.01, inputs.billablePercent / 100);
  const annualRevenueTarget = inputs.annualExpenses + inputs.desiredTakeHome / taxMultiplier;
  const weeklyBillableHours = inputs.hoursPerWeek * billableMultiplier;
  const annualBillableHours = workingWeeks * weeklyBillableHours;
  const hourlyRate = annualBillableHours > 0 ? annualRevenueTarget / annualBillableHours : 0;

  return {
    annualBillableHours,
    annualRevenueTarget,
    hourlyRate,
    monthlyRevenueTarget: annualRevenueTarget / 12,
    projectMinimum: hourlyRate * inputs.projectHours,
    weeklyBillableHours,
  };
}
