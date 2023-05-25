import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const width = 1200;
const height = 630;
const logoRatio = 468.7 / 215.63;

const Inter = fetch(new URL("../../assets/Inter-Regular.otf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);
const InterBold = fetch(new URL("../../assets/Inter-Bold.otf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);
// const TsimJ = fetch(new URL("../../public/TsimSans-J-Regular.otf", import.meta.url)).then((res) => res.arrayBuffer());
// const TsimJBold = fetch(new URL("../../public/TsimSans-J-Bold.otf", import.meta.url)).then((res) => res.arrayBuffer());
const TsimJ = fetch(new URL(`https://${process.env.VERCEL_URL}/TsimSans-J-Regular.otf`, import.meta.url)).then((res) => res.arrayBuffer());
const TsimJBold = fetch(new URL(`https://${process.env.VERCEL_URL}/TsimSans-J-Bold.otf`, import.meta.url)).then((res) => res.arrayBuffer());

const logo = fetch(
  new URL("../../assets/sekai.svg", import.meta.url)
).then((res) => res.arrayBuffer())
.then((buf) => Buffer.from(buf).toString("utf8"))
  .then((text) => encodeURIComponent(text));

export default async function handler(req: NextRequest) {
  try {
    const InterData = await Inter;
    const InterBoldData = await InterBold;
    const TsimJData = await TsimJ;
    const TsimJBoldData = await TsimJBold;
    const logoData = await logo;

    const { searchParams } = new URL(req.url);

    // ?title=<title>&desc=<desc>&authors=<author>
    const title = searchParams.has("title")
      ? searchParams.get("title")
      : "1A23 Studio";
    const desc = searchParams.has("desc") ? searchParams.get("desc") : null;
    const authors = searchParams.has("authors") ? searchParams.get("authors") : null;

    return new ImageResponse(
      (<div style={{
        display: "flex",
        // backgroundImage: `url('http://127.0.0.1:3000/sekai-bg.jpg')`,
        backgroundImage: `url(https://${process.env.VERCEL_URL}/sekai-bg.jpg)`,
        // backgroundImage: `url(https://sns.sega.jp/sp/telework/telework-wp_sekai_06.jpg)`,
        // backgroundImage: `url('data:image/jpeg;base64,${sekaiBgData}')`,
        color: "rgb(23, 23, 23)",
        position: "relative",
        width: width,
        height: height,
        fontFamily: "Inter, 'Tsim Sans J'",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "5",
          position: "absolute",
          top: "50px",
          bottom: "125px",
          left: "100px",
          right: "100px",
          gap: "24px",
        }}>
          {authors && <small style={{
            display: "block",
            lineClamp: 1,
            fontSize: "24px",
            maxWidth: "100%",
            fontWeight: "600",
            color: "#0069A5",
            textAlign: "center",
            filter: "drop-shadow(0 0 3px white) drop-shadow(0 0 3px white) drop-shadow(0 0 3px white)",
          }}>{authors}</small>}
          <h1 style={{
            display: "block",
            fontSize: "60px",
            fontWeight: "bold",
            maxWidth: "100%",
            lineHeight: 1.1,
            maxHeight: 60 * 1.3 * 3,
            overflow: "hidden",
            textAlign: "center",
            backgroundImage: "linear-gradient(to bottom, #0069A5, #003D6B)",
            backgroundClip: "text",
            color: "transparent",
            padding: "5px",
            margin: "0",
            filter: "drop-shadow(0 0 3px white) drop-shadow(0 0 3px white) drop-shadow(0 0 3px white)",
            lineClamp: 3,
          }}>{title}</h1>
          {desc && <p style={{
            display: "block",
            fontSize: "20px",
            maxWidth: "100%",
            lineHeight: 1.5,
            maxHeight: 20 * 1.7 * 2,
            overflow: "hidden",
            textAlign: "center",
            margin: "0",
            filter: "drop-shadow(0 0 3px white) drop-shadow(0 0 3px white) drop-shadow(0 0 3px white)",
            lineClamp: 2,
          }}>{desc}</p>}
        </div>
        <img src={`data:image/svg+xml,${logoData}`} height={100} width={Math.round(100 * logoRatio)} style={{
          position: "absolute",
          bottom: "50px",
          left: (width - (100 * logoRatio)) / 2,
          margin: "0 auto",
        }} />
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
            data: InterBoldData,
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
