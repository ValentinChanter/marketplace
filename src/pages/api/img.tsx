import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler( req) {
  try {
    const query = new URLSearchParams(new URL(req.url).search)
    
    // ?title=<title>
    const title = "Nook"
    // height
    const height =  query.has('h') ? +(query.get('h') as string) : 400
    // width
    const width =  query.has('w') ? +(query.get('w') as string) : 400
    console.log(width);
    
    // Generate an image 
    // https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation/og-image-examples#dynamic-text-generated-as-image
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="230" viewBox="0 0 326.24 311.07"><path fill="#535e79" d="M266.38 1.26c-.93 9.12-7.71 47.21-27.28 83.44a1 1 0 0 1-1.7-.06c-4-8.24-24.86-44.58-79.29-44.91C96.71 39.35 66.67 87 66.67 87s-23.45 32.93-33.49 94.89-22.61 79-22.61 79L.39 277a2.54 2.54 0 0 0 1.11 3.67c13 5.81 72.68 30.38 151.68 30.38 53.8 0 70-7.58 74.25-10.55a.61.61 0 0 0-.35-1.12c-10.55 1.16-51.2-5.26-51.2-44 0-34.79 25.3-51.62 51.81-52.83 12.56-.58 39.35 4.74 47.72 29.3 7 20.66-2.31 39.15-5.45 44.5a.62.62 0 0 0 .77.89c9.52-3.84 53.71-25.77 55.47-93.95 1.55-59.91-47.64-85.62-70.8-86.71a1.18 1.18 0 0 1-1-1.62c6.23-15.94 45-57.27 51.84-64.46a1.57 1.57 0 0 0 0-2.17A159.05 159.05 0 0 0 268.46.17a1.42 1.42 0 0 0-2.08 1.09Z"/></svg>
          </div>
          <div
            style={{
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "#e7a08c",
              marginTop: 30,
              padding: "0 120px",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width:  width ?? 400,
        height:  height ?? 400,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
