import {
  createToolSocialImage,
  toolSocialImageSize,
} from "@/lib/tool-social-image";

export const alt =
  "Free freelance hourly rate calculator from ScopeYes";
export const size = toolSocialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createToolSocialImage({
    eyebrow: "Free calculator",
    title: "What should your freelance hourly rate be?",
    subtitle:
      "Build taxes, expenses, time off, and non-billable work into one sustainable rate.",
  });
}
