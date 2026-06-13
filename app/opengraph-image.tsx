import { ImageResponse } from "next/og";

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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #1f2937 0%, #e63946 52%, #f4a261 100%)",
          padding: "56px",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "0.2em",
          }}
        >
          <span>paratha WALE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "76px", fontWeight: 800, lineHeight: 1.02 }}>
            Best paratha in Indore
          </div>
          <div style={{ fontSize: "34px", opacity: 0.92 }}>
            Fresh stuffed parathas, student thalis, and budget-friendly meals in
            Sudama Nagar.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "28px",
            opacity: 0.95,
          }}
        >
          <span>Near Lucky Bakery</span>
          <span>Pet bhar ke khao!</span>
        </div>
      </div>
    ),
    size,
  );
}
