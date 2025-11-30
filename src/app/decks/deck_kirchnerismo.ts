// ==========================================
// DECK: LA DÉCADA GANADA (CFK & EL RELATO)
// ==========================================

import { CardData, Character, Objective } from "@/types";

// --- PERSONAJES (El Universo K) ---
export const CFK_CHARACTERS: Record<string, Character> = {
  jefa: { id: "jefa", name: "LA ARQUITECTA EGIPCIA", icon: "crown" }, // CFK
  kichi: { id: "kichi", name: "EL CHIQUITO ECONOMISTA", icon: "calculator" }, // Kicillof
  moreno: { id: "moreno", name: "EL SECRETARIO CON FIERRO", icon: "fist" }, // Moreno
  pibe: { id: "pibe", name: "PIBE DE LA CÁMPORA", icon: "flag" }, // La Cámpora
  magnetto: {
    id: "magnetto",
    name: "EL ENEMIGO HEGEMÓNICO",
    icon: "newspaper",
  }, // Clarín/Medios
  juez: { id: "juez", name: "PARTIDO JUDICIAL", icon: "scale" }, // La Justicia/Bonadio
  indec: { id: "indec", name: "EL DIBUJANTE DEL INDEC", icon: "pencil" }, // Estadísticas
};

// --- OBJETIVOS (El Relato) ---
export const CFK_OBJECTIVES_POOL: Omit<Objective, "completed">[] = [
  {
    id: "obj_todo",
    description: "Ir por Todo (Control Total)",
    requiredTag: "VamosPorTodo",
  },
  {
    id: "obj_clarin",
    description: "Destruir al Grupo Hegemónico",
    requiredTag: "LeyDeMedios",
  },
  {
    id: "obj_alemania",
    description: "Tener menos pobres que Alemania",
    requiredTag: "Relato",
  },
  {
    id: "obj_cadena",
    description: "Hablar 4 horas seguidas en Cadena Nacional",
    requiredTag: "CadenaNacional",
  },
  {
    id: "obj_lawfare",
    description: "Sobrevivir al Lawfare (Causas Judiciales)",
    requiredTag: "Impunity",
  },
  {
    id: "obj_cepo",
    description: "Que nadie compre un solo dólar",
    requiredTag: "Cepo",
  },
];

// --- CARTAS (25 Cartas) ---
// STATS: [Pueblo, Economía, Orden, Sindicatos]

