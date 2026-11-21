import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Gannavarapu Venkata Sai Yashwant | Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#090d16",
          color: "#f8fafc",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#60a5fa",
            fontSize: "24px",
            fontFamily: "monospace",
          }}
        >
          <span>SOFTWARE ENGINEER · FULL-STACK &amp; AWS</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: "58px", fontWeight: 700, lineHeight: 1.1 }}>
            Gannavarapu Venkata Sai Yashwant
          </div>
          <div style={{ fontSize: "28px", color: "#94a3b8", maxWidth: "920px" }}>
            React · TypeScript · Node.js · Java · MongoDB · AWS
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#cbd5e1",
            borderTop: "1px solid #1e293b",
            paddingTop: "24px",
          }}
        >
          <span>Hyderabad, India</span>
          <span>gvsyashwant@gmail.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
