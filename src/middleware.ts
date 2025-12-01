import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const URL_EL_AJUSTE = "elajuste.com.ar";
const URL_CHORIPLAN = "choriplan.com.ar";

function getGameTitleFromHost(host: string): string {
  if (host.includes(URL_CHORIPLAN)) {
    return "CHORIPLAN";
  }
  if (host.includes(URL_EL_AJUSTE)) {
    return "EL AJUSTE";
  }
  return "EL AJUSTE";
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const gameTitle = getGameTitleFromHost(host);
  const protocol = host.includes("localhost") ? "http" : "https";
  const siteUrl = `${protocol}://${host}`;

  // Crear response con headers personalizados
  const response = NextResponse.next();
  
  // Agregar headers personalizados que podemos leer en las APIs y páginas
  response.headers.set("x-game-title", gameTitle);
  response.headers.set("x-site-url", siteUrl);

  return response;
}

// Aplicar middleware a todas las rutas
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
