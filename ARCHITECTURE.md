# El Modelo 2.0 🇦🇷

Un simulador de política argentina estilo Reigns.

## 📁 Arquitectura del Proyecto

```
src/
├── app/                    # Rutas de Next.js (App Router)
│   ├── page.tsx           # Menú principal (/)
│   ├── deck-selection/    # Selección de decks (/deck-selection)
│   └── game/              # Juego (/game)
│
├── screens/               # Componentes de pantalla completa
│   ├── MenuScreen.tsx     # Pantalla del menú principal
│   ├── DeckSelectionScreen.tsx  # Pantalla de selección de decks
│   └── GameScreen.tsx     # Pantalla del juego
│
├── components/            # Componentes reutilizables
│   ├── CardView.tsx       # Componente de carta (swipeable)
│   ├── GameOver.tsx       # Pantalla de game over
│   ├── ObjetivesItem.tsx  # Item de objetivo
│   ├── StatsBar.tsx       # Barra de estadísticas
│   └── index.ts           # Exports centralizados
│
├── hooks/                 # Custom React Hooks
│   ├── useGameStats.ts    # Maneja las estadísticas del juego
│   ├── useObjetives.ts    # Maneja los objetivos
│   ├── useEffectOnce.ts   # Hook para ejecutar efecto una sola vez
│   └── index.ts
│
├── services/              # Servicios de API y backend
│   ├── api.service.ts     # Servicio para comunicarse con el backend
│   └── index.ts
│
├── types/                 # Definiciones de TypeScript
│   ├── types.ts           # Tipos principales del juego
│   ├── deck.types.ts      # Tipos relacionados con decks
│   └── index.ts
│
├── constants/             # Datos estáticos y configuración
│   ├── cards.ts           # Cartas del juego
│   ├── characters.ts      # Personajes
│   ├── objetives.ts       # Pool de objetivos
│   └── index.ts
│
└── utils/                 # Funciones utilitarias
```

## 🎮 Características

- **Menú Principal**: Navegación intuitiva con animaciones
- **Selección de Decks**: Elige entre diferentes escenarios políticos obtenidos desde el backend
- **Juego Dinámico**: Sistema de cartas estilo Reigns con efectos y consecuencias
- **Backend Ready**: Integración lista con API para obtener decks dinámicos

## 🚀 Cómo usar

### Desarrollo

```bash
npm run dev
# o
pnpm dev
```

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🔌 Integración con Backend

El servicio `ApiService` maneja la comunicación con el backend:

```typescript
// Obtener todos los decks
const decks = await ApiService.getDecks();

// Obtener un deck específico
const deck = await ApiService.getDeckById("deck-id");
```

### Formato esperado del backend

**GET /api/decks**

```json
{
  "decks": [
    {
      "id": "deck-1",
      "name": "El Modelo 2.0",
      "description": "El deck clásico",
      "difficulty": "medium",
      "thumbnail": "🇦🇷",
      "cards": [...],
      "unlocked": true
    }
  ]
}
```

## 📦 Estructura de Datos

### Card

```typescript
interface CardData {
  id: number;
  speaker: string;
  text: string;
  left: Choice;
  right: Choice;
}
```

### Deck

```typescript
interface Deck {
  id: string;
  name: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  thumbnail: string;
  cards: CardData[];
  unlocked: boolean;
}
```

## 🎨 Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **Framer Motion** (Animaciones)
- **Tailwind CSS**
- **Lucide Icons**

## 📝 Próximas Features

- Sistema de logros
- Configuración de usuario
- Más decks temáticos
- Estadísticas globales
- Multiplayer?
