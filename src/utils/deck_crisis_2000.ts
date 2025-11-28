// ==========================================
// DECK: CRISIS DEL 2000 (UPDATED STATS)
// ==========================================

import { CardData, Character, Objective } from "@/types";

// --- PERSONAJES ---
export const CRISIS_2000_CHARACTERS: Record<string, Character> = {
  pres: { id: "pres", name: "PRESIDENTE DE TURNO", icon: "user-x" },
  cav: { id: "cav", name: "EL SUPERMINISTRO", icon: "glasses" },
  fmi: { id: "fmi", name: "LA TÍA DEL FMI", icon: "briefcase" },
  cacer: { id: "cacer", name: "SEÑORA BISMAN", icon: "bell" },
  pique: { id: "pique", name: "EL POLLO SOBRERO", icon: "users" },
  banc: { id: "banc", name: "BANQUERO FUGAZ", icon: "landmark" },
  tv: { id: "tv", name: "CRÓNICA TV", icon: "tv" },
  duha: { id: "duha", name: "EL CABEZÓN", icon: "user-check" },
  moy: { id: "moy", name: "EL CAMIONERO", icon: "truck" },
};

// --- OBJETIVOS ---
export const CRISIS_2000_OBJECTIVES_POOL: Omit<Objective, "completed">[] = [
  {
    id: "obj_dolar",
    description: "Mantener la Convertibilidad (1 a 1)",
    requiredTag: "Convertibilidad",
  },
  {
    id: "obj_helic",
    description: "Escapar en Helicóptero (Final alternativo)",
    requiredTag: "Helicoptero",
  },
  {
    id: "obj_pata",
    description: "Inundar la calle de Patacones",
    requiredTag: "Cuasimonedas",
  },
  {
    id: "obj_blind",
    description: "Conseguir el 'Mega-Blindaje' del FMI",
    requiredTag: "Blindaje",
  },
  {
    id: "obj_pesi",
    description: "Pesificar la economía asimétricamente",
    requiredTag: "Pesificacion",
  },
  {
    id: "obj_paro",
    description: "Sobrevivir a un Paro General Indeterminado",
    requiredTag: "ParoGeneral",
  },
];

// --- CARTAS (25 Cartas) ---
// EFECTOS: [Pueblo, Reservas, Orden, Sindicatos]

