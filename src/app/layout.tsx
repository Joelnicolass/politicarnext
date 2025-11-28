import type { Metadata } from "next";
import {
  Black_Ops_One,
  Share_Tech_Mono,
  Special_Elite,
} from "next/font/google";
import "./globals.css";
import RootProvider from "@/providers/RootProvider";

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

export const metadata: Metadata = {
  title: "Politicar - El Juego de la Política Argentina",
  description: "Un juego de cartas sobre política argentina",
};

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
