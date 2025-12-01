import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();
  const gameTitle = headersList.get("x-game-title") || "EL AJUSTE";

  const manifest = {
    name: `${gameTitle} - El Juego de la Política Argentina`,
    short_name: gameTitle,
    description: `${gameTitle}: Juego de cartas interactivo sobre política argentina`,
    start_url: "/",
    display: "standalone",
    background_color: "#161616",
    theme_color: "#161616",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "any maskable",
      },
      {
        src: "/icon-512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any maskable",
      },
    ],
    categories: ["games", "entertainment"],
    lang: "es-AR",
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
