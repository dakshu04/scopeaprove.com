import { z } from "zod";

export const approvalDecisionSchema = z
  .object({
    decision: z.enum(["APPROVED", "DECLINED"], {
      message: "Choose approve or decline.",
    }),

    clientName: z
      .string()
      .trim()
      .min(1, "Your name is required.")
      .max(120, "Name must be 120 characters or fewer."),

    clientEmail: z
      .string()
      .trim()
      .email("Enter a valid email address.")
      .max(320, "Email must be 320 characters or fewer."),

    declineReason: z
      .string()
      .trim()
      .max(
        2000,
        "Decline reason must be 2,000 characters or fewer.",
      )
      .transform((value) => value || null),
  })
  .superRefine((value, context) => {
    if (
      value.decision === "DECLINED" &&
      !value.declineReason
    ) {
      context.addIssue({
        code: "custom",
        path: ["declineReason"],
        message: "Explain why you are declining this request.",
      });
    }
  });

export type ApprovalDecisionInput = z.infer<
  typeof approvalDecisionSchema
>;