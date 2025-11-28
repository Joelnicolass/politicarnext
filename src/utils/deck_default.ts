import { CardData, Character, Objective } from "@/types";

export const DEFAULT_CHARACTERS: Record<string, Character> = {
  min: { id: "min", name: 'MINISTRO "TOTO" CAPUTO', icon: "briefcase" },
  syn: { id: "syn", name: "EL GORDO DEL BOMBO", icon: "megaphone" },
  fmi: { id: "fmi", name: "COMITIVA DEL FMI", icon: "dollar-sign" },
  gen: { id: "gen", name: 'PATRICIA "LA MANO DURA"', icon: "shield" },
  pue: { id: "pue", name: "DOÑA ROSA", icon: "users" },
  med: { id: "med", name: "OPERADOR MEDIÁTICO", icon: "tv" },
};

export const DEFAULT_OBJECTIVES: Omit<Objective, "completed">[] = [
  {
    id: "libertad",
    description: "Aplicar la Motosierra",
    requiredTag: "Motosierra",
  },
  {
    id: "populismo",
    description: "Contentar al Pueblo",
    requiredTag: "Populismo",
  },
  {
    id: "represion",
    description: "Mano Dura en la Calle",
    requiredTag: "Represion",
  },
  { id: "deuda", description: "Endeudarse (otra vez)", requiredTag: "Deuda" },
  { id: "circo", description: "Pan y Circo", requiredTag: "Circo" },
  {
    id: "impunidad",
    description: "Tapar Escándalos",
    requiredTag: "Impunidad",
  },
];

export const DEFAULT_CARDS: CardData[] = [
  {
    id: 1,
    speaker: "min",
    text: "La maquinita de billetes se recalentó y largó humo. ¿Qué hacemos con el déficit?",
    left: {
      text: "¡Plan Platita!",
      effect: [15, -10, 0, 5],
      statusEffect: {
        name: "Inflación",
        stat: 1,
        val: -5,
        duration: 4,
        type: "bad",
      },
      tags: ["Populismo"],
    },
    right: {
      text: "Motosierra Total",
      effect: [-20, 10, -5, -10],
      statusEffect: {
        name: "Recesión",
        stat: 0,
        val: -3,
        duration: 3,
        type: "bad",
      },
      tags: ["Motosierra"],
    },
  },
  {
    id: 2,
    speaker: "syn",
    text: "¡Compañero! El precio del asado se fue a las nubes. O hay aumento o hay quilombo.",
    left: {
      text: "Paritaria del 200%",
      effect: [10, -15, 5, 20],
      statusEffect: {
        name: "Paz Social",
        stat: 2,
        val: 3,
        duration: 3,
        type: "good",
      },
      tags: ["Populismo"],
    },
    right: {
      text: "Palo y Gas Pimienta",
      effect: [-10, 5, 10, -25],
      statusEffect: {
        name: "Paro General",
        stat: 1,
        val: -5,
        duration: 3,
        type: "bad",
      },
      tags: ["Represion"],
    },
  },
  {
    id: 3,
    speaker: "fmi",
    text: "Hello mister President. Se vence la cuota. Necesitamos 'cash' o embargamos la Fragata.",
    left: {
      text: "Pagar con ahorros",
      effect: [-5, -30, 0, 0],
      tags: ["Deuda"],
    },
    right: {
      text: "Defaultear con épica",
      effect: [10, 5, -10, -5],
      statusEffect: {
        name: "Riesgo País",
        stat: 1,
        val: -4,
        duration: 5,
        type: "bad",
      },
      tags: ["Populismo"],
    },
  },
  {
    id: 4,
    speaker: "pue",
    text: "Hay rumores de saqueos en el conurbano porque subió el precio de la Manaos.",
    left: {
      text: "Repartir bolsones",
      effect: [10, -10, 5, 0],
      tags: ["Populismo"],
    },
    right: {
      text: "Culpar a la oposición",
      effect: [-5, 0, -10, -5],
      tags: ["Impunidad"],
    },
  },
  {
    id: 5,
    speaker: "med",
    text: "Encontraron bolsos con dólares en el convento de una monja. ¿Tapamos o destapamos?",
    left: {
      text: "Cadena Nacional",
      effect: [-10, -2, 5, 0],
      tags: ["Impunidad"],
    },
    right: {
      text: "Show Mediático",
      effect: [5, 0, -5, -5],
      statusEffect: {
        name: "Indignación TV",
        stat: 2,
        val: -3,
        duration: 2,
        type: "bad",
      },
      tags: ["Circo"],
    },
  },
  {
    id: 6,
    speaker: "min",
    text: "Necesitamos dólares ya. ¿Le pedimos a China o hacemos un blanqueo para narcos?",
    left: {
      text: "Swap Chino",
      effect: [0, 15, 0, 0],
      statusEffect: {
        name: "Deuda en Yuanes",
        stat: 1,
        val: -3,
        duration: 4,
        type: "bad",
      },
      tags: ["Deuda"],
    },
    right: {
      text: "Blanqueo Falopa",
      effect: [-5, 20, -15, 0],
      tags: ["Impunidad"],
    },
  },
  {
    id: 7,
    speaker: "gen",
    text: "Los piqueteros cortaron la 9 de Julio y están haciendo un asado en el Metrobús.",
    left: {
      text: "Unirse al asado",
      effect: [15, -5, -20, 10],
      tags: ["Populismo"],
    },
    right: {
      text: "Protocolo Anti-Piquete",
      effect: [-10, 0, 20, -15],
      statusEffect: {
        name: "Calles Libres",
        stat: 2,
        val: 2,
        duration: 3,
        type: "good",
      },
      tags: ["Represion"],
    },
  },
  {
    id: 8,
    speaker: "pue",
    text: "¡ARGENTINA CAMPEÓN DEL MUNDO! ¡MUCHAAAACHOOOS!",
    left: {
      text: "Feriado Eterno",
      effect: [25, -10, -5, 10],
      statusEffect: {
        name: "Resaca Mundial",
        stat: 1,
        val: -5,
        duration: 2,
        type: "bad",
      },
      tags: ["Circo"],
    },
    right: {
      text: "Foto con la copa",
      effect: [10, 0, 0, 0],
      tags: ["Circo"],
    },
  },
  {
    id: 9,
    speaker: "syn",
    text: "Queremos que el día de San Perón sea feriado puente turístico no laborable pago.",
    left: {
      text: "¡Aprobado!",
      effect: [5, -5, 0, 15],
      statusEffect: {
        name: "Baja Productividad",
        stat: 1,
        val: -2,
        duration: 4,
        type: "bad",
      },
      tags: ["Populismo"],
    },
    right: {
      text: "¡A laburar!",
      effect: [-5, 5, 0, -15],
      tags: ["Motosierra"],
    },
  },
  {
    id: 10,
    speaker: "min",
    text: "El campo no liquida la soja. Están sentados en los silobolsas esperando que devalúes.",
    left: {
      text: "Dólar Soja",
      effect: [0, 15, -5, 0],
      statusEffect: {
        name: "Emisión Futura",
        stat: 1,
        val: -2,
        duration: 5,
        type: "bad",
      },
      tags: ["Deuda"],
    },
    right: {
      text: "Expropiación",
      effect: [5, -10, -15, 5],
      tags: ["Motosierra"],
    },
  },
];
