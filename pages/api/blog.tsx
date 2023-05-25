import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const width = 1200;
const height = 630;
const logoRatio = 1660 / 587;

const Inter = fetch(new URL("../../assets/Inter-Regular.woff", import.meta.url)).then(
  (res) => res.arrayBuffer()
);
const InterBoldItalic = fetch(new URL("../../assets/Inter-BoldItalic.woff", import.meta.url)).then(
  (res) => res.arrayBuffer()
);
const RedHatDisplay = fetch(
  new URL("../../assets/RedHatDisplay-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const RedHatDisplayBold = fetch(
  new URL("../../assets/RedHatDisplay-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
// const TsimJ = fetch(new URL("../../public/TsimSans-J-Regular.otf", import.meta.url)).then((res) => res.arrayBuffer());
// const TsimJBold = fetch(new URL("../../public/TsimSans-J-Bold.otf", import.meta.url)).then((res) => res.arrayBuffer());
const TsimJ = fetch(new URL(`https://${process.env.VERCEL_URL}/TsimSans-J-Regular.otf`, import.meta.url)).then((res) => res.arrayBuffer());
const TsimJBold = fetch(new URL(`https://${process.env.VERCEL_URL}/TsimSans-J-Bold.otf`, import.meta.url)).then((res) => res.arrayBuffer());

const pattern = fetch(
  new URL("../../assets/blog-pattern.svg", import.meta.url)
).then((res) => res.arrayBuffer())
.then((buf) => Buffer.from(buf).toString("utf8"))
  .then((text) => encodeURIComponent(text));

const logo = fetch(
  new URL("../../assets/blog.svg", import.meta.url)
).then((res) => res.arrayBuffer())
.then((buf) => Buffer.from(buf).toString("utf8"))
  .then((text) => encodeURIComponent(text));

export default async function handler(req: NextRequest) {
  try {
    const InterData = await Inter;
    const InterBoldItalicData = await InterBoldItalic;
    const RedHatDisplayData = await RedHatDisplay;
    const RedHatDisplayBoldData = await RedHatDisplayBold;
    const TsimJData = await TsimJ;
    const TsimJBoldData = await TsimJBold;
    const patternData = await pattern;
    const logoData = await logo;

    const { searchParams } = new URL(req.url);

    const title = searchParams.has("title")
      ? searchParams.get("title")
      : "1A23 Studio";
    const desc = searchParams.has("desc") ? searchParams.get("desc") : null;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            backgroundColor: "#00161F",
            width: width,
            height: 630,
            color: "#fff",
            position: "relative",
            fontFeatureSettings: "'palt' 1",
          }}
        >
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: "0",
              right: "0",
              width: Math.round(width * 0.3),
              height: height,
              zIndex: "1",
              backgroundImage: `url(data:image/svg+xml,${patternData})`,
              backgroundRepeat: "repeat",
              backgroundSize: "100px 100px",
              backgroundPosition: "center",
            }}
          ></div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "absolute",
            top: "50px",
            left: "50px",
            bottom: "50px",
            width: Math.round((width - 100) * 0.675),
            gap: "24px",
          }}>
            <img
              src={`data:image/svg+xml,${logoData}`}
              height={75}
              width={Math.round(75 * logoRatio)}
            />
            <div style={{
              display: "flex", flexGrow: 1
            }}></div>
            <h1 style={{
              display: "block",
              fontSize: "60px",
              fontWeight: "bold",
              fontFamily: "'Red Hat Display', 'Tsim Sans J'",
              color: "#fff",
              lineHeight: 1.1,
              overflow: "hidden",
              margin: "10px 0",
              padding: "0",
              width: "100%",
              fontFeatureSettings: "'palt' 1",
              lineClamp: 3,
            }}>{title}</h1>
            {desc && <p style={{
              display: "block",
              fontSize: "20px",
              fontFamily: "Inter, 'Tsim Sans J'",
              lineHeight: 1.5,
              overflow: "hidden",
              margin: "0",
              padding: "0",
              width: "100%",
              lineClamp: 2,
            }}>{desc}</p>}
          </div>
        </div>
      ),
      {
        width: width,
        height: height,
        // debug: true,
        fonts: [
          {
            name: "Inter",
            data: InterData,
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: InterBoldItalicData,
            weight: 700,
            style: "italic",
          },
          {
            name: "Red Hat Display",
            data: RedHatDisplayData,
            style: "normal",
          },
          {
            name: "Red Hat Display",
            data: RedHatDisplayBoldData,
            weight: 700,
            style: "normal",
          },
          {
            name: "Tsim Sans J",
            data: TsimJData,
            style: "normal",
            weight: 400,
          },
          {
            name: "Tsim Sans J",
            data: TsimJBoldData,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
