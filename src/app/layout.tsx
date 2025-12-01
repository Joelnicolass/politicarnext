import type { Metadata } from "next";
import {
  Black_Ops_One,
  Share_Tech_Mono,
  Special_Elite,
} from "next/font/google";
import "./globals.css";
import RootProvider from "@/providers/root_provider";
import { getServerTitle, getServerUrl } from "@/utils/server.utils";

const blackOpsOne = Black_Ops_One({
  weight: "400",
  variable: "--font-propaganda",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-tech",
  subsets: ["latin"],
});

const specialElite = Special_Elite({
  weight: "400",
  variable: "--font-typewriter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const gameTitle = await getServerTitle();
  const siteUrl = await getServerUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${gameTitle} - El Juego de Cartas de la Política Argentina`,
      template: `%s | ${gameTitle}`,
    },
    description: `${gameTitle}: Juego de cartas interactivo sobre política argentina. Toma decisiones, maneja recursos y enfrenta crisis políticas. Juega con diferentes mazos históricos de la política argentina.`,
    keywords: [
      "juego político",
      "política argentina",
      "juego de cartas",
      "simulador político",
      "Argentina",
      "juego online",
      "juego gratis",
      gameTitle,
    ],
    authors: [{ name: gameTitle }],
    creator: gameTitle,
    publisher: gameTitle,
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: siteUrl,
      siteName: gameTitle,
      title: `${gameTitle} - El Juego de Cartas de la Política Argentina`,
      description: `${gameTitle}: Juego de cartas interactivo sobre política argentina. Toma decisiones, maneja recursos y enfrenta crisis políticas.`,
      images: [
        {
          url: "/api/og-image",
          width: 1200,
          height: 630,
          alt: `${gameTitle} - Juego de Política Argentina`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${gameTitle} - El Juego de Cartas de la Política Argentina`,
      description: `${gameTitle}: Juego de cartas interactivo sobre política argentina. Toma decisiones, maneja recursos y enfrenta crisis políticas.`,
      images: ["/api/og-image"],
      creator: `@${gameTitle.toLowerCase()}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Agrega aquí tus códigos de verificación cuando los tengas
      // google: "tu-codigo-google",
      // yandex: "tu-codigo-yandex",
    },
    alternates: {
      canonical: siteUrl,
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/api/manifest",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${blackOpsOne.variable} ${shareTechMono.variable} ${specialElite.variable} antialiased`}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
