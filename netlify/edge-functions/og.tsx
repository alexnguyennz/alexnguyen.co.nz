import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";

const fontRegular = fetch(
  `http://localhost:8888/fonts/DMSans-Regular.ttf`,
).then((res) => res.arrayBuffer());

const fontMedium = fetch(`http://localhost:8888/fonts/DMSans-Medium.ttf`).then(
  (res) => res.arrayBuffer(),
);

const fontSemiBold = fetch(
  `http://localhost:8888/fonts/DMSans-SemiBold.ttf`,
).then((res) => res.arrayBuffer());

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  const fontDataRegular = await fontRegular;
  const fontDataMedium = await fontMedium;
  const fontDataSemiBold = await fontSemiBold;

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
          padding: "0 200px",
          fontFamily: '"DM Sans"',
        }}
      >
        {title}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://alexnguyen.co.nz/logo.png"
            width="128"
            alt="Alex Nguyen logo"
          />
          <p>alexnguyen.co.nz</p>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: "DMSans",
          data: fontDataRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "DMSansMedium",
          data: fontDataMedium,
          style: "normal",
          weight: 500,
        },
        {
          name: "DMSansSemiBold",
          data: fontDataSemiBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
