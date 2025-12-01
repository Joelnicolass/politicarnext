"use client";

import MenuScreen from "@/screens/menu_screen";
import { JsonLd, getWebsiteSchema, getGameSchema } from "@/components";
import { getTitle } from "@/utils/dev.utils";

export default function Page() {
  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "https://elajuste.com.ar";
  const gameTitle = getTitle() || "EL AJUSTE";

  return (
    <>
      <JsonLd data={getWebsiteSchema(siteUrl, gameTitle)} />
      <JsonLd data={getGameSchema(siteUrl, gameTitle)} />
      <MenuScreen />
    </>
  );
}
