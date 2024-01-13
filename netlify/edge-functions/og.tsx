// @ts-ignore
import React from "https://esm.sh/react@18.2.0";
// @ts-ignore
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  const mediumFont = await (
    await fetch("https://alexnguyen.co.nz/fonts/DMSans-Medium.ttf")
  ).arrayBuffer();

  const semiBoldFont = await (
    await fetch("https://alexnguyen.co.nz/fonts/DMSans-SemiBold.ttf")
  ).arrayBuffer();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          background: "rgb(240,249,255)",
          fontWeight: "500",
          fontFamily: '"DMSansMedium"',
        }}
      >
        <p
          style={{
            fontWeight: "600",
            fontFamily: "DMSansSemiBold",
          }}
        >
          {title}
        </p>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
          }}
        >
          <img
            src="https://alexnguyen.co.nz/logo.png"
            width="96"
            alt="Alex Nguyen logo"
            style={{ marginRight: "1rem" }}
          />
          <p>alexnguyen.co.nz</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "DMSansMedium",
          data: mediumFont,
          style: "normal",
          weight: 500,
        },
        {
          name: "DMSansSemiBold",
          data: semiBoldFont,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
