import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/siteConfig";

export const socialImageAlt =
  "ScopeYes client approval and scope change software for freelancers";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f8f8f4",
          color: "#1b1c18",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#dceee6",
            borderRadius: "999px",
            filter: "blur(2px)",
            height: "460px",
            position: "absolute",
            right: "-120px",
            top: "-170px",
            width: "460px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "1040px",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              fontSize: "28px",
              fontWeight: 700,
              gap: "18px",
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: "#176b55",
                borderRadius: "16px",
                color: "white",
                display: "flex",
                fontSize: "32px",
                height: "64px",
                justifyContent: "center",
                width: "64px",
              }}
            >
              S
            </div>
            {siteConfig.name}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "72px",
              fontWeight: 700,
              letterSpacing: "-3px",
              lineHeight: 1.04,
              marginTop: "58px",
              maxWidth: "900px",
            }}
          >
            Stop doing extra work for free.
          </div>

          <div
            style={{
              color: "#5f625c",
              display: "flex",
              fontSize: "28px",
              lineHeight: 1.35,
              marginTop: "34px",
              maxWidth: "950px",
            }}
          >
            Document scope changes, show the project impact, and collect a
            client decision before work begins.
          </div>

          <div
            style={{
              color: "#176b55",
              display: "flex",
              fontSize: "22px",
              fontWeight: 700,
              marginTop: "52px",
            }}
          >
            scopeyes.com
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
