import {
  createToolSocialImage,
  toolSocialImageSize,
} from "@/lib/tool-social-image";

export const alt = "Free scope creep cost calculator from ScopeYes";
export const size = toolSocialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createToolSocialImage({
    eyebrow: "Free calculator",
    title: "Stop letting extra work erase your margin.",
    subtitle:
      "Price scope creep, rush work, and delivery delays before the work begins.",
  });
}
