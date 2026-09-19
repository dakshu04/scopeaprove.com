import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Project name is required.")
    .max(100, "Project name must be 100 characters or fewer."),

  clientName: z
    .string()
    .trim()
    .max(120, "Client name must be 120 characters or fewer.")
    .transform((value) => value || null),

  clientEmail: z
    .union([
      z.literal(""),
      z
        .string()
        .trim()
        .email("Enter a valid client email.")
        .max(320, "Client email must be 320 characters or fewer."),
    ])
    .transform((value) => value || null),

  description: z
    .string()
    .trim()
    .max(2000, "Description must be 2,000 characters or fewer.")
    .transform((value) => value || null),

  scopeItems: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Every scope item must have a title.")
        .max(160, "Each scope item must be 160 characters or fewer."),
    )
    .min(1, "Add at least one scope item.")
    .max(20, "A project can have at most 20 initial scope items."),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;