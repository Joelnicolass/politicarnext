export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function getWebsiteSchema(url: string, gameTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: gameTitle,
    description: `${gameTitle}: Juego de cartas interactivo sobre política argentina`,
    url: url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/deck-selection?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "es-AR",
  };
}

export function getGameSchema(url: string, gameTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Game",
    name: `${gameTitle} - El Juego de la Política Argentina`,
    description: `${gameTitle}: Juego de cartas interactivo sobre política argentina. Toma decisiones, maneja recursos y enfrenta crisis políticas.`,
    url: url,
    genre: ["Strategy", "Card Game", "Political Simulation"],
    gamePlatform: ["Web Browser"],
    playMode: "SinglePlayer",
    applicationCategory: "Game",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    inLanguage: "es-AR",
    audience: {
      "@type": "Audience",
      geographicArea: {
        "@type": "Country",
        name: "Argentina",
      },
    },
  };
}
