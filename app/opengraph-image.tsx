import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Noë Kaas - Nederlandse Kaasgroothandel"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1e3a5f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 80,
            color: "#f5f1e8",
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Noë Kaas
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#d4a574",
          }}
        >
          Nederlandse Kaasgroothandel
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

