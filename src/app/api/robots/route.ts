import { NextResponse } from "next/server";
import { getServerUrl } from "@/utils/server.utils";

export async function GET() {
  const siteUrl = await getServerUrl();

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /game-imported

Sitemap: ${siteUrl}/sitemap.xml`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