export const CRISIS_2000_CARDS: CardData[] = [
  {
    id: 101,
    speaker: "fmi",
    text: "Mister President, el 'Blindaje' está listo, pero exigen recortar salarios estatales y jubilaciones un 13%.",
    left: {
      text: "¡Cortá por lo sano!",
      effect: [-20, 15, 0, -25], // Pueblo odia, Reservas suben, Sindicatos furiosos
      tags: ["Blindaje", "Ajuste"],
    },
    right: {
      text: "Ni locos, se incendia el país.",
      effect: [5, -15, 0, 10], // Pueblo feliz, Reservas bajan
    },
  },
  {
    id: 102,
    speaker: "banc",
    text: "La gente está sacando los dólares del banco. El sistema colapsa el viernes a las 15hs.",
    left: {
      text: "Instaurar el 'Corralito'.",
      effect: [-30, 5, -10, 0], // Pueblo colapsa, Reservas aguantan un poco, Orden baja por protestas
      statusEffect: {
        name: "Cacerolazos",
        stat: 0, // Daña Pueblo constantemente
        val: -5,
        duration: 4,
        type: "bad",
      },
      tags: ["Corralito"],
    },
    right: {
      text: "Dejar que se lleven todo.",
      effect: [10, -40, 0, 0], // Reservas mueren instantáneamente
      tags: ["Convertibilidad"],
    },
  },
  {
    id: 103,
    speaker: "cacer",
    text: "¡Ladrones! ¡Devuélvanme mis ahorros! ¡Yo puse dólares, quiero dólares!",
    left: {
      text: "El que depositó dólares...",
      effect: [-15, 0, -5, 0], // Pierde credibilidad (Pueblo y Orden)
      tags: ["Mentira"],
    },
    right: {
      text: "Pesificar asimétricamente.",
      effect: [-10, 10, 0, -5], // Salva un poco las reservas, la gente pierde poder de compra
      tags: ["Pesificacion"],
    },
  },
  {
    id: 104,
    speaker: "tv",
    text: "URGENTE: Saqueos en el Conurbano. Están entrando a los supermercados chinos.",
    left: {
      text: "Mandar a Gendarmería.",
      effect: [-10, 0, 15, -10], // Represión sube orden, baja pueblo y sindicatos
      tags: ["Represion"],
    },
    right: {
      text: "Repartir comida.",
      effect: [10, -10, 5, 5], // Gasta reservas, calma pueblo y sindicatos
      tags: ["Paz Social"],
    },
  },
  {
    id: 105,
    speaker: "cav",
    text: "No hay un peso partido al medio. ¿Imprimimos unos bonos provinciales? Les pondremos 'Patacones'.",
    left: {
      text: "¡Imprima, maestro!",
      effect: [5, 15, 0, 5], // Sube reservas (ficticias) y calma un poco los sueldos (sindicatos)
      statusEffect: {
        name: "Inflación Encubierta",
        stat: 1, // Afecta valor real de Reservas a largo plazo
        val: -3,
        duration: 5,
        type: "bad",
      },
      tags: ["Cuasimonedas"],
    },
    right: {
      text: "No, eso es dinero del Monopoly.",
      effect: [-5, -5, 0, -5], // Sin liquidez, todos bajan un poco
    },
  },
  {
    id: 106,
    speaker: "pres",
    text: "La Plaza de Mayo está llena. Cantan 'Que se vayan todos'. ¿Renuncio?",
    left: {
      text: "Firmar la renuncia.",
      effect: [10, 0, -20, 0], // Pueblo celebra, Caos total de orden
      tags: ["Helicoptero"],
    },
    right: {
      text: "Declarar Estado de Sitio.",
      effect: [-25, 0, 15, -15], // Pueblo enfurece, Orden sube, Sindicatos en contra
      tags: ["Represion"],
    },
  },
  {
    id: 107,
    speaker: "duha",
    text: "Jefe, usted váyase tranquilo. Yo agarro el fierro caliente. ¿Devaluamos?",
    left: {
      text: "Dólar libre a $4.",
      effect: [-20, 20, 0, -10], // Pueblo pobre, Reservas se licúan (o recuperan competitividad), Sindicatos pierden sueldo
      tags: ["Pesificacion", "Ajuste"],
    },
    right: {
      text: "Mantener el 1 a 1 ficticio.",
      effect: [5, -20, 0, 5], // Imposible de sostener
      tags: ["Convertibilidad"],
    },
  },
  {
    id: 108,
    speaker: "pique",
    text: "Cortamos el Puente Pueyrredón. Queremos planes Jefes y Jefas de Hogar.",
    left: {
      text: "Dar 2 millones de planes.",
      effect: [10, -15, -5, 15], // Pueblo y Sindicatos felices, Reservas bajan
      tags: ["Paz Social"],
    },
    right: {
      text: "Desalojar el puente.",
      effect: [-10, 0, 15, -20], // Orden sube, Sindicatos te odian
      tags: ["Represion"],
    },
  },
  {
    id: 109,
    speaker: "moy",
    text: "La CGT no aguanta más el ajuste. O hay paritaria o hay Paro General.",
    left: {
      text: "Dar aumento por decreto.",
      effect: [10, -10, 0, 20], // Contentas a los gremios y pueblo, cuesta plata
    },
    right: {
      text: "Que hagan paro.",
      effect: [-5, 0, -5, -30], // Relación con gremios rota, orden baja por falta de transporte
      tags: ["ParoGeneral"],
    },
  },
  {
    id: 110,
    speaker: "tv",
    text: "El Riesgo País superó los 3000 puntos. ¿Hacemos un Mega-Canje de deuda?",
    left: {
      text: "Patear la deuda.",
      effect: [0, 10, 0, 0], // Alivio temporal de reservas
      statusEffect: {
        name: "Intereses Futuros",
        stat: 1, // Reservas
        val: -4,
        duration: 8,
        type: "bad",
      },
      tags: ["Blindaje"],
    },
    right: {
      text: "Culpar a los especuladores.",
      effect: [5, 0, 0, 0], // Populismo barato
    },
  },
  {
    id: 111,
    speaker: "cacer",
    text: "Ya no tengo plata para el super. Me anoté en el Club del Trueque. Cambio empanadas por zapatos.",
    left: {
      text: "Fomentar el Trueque.",
      effect: [10, 0, 5, 0], // Pueblo sobrevive, ayuda al Orden social
      tags: ["Trueque"],
    },
    right: {
      text: "Prohibir la venta informal.",
      effect: [-15, 0, -5, 0], // Pueblo enojado
    },
  },
  {
    id: 112,
    speaker: "pres",
    text: "Me dicen que hay un helicóptero en el techo de la Casa Rosada con el motor encendido...",
    left: {
      text: "Subirse y saludar.",
      effect: [0, 0, -20, 0], // El orden se desploma al irse el presidente
      tags: ["Helicoptero"],
    },
    right: {
      text: "¡Yo de acá no me muevo!",
      effect: [-5, 0, 10, -5], // Intentar resistir
      tags: ["Resistencia"],
    },
  },
  {
    id: 113,
    speaker: "banc",
    text: "Los bancos extranjeros amenazan con irse del país si no les compensamos las pérdidas.",
    left: {
      text: "Estatizar deuda privada.",
      effect: [-10, -25, 0, 0], // Pueblo enojado, Reservas destruidas
      tags: ["Deuda"],
    },
    right: {
      text: "Que quiebren.",
      effect: [10, 0, -10, 0], // Pueblo feliz, caos financiero
    },
  },
  {
    id: 114,
    speaker: "cav",
    text: "Tengo una idea brillante: Impuesto al Cheque. Es 'temporal', solo por un año.",
    left: {
      text: "Aprobar por 'emergencia'.",
      effect: [-5, 20, 0, -5], // Recauda mucho, molesta a todos un poco
      statusEffect: {
        name: "Impuesto Eterno",
        stat: 1, // Reservas
        val: 2, // Ingreso constante
        duration: 20,
        type: "good",
      },
      tags: ["Ajuste"],
    },
    right: {
      text: "Rechazar.",
      effect: [5, -10, 0, 5],
    },
  },
  {
    id: 115,
    speaker: "tv",
    text: "Un carnicero dice que la gente le pide 'huesos para el perro' pero se los comen ellos.",
    left: {
      text: "Llorar en cámara.",
      effect: [5, 0, 0, 0], // Empatía
    },
    right: {
      text: "Comedores comunitarios.",
      effect: [15, -10, 5, 5], // Sube pueblo, baja reservas, ayuda al orden y gremios
      tags: ["Paz Social"],
    },
  },
  {
    id: 116,
    speaker: "duha",
    text: "El que depositó dólares, recibirá dólares... eventualmente. ¿Les damos un bono a 10 años?",
    left: {
      text: "Bono BODEN 2012.",
      effect: [-10, 10, 0, 0], // Gente enojada, salva reservas
      tags: ["Pesificacion"],
    },
    right: {
      text: "Devolver efectivo ya.",
      effect: [20, -30, 0, 0], // Imposible financieramente
    },
  },
  {
    id: 117,
    speaker: "pique",
    text: "Estamos cocinando en ollas populares en la 9 de Julio. El humo llega a tu despacho.",
    left: {
      text: "Bajar a comer con ellos.",
      effect: [10, 0, -5, 10], // Populismo
    },
    right: {
      text: "Mandar camión hidrante.",
      effect: [-10, 0, 15, -20], // Represión: Orden sube, Sindicatos bajan
      tags: ["Represion"],
    },
  },
  {
    id: 118,
    speaker: "fmi",
    text: "Ustedes son defaulteadores seriales. Se cerró el grifo. Game Over.",
    left: {
      text: "¡Default y aplausos!",
      effect: [15, 10, 0, 10], // No pagar deuda sube reservas momentáneamente y es popular
      statusEffect: {
        name: "Aislados del Mundo",
        stat: 1, // Reservas
        val: -4,
        duration: 5,
        type: "bad",
      },
      tags: ["Deuda"],
    },
    right: {
      text: "Vender la Patagonia.",
      effect: [-50, 40, -20, -20], // Traición a la patria
    },
  },
  {
    id: 119,
    speaker: "cacer",
    text: "Están rompiendo las vidrieras de los bancos a martillazos. Se pone feo.",
    left: {
      text: "Poner chapas de metal.",
      effect: [-5, 0, 5, 0], // Feo estéticamente, protege algo
      tags: ["Corralito"],
    },
    right: {
      text: "La culpa es de los bancos.",
      effect: [5, 0, -10, 0], // Fomenta el desorden
    },
  },
  {
    id: 120,
    speaker: "moy",
    text: "Señor Presidente, si toca las Obras Sociales, le paramos el transporte, la basura y los camiones.",
    left: {
      text: "No se tocan.",
      effect: [0, -10, 0, 20], // Cede ante la mafia, pierde plata
      tags: ["Paz Social"],
    },
    right: {
      text: "Auditoría contable.",
      effect: [5, 0, 0, -30], // Guerra con sindicatos
      tags: ["ParoGeneral"],
    },
  },
  {
    id: 121,
    speaker: "tv",
    text: "Entrevista exclusiva: Un ahorrista amenaza con explotar el banco con una granada falsa.",
    left: {
      text: "Negociar en vivo.",
      effect: [5, 0, -5, 0], // Show mediático
    },
    right: {
      text: "Francotiradores.",
      effect: [-15, 0, 15, -5], // Mano dura
      tags: ["Represion"],
    },
  },
  {
    id: 122,
    speaker: "cav",
    text: "El déficit cero es innegociable. Vamos a recortar a los estatales y jubilados.",
    left: {
      text: "Lo lamento, abuelos.",
      effect: [-20, 15, 0, -15], // Pueblo y Sindicatos estatales odian esto
      tags: ["Ajuste"],
    },
    right: {
      text: "Con los jubilados no.",
      effect: [10, -10, 0, 5],
    },
  },
  {
    id: 123,
    speaker: "banc",
    text: "Señor, los Lecops se están mezclando con los Patacones. Nadie sabe qué vale qué.",
    left: {
      text: "Unificar en 'Peso Fuerte'.",
      effect: [-5, -5, 5, 0], // Ordena un poco
    },
    right: {
      text: "Más papeles de colores.",
      effect: [5, 10, -5, 0], // Más inflación, pero hay 'plata'
      tags: ["Cuasimonedas"],
    },
  },
  {
    id: 124,
    speaker: "duha",
    text: "El campo no liquida la cosecha porque el dólar está bajo. Quieren devaluación.",
    left: {
      text: "Dales el gusto (3 a 1).",
      effect: [-15, 25, 0, -5], // Entran MUCHAS reservas, pueblo pierde poder adquisitivo
      tags: ["Pesificacion"],
    },
    right: {
      text: "Poner retenciones.",
      effect: [5, 10, -5, -5], // Recauda, pero genera conflicto (baja orden/sindicatos campo)
    },
  },
  {
    id: 125,
    speaker: "cacer",
    text: "Señor, logramos sobrevivir el año. Estamos atando todo con alambre, pero estamos.",
    left: {
      text: "Lo atamos con alambre.",
      effect: [5, 0, 5, 0], // Pequeña victoria
      tags: ["Trueque"],
    },
    right: {
      text: "Dios es argentino.",
      effect: [5, 0, 0, 0],
    },
  },
];
