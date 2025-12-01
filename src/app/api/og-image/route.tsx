import { ImageResponse } from "next/og";
import { headers } from "next/headers";

export const runtime = "edge";

export async function GET() {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  // Determinar el título basado en el host directamente
  const gameTitle = host.includes("choriplan") ? "CHORIPLAN" : "EL AJUSTE";

  // Cargar la fuente desde la URL pública del servidor
  const protocol = host.includes("localhost") ? "http" : "https";
  const fontUrl = `${protocol}://${host}/fonts/BlackOpsOne-Regular.woff`;

  const fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());

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
          backgroundColor: "#000",
          backgroundImage: `radial-gradient(circle at 25% 25%, ${bgColor}22 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, ${accentColor}22 0%, transparent 50%)`,
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
          <div
            style={{
              fontSize: 60,
              fontFamily: '"Black Ops One"',
              color: "rgba(255,255,255,0.8)",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Gobernar es complicado...
          </div>
          <h1
            style={{
              fontSize: 140,
              fontWeight: 900,
              fontFamily: '"Black Ops One"',
              color: accentColor,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "-0.05em",
              textShadow: `0 0 40px ${bgColor}88, 0 10px 30px rgba(0,0,0,0.8)`,
              marginBottom: 30,
              marginTop: 0,
            }}
          >
            {gameTitle}
          </h1>
          <p
            style={{
              fontSize: 36,
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
              backgroundColor: accentColor,
              borderRadius: 50,
              fontSize: 32,
              color: "white",
              fontWeight: 600,
              fontFamily: '"Black Ops One"',
              boxShadow: `0 10px 40px ${bgColor}88`,
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
      fonts: [
        {
          name: "Black Ops One",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
