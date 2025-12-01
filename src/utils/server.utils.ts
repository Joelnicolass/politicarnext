import { headers } from "next/headers";

const URL_EL_AJUSTE = "elajuste.com.ar";
const URL_CHORIPLAN = "choriplan.com.ar";

export async function getServerTitle(): Promise<string> {
  const headersList = await headers();

  // Siempre leer el host primero para asegurar detección correcta
  const host = headersList.get("host") || "";

  // Determinar el título basado en el host
  const titleFromHost = getTitleByHost(host);

  // Los headers personalizados del middleware son un backup
  const gameTitle = headersList.get("x-game-title");

  // Si el middleware configuró un título, usarlo, sino usar el del host
  return gameTitle || titleFromHost;
}

export async function getServerUrl(): Promise<string> {
  const headersList = await headers();

  // Intentar primero leer del header personalizado del middleware
  const siteUrl = headersList.get("x-site-url");
  if (siteUrl) return siteUrl;

  // Fallback: construir desde host
  const host = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  return `${protocol}://${host}`;
}

export async function getServerHost(): Promise<string> {
  const headersList = await headers();
  return headersList.get("host") || "";
}

export function getTitleByHost(host: string): string {
  if (host.includes(URL_CHORIPLAN)) {
    return "CHORIPLAN";
  }

  if (host.includes(URL_EL_AJUSTE)) {
    return "EL AJUSTE";
  }

  return "EL AJUSTE";
}
