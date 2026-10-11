import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/siteConfig";

export const toolSocialImageSize = {
  height: 630,
  width: 1200,
};

type ToolSocialImageInput = {
  eyebrow: string;
  subtitle: string;
  title: string;
};

export function createToolSocialImage({
  eyebrow,
  subtitle,
  title,
}: ToolSocialImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f8f8f4",
          color: "#18231f",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "68px 76px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#d9f0e6",
            borderRadius: "999px",
            height: "470px",
            position: "absolute",
            right: "-105px",
            top: "-170px",
            width: "470px",
          }}
        />
        <div
          style={{
            background: "#173d32",
            borderRadius: "38px",
            bottom: "54px",
            height: "170px",
            position: "absolute",
            right: "72px",
            transform: "rotate(-3deg)",
            width: "320px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "1048px",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              fontSize: "24px",
              fontWeight: 700,
              gap: "14px",
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: "#176b55",
                borderRadius: "14px",
                color: "white",
                display: "flex",
                fontSize: "27px",
                height: "54px",
                justifyContent: "center",
                width: "54px",
              }}
            >
              S
            </div>
            {siteConfig.name}
          </div>

          <div
            style={{
              color: "#176b55",
              display: "flex",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "2px",
              marginTop: "54px",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "68px",
              fontWeight: 700,
              letterSpacing: "-3px",
              lineHeight: 1.02,
              marginTop: "18px",
              maxWidth: "850px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "#5f6a65",
              display: "flex",
              fontSize: "25px",
              lineHeight: 1.35,
              marginTop: "26px",
              maxWidth: "760px",
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    toolSocialImageSize,
  );
}
