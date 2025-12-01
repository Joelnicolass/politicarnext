import { ImageResponse } from "next/og";
import { headers } from "next/headers";

export const runtime = "edge";

export async function GET() {
  const headersList = await headers();
  const gameTitle = headersList.get("x-game-title") || "EL AJUSTE";

  // Colores según el juego
  const bgColor = "#991b1b";
  const accentColor = "#dc2626";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bgColor,
          background: `linear-gradient(135deg, ${bgColor} 0%, ${accentColor} 100%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
          }}
        >
          <h1
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: "white",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "-0.05em",
              textShadow: "0 10px 30px rgba(0,0,0,0.5)",
              marginBottom: 20,
            }}
          >
            {gameTitle}
          </h1>
          <p
            style={{
              fontSize: 40,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            El Juego de Cartas de la Política Argentina
          </p>
          <div
            style={{
              marginTop: 40,
              padding: "20px 40px",
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 50,
              fontSize: 32,
              color: "white",
              fontWeight: 600,
            }}
          >
            🎮 Juega Gratis Ahora
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
