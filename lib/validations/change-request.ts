import { z } from "zod";

const supportedCurrencies = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "AUD",
  "CAD",
] as const;

function convertAmountToCents(value: string) {
  const [whole, fraction = ""] = value.split(".");

  return (
    Number(whole) * 100 +
    Number(fraction.padEnd(2, "0"))
  );
}

export const createChangeRequestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Change request title is required.")
    .max(160, "Title must be 160 characters or fewer."),

  description: z
    .string()
    .trim()
    .min(1, "Describe the requested change.")
    .max(10_000, "Description must be 10,000 characters or fewer."),

  amount: z
    .string()
    .trim()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Enter a valid amount with no more than two decimal places.",
    )
    .transform(convertAmountToCents)
    .pipe(
      z
        .number()
        .int()
        .min(1, "Amount must be greater than zero.")
        .max(2_147_483_647, "Amount is too large."),
    ),

  currency: z.enum(supportedCurrencies, {
    message: "Select a supported currency.",
  }),

  additionalDays: z
    .union([
      z.literal(""),
      z.coerce
        .number()
        .int("Additional days must be a whole number.")
        .min(0, "Additional days cannot be negative.")
        .max(365, "Additional days cannot exceed 365."),
    ])
    .transform((value) => value === "" ? null : value),

  newDeliveryDate: z
    .union([
      z.literal(""),
      z
        .string()
        .regex(
          /^\d{4}-\d{2}-\d{2}$/,
          "Enter a valid delivery date.",
        ),
    ])
    .transform((value) =>
      value === ""
        ? null
        : new Date(`${value}T00:00:00.000Z`),
    ),
});

export type CreateChangeRequestInput = z.infer<
  typeof createChangeRequestSchema
>;