export const CFK_CARDS: CardData[] = [
  {
    id: 401,
    speaker: "jefa",
    text: "¡Argentinos y Argentinas! Hoy quiero anunciar por Cadena Nacional la inauguración de una canilla en Formosa.",
    left: {
      text: "Hablar 3 horas.",
      effect: [10, 0, -5, 5], // El núcleo duro ama el discurso, el orden baja por aburrimiento
      tags: ["CadenaNacional"],
    },
    right: {
      text: "Ser breve (imposible).",
      effect: [-5, 0, 0, 0], // Decepciona a la militancia
    },
  },
  {
    id: 402,
    speaker: "magnetto",
    text: "La tapa del diario dice que la inflación real es del 25%. Esto mancha el modelo.",
    left: {
      text: "¡Clarín Miente!",
      effect: [5, 0, -10, 10], // Batalla cultural, sube militancia, baja orden institucional
      tags: ["LeyDeMedios"],
    },
    right: {
      text: "Reconocer el aumento.",
      effect: [-10, -5, 5, 0], // Nunca admitir error
    },
  },
  {
    id: 403,
    speaker: "kichi",
    text: "Jefa, los fondos buitre nos quieren embargar la Fragata Libertad en Ghana. ¿Qué hacemos?",
    left: {
      text: "Patria o Buitres.",
      effect: [15, -10, -5, 5], // Épica nacionalista, golpe económico
      tags: ["Relato"],
    },
    right: {
      text: "Pagar la sentencia.",
      effect: [-20, -20, 5, 0], // Traición al relato
    },
  },
  {
    id: 404,
    speaker: "moreno",
    text: "Los supermercados remarcan los precios. ¿Voy con los guantes de boxeo a 'charlar'?",
    left: {
      text: "Precios Cuidados (A la fuerza).",
      effect: [5, 0, -15, 0], // Control de precios, caos institucional
      tags: ["VamosPorTodo"],
    },
    right: {
      text: "Dejar libre mercado.",
      effect: [-10, 0, 5, -5], // Eso es neoliberalismo
    },
  },
  {
    id: 405,
    speaker: "indec",
    text: "Los números de pobreza nos están dando mal. Si los publicamos, se cae el relato.",
    left: {
      text: "Intervenir el INDEC.",
      effect: [0, 5, -20, 0], // Economía 'mejora' falsamente, Instituciones destruidas
      tags: ["Relato"],
    },
    right: {
      text: "Decir la verdad.",
      effect: [-15, 0, 10, 0], // Doloroso
    },
  },
  {
    id: 406,
    speaker: "jefa",
    text: "Me dicen que hay inseguridad. Yo digo que es una 'sensación' amplificada por los medios.",
    left: {
      text: "Es una sensación.",
      effect: [-10, 0, -10, 0], // La gente se enoja, el orden real baja
      tags: ["Relato"],
    },
    right: {
      text: "Mandar gendarmes.",
      effect: [5, -5, 10, 0],
    },
  },
  {
    id: 407,
    speaker: "pibe",
    text: "Compañera, necesitamos llenar la Plaza para el acto del 25. ¿Movilizamos el aparato?",
    left: {
      text: "Choripán y Coca.",
      effect: [10, -10, 0, 20], // Sube imagen propia y sindicatos, gasta caja
      tags: ["VamosPorTodo"],
    },
    right: {
      text: "Que vayan espontáneos.",
      effect: [-5, 0, 0, -10], // Plaza vacía
    },
  },
  {
    id: 408,
    speaker: "juez",
    text: "Tengo una causa por unos hoteles en el sur que facturaban habitaciones vacías.",
    left: {
      text: "¡Esto es Lawfare!",
      effect: [5, 0, -15, 10], // Victimizacion, ataque a la justicia
      tags: ["Impunity"],
    },
    right: {
      text: "Presentar los libros contables.",
      effect: [-10, 0, 10, -5], // Aburrido y peligroso
    },
  },
  {
    id: 409,
    speaker: "kichi",
    text: "Se nos van los dólares, Jefa. La clase media compra para ahorrar y viaja a Miami.",
    left: {
      text: "Poner el CEPO.",
      effect: [-15, 10, 0, 0], // Clase media odia, Reservas aguantan un poco
      tags: ["Cepo"],
    },
    right: {
      text: "Devaluar.",
      effect: [-20, 5, 0, -10], // Golpe a todos
    },
  },
  {
    id: 410,
    speaker: "jefa",
    text: "El campo sigue teniendo ganancias extraordinarias. Es hora de ir por la renta agraria.",
    left: {
      text: "La 125 (Retenciones móviles).",
      effect: [-10, 20, -20, -10], // Guerra civil (Orden --), entra plata (Econ ++), Sindicatos campo en contra
      tags: ["VamosPorTodo"],
    },
    right: {
      text: "Dejarlos en paz.",
      effect: [5, -5, 0, 0], // Menos caja
    },
  },
  {
    id: 411,
    speaker: "moreno",
    text: "Jefa, con 6 pesos se come por día en Argentina. Lo dice mi planilla.",
    left: {
      text: "Confirmarlo en TV.",
      effect: [-15, 0, -5, 0], // Nadie lo cree, ridículo
      tags: ["Relato"],
    },
    right: {
      text: "Callate, Guillermo.",
      effect: [5, 0, 5, 0],
    },
  },
  {
    id: 412,
    speaker: "pibe",
    text: "Aerolíneas Argentinas pierde millones, pero los aviones llevan la bandera. ¿Privatizamos?",
    left: {
      text: "Soberanía de los cielos.",
      effect: [10, -15, 0, 10], // Pueblo feliz, Economía sangra, Gremios aeronáuticos felices
      tags: ["VamosPorTodo"],
    },
    right: {
      text: "Ajustar déficit.",
      effect: [-10, 5, 0, -20], // Paro de pilotos
    },
  },
  {
    id: 413,
    speaker: "jefa",
    text: "Aníbal dice que en Argentina hay menos pobres que en Alemania. ¿Lo digo?",
    left: {
      text: "¡Sí! Alemania envidia.",
      effect: [5, 0, -10, 0], // Núcleo duro aplaude, el resto se ríe
      tags: ["Relato"],
    },
    right: {
      text: "Es un poco mucho.",
      effect: [0, 0, 0, 0],
    },
  },
  {
    id: 414,
    speaker: "juez",
    text: "Un fiscal apareció muerto antes de presentar una denuncia grave. El país está en shock.",
    left: {
      text: "Fue un crimen pasional.",
      effect: [-20, 0, -25, 5], // Crisis institucional masiva, Orden al piso
      tags: ["Impunity"],
    },
    right: {
      text: "Investigar al espionaje.",
      effect: [0, 0, 5, -5],
    },
  },
  {
    id: 415,
    speaker: "kichi",
    text: "Tenemos que pagarle al Club de París. ¿Les pagamos todo junto y al contado?",
    left: {
      text: "Pagar todo (Desendeudamiento).",
      effect: [5, -25, 0, 0], // Vaciamos reservas, pero con soberanía
    },
    right: {
      text: "Renegociar a 20 años.",
      effect: [-5, -5, 0, 0], // Eso hacen los débiles
    },
  },
  {
    id: 416,
    speaker: "magnetto",
    text: "Estamos transmitiendo el partido de Boca-River solo por cable codificado. La gente sufre.",
    left: {
      text: "Fútbol para Todos (Gratis).",
      effect: [25, -20, 0, 5], // Popularidad extrema, gasto masivo
      tags: ["VamosPorTodo"],
    },
    right: {
      text: "Que paguen el pack.",
      effect: [-10, 0, 0, 0],
    },
  },
  {
    id: 417,
    speaker: "jefa",
    text: "Me tengo que operar de la tiroides. Necesito licencia.",
    left: {
      text: "Dejar a Boudou a cargo.",
      effect: [-10, 0, -10, 0], // El vice es un desastre de imagen
    },
    right: {
      text: "Gobernar por teléfono.",
      effect: [5, 0, 0, 0],
    },
  },
  {
    id: 418,
    speaker: "pibe",
    text: "¡Jefa! ¡Vimos a un funcionario tirando bolsos con dólares en un convento! ¿Qué decimos?",
    left: {
      text: "No lo conozco.",
      effect: [-20, 0, -10, 0], // Impacto corrupción
      tags: ["Impunity"],
    },
    right: {
      text: "Era plata de donaciones.",
      effect: [-25, 0, -15, 0], // Excusa mala
    },
  },
  {
    id: 419,
    speaker: "indec",
    text: "Si contamos bien la inflación, tenemos que pagar más por los bonos atados al CER.",
    left: {
      text: "Dibuje, maestro.",
      effect: [0, 10, -10, 0], // Ahorra plata (Economía sube), destruye confianza (Orden baja)
      tags: ["Relato"],
    },
    right: {
      text: "Pagar lo que corresponde.",
      effect: [0, -15, 5, 0],
    },
  },
  {
    id: 420,
    speaker: "jefa",
    text: "La Corte Suprema me declaró inconstitucional la reforma judicial. Son el 'Partido Judicial'.",
    left: {
      text: "Democratizar la Justicia (Reforma).",
      effect: [5, 0, -15, 10], // Ataque a la corte
      tags: ["VamosPorTodo"],
    },
    right: {
      text: "Acatar el fallo.",
      effect: [-10, 0, 10, -5], // Signo de debilidad
    },
  },
  {
    id: 421,
    speaker: "moreno",
    text: "Jefa, prohibí la importación de libros y iPhones para proteger la industria nacional.",
    left: {
      text: "Vivir con lo nuestro.",
      effect: [5, 5, 0, 5], // Sindicatos industriales contentos
      tags: ["Cepo"],
    },
    right: {
      text: "Abrir un poco.",
      effect: [5, -5, 0, -5], // Clase media contenta
    },
  },
  {
    id: 422,
    speaker: "pibe",
    text: "Queremos crear una agrupación de intelectuales K. Se llamará 'Carta Abierta'.",
    left: {
      text: "Aprobar financiamiento.",
      effect: [0, -5, 0, 5], // Gasto en cultura militante
      tags: ["Relato"],
    },
    right: {
      text: "Es muy aburrido.",
      effect: [0, 0, 0, 0],
    },
  },
  {
    id: 423,
    speaker: "jefa",
    text: "Obama viene de visita. ¿Le bailo un tango o le reclamo por la dictadura del 76?",
    left: {
      text: "Reclamo histórico.",
      effect: [5, 0, 0, 5], // Identidad
    },
    right: {
      text: "Ser amable y pragmática.",
      effect: [-5, 5, 0, -5], // "Cipaya"
    },
  },
  {
    id: 424,
    speaker: "kichi",
    text: "Repsol se lleva los dólares de YPF. Hay que recuperar la soberanía energética.",
    left: {
      text: "Expropiar YPF.",
      effect: [20, -20, 0, 10], // Gran popularidad, juicio millonario en contra a futuro
      tags: ["VamosPorTodo"],
    },
    right: {
      text: "Pedirles por favor.",
      effect: [-10, 0, 0, 0],
    },
  },
  {
    id: 425,
    speaker: "jefa",
    text: "Se termina el mandato y no hay reelección. ¿Pongo a Scioli de candidato?",
    left: {
      text: "Poner a Scioli (a regañadientes).",
      effect: [-5, 0, 5, 0], // No te gusta, pero mantiene el orden
    },
    right: {
      text: "No ungir a nadie.",
      effect: [5, 0, -10, -10], // Perder la elección
      tags: ["VamosPorTodo"],
    },
  },
];
