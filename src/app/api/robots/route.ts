import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();
  const siteUrl = headersList.get("x-site-url") || "http://localhost:3000";

  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /api/
Disallow: /game-imported

# Sitemap dinámico según dominio
Sitemap: ${siteUrl}/sitemap.xml`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
