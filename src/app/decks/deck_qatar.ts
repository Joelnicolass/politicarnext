import { CardData, Character, Objective } from "@/types";

// PERSONAJES: El elenco político del 2022
export const QATAR_CHARACTERS: Record<string, Character> = {
  alb: { id: "alb", name: 'EL PRESIDE "BETITO"', icon: "briefcase" }, // Alberto intentando viajar
  mas: { id: "mas", name: 'MINISTRO "HUMO" MASSA', icon: "dollar-sign" }, // Atajando penales económicos
  kri: { id: "kri", name: 'LA JEFA "PROSCRIPTA"', icon: "megaphone" }, // Cristina marcando la cancha
  mau: { id: "mau", name: 'EL GATO "FIFA"', icon: "shield" }, // Macri desde el palco
  por: { id: "por", name: 'LA PORTAVOZ "CERRUTI"', icon: "tv" }, // Negando la realidad
  pue: { id: "pue", name: 'HINCHA "TERMO"', icon: "users" }, // La gente
};

// OBJETIVOS: Supervivencia política usando el fútbol
export const QATAR_OBJECTIVES: Omit<Objective, "completed">[] = [
  {
    id: "tapada",
    description: "Tapar la Inflación con Goles",
    requiredTag: "Circo",
  },
  {
    id: "foto",
    description: "Conseguir la Foto con Messi",
    requiredTag: "FotoPolitica",
  },
  {
    id: "dolares",
    description: "Evitar que se fuguen los dólares",
    requiredTag: "Reservas",
  },
  {
    id: "feriado",
    description: "Decretar Feriados Populistas",
    requiredTag: "Populismo",
  },
  {
    id: "culpa",
    description: "Culpar a Macri de Mufa",
    requiredTag: "Relato",
  },
  {
    id: "diciembre",
    description: "Sobrevivir a Diciembre",
    requiredTag: "PazSocial",
  },
  {
    id: "noMufa",
    description: "Mufa anulada",
    requiredTag: "noMufa",
  },
  {
    id: "argenmia",
    description: "Scaloneta desclasada",
    requiredTag: "argenmia",
  },
];

// CARTAS: Dilemas de gestión durante la copa
export const QATAR_CARDS: CardData[] = [
  {
    id: 1,
    speaker: "mas",
    text: "La gente está tarjeteando pasajes a Qatar como si no hubiera mañana. ¡Se nos van las reservas!",
    left: {
      text: "Crear 'Dólar Qatar'",
      effect: [-10, 15, 0, -5], // Pueblo enojado (clase media), Reservas suben, Sindicatos baja
      statusEffect: {
        name: "Impuesto al Lujo",
        stat: 1, // Reservas
        val: 3,
        duration: 4,
        type: "good",
      },
      tags: ["Reservas"],
    },
    right: {
      text: "Dejar que viajen",
      effect: [5, -25, 0, 0], // Pueblo feliz, Reservas destruidas
      tags: ["Populismo"],
    },
  },
  {
    id: 2,
    speaker: "alb",
    text: "Che, ¿y si viajo a la final? Soy el Presidente, me corresponde estar en el palco.",
    left: {
      text: "¡Andá, Beto!",
      effect: [-20, -10, -10, 0], // Pueblo te odia (gasto), Reservas baja, Orden baja (polémica)
      statusEffect: {
        name: "Escrache en Avión",
        stat: 2, // Orden
        val: -5,
        duration: 3,
        type: "bad",
      },
      tags: ["FotoPolitica"],
    },
    right: {
      text: "Miralo por TV",
      effect: [0, 5, 5, -10], // Ahorras plata, pero Beto se deprime (baja poder interno)
    },
  },
  {
    id: 3,
    speaker: "pue",
    text: "¡NO HAY FIGURITAS DEL MUNDIAL! ¡Los kiosqueros están cortando la 9 de Julio!",
    left: {
      text: "Secretaría de Comercio",
      effect: [10, 0, -5, 5], // Pueblo se calma, pero es ridículo (baja Orden)
      statusEffect: {
        name: "Cumbre del Paquete",
        stat: 2, // Orden
        val: -2,
        duration: 2,
        type: "bad",
      },
      tags: ["PazSocial"],
    },
    right: {
      text: "Es el mercado, estúpido",
      effect: [-15, 0, 5, 0], // Pueblo furioso
    },
  },
  {
    id: 4,
    speaker: "por",
    text: "Perdimos el primer partido. La gente está empezando a recordar que la inflación es del 100%.",
    left: {
      text: "Culpar a Macri",
      effect: [-5, 0, -5, 0], // Nadie te cree
      tags: ["Relato"],
    },
    right: {
      text: "Regalar Bonos IFE",
      effect: [15, -20, 0, 10], // Pueblo feliz, Reservas al muere, Sindicatos contentos
      statusEffect: {
        name: "Emisión Mundial",
        stat: 1, // Reservas
        val: -5,
        duration: 4,
        type: "bad",
      },
      tags: ["Populismo"],
    },
  },
  {
    id: 5,
    speaker: "mau",
    text: "Je, estoy en el palco oficial de FIFA. Dicen por ahí que soy 'mufa'. ¿Qué hacemos?",
    left: {
      text: "Campaña #MacriMufa",
      effect: [10, 0, -10, 5], // Núcleo duro feliz, pero baja Orden (grieta tóxica)
      tags: ["Relato"],
    },
    right: {
      text: "Ignorarlo",
      effect: [-5, 0, 5, 0], // Aburrido
    },
  },
  {
    id: 6,
    speaker: "kri",
    text: "Si ganamos, los jugadores van a querer evitar la Casa Rosada. Hay que coparles el balcón.",
    left: {
      text: "Operativo La Cámpora",
      effect: [-15, 0, -20, 15], // Pueblo odia la politización, Orden (seguridad) colapsa, Sindicatos feliz
      statusEffect: {
        name: "Plantón de la Selección",
        stat: 2,
        val: -10,
        duration: 3,
        type: "bad",
      },
      tags: [],
    },
    right: {
      text: "Respetar su decisión",
      effect: [10, 0, 10, -10], // Pueblo valora, pero quedás débil internamente
    },
  },
  {
    id: 7,
    speaker: "mas",
    text: "Hace 40 grados y el sistema energético no aguanta los aires acondicionados durante los partidos.",
    left: {
      text: "Cortar luz a Industrias",
      effect: [5, -10, 0, -15], // Pueblo ve el partido, Reservas baja (menos producción), Sindicatos (UIA) enojados
      tags: [],
    },
    right: {
      text: "Cortar luz a Barrios",
      effect: [-30, 5, -20, 0], // Estallido social inmediato
      statusEffect: {
        name: "Cacerolazo a Oscuras",
        stat: 2, // Orden
        val: -5,
        duration: 3,
        type: "bad",
      },
    },
  },
  {
    id: 8,
    speaker: "alb",
    text: "¡GANAMOS! ¡CAMPEONES! ¿Qué hago? ¿Decreto Feriado Nacional de urgencia?",
    left: {
      text: "¡Feriado y Fiesta!",
      effect: [30, -15, -10, 10], // Pueblo éxtasis, Reservas pierden un día de PBI, Orden es un caos
      statusEffect: {
        name: "Resaca Nacional",
        stat: 1, // Reservas
        val: -3,
        duration: 2,
        type: "bad",
      },
      tags: ["Populismo"],
    },
    right: {
      text: "A laburar, vagos",
      effect: [-40, 10, 5, -10], // Suicidio político en medio de la euforia
    },
  },
  {
    id: 9,
    speaker: "por",
    text: "Los jugadores no quieren venir a Casa Rosada. Quieren ir al Obelisco y saludar desde un helicóptero.",
    left: {
      text: "Mandar a la Federal",
      effect: [-20, 0, -30, 0], // Represión en festejos = fin del gobierno
    },
    right: {
      text: "Decir que 'ganó el país'",
      effect: [-5, 0, 5, -5], // Aceptar la derrota política con dignidad
      statusEffect: {
        name: "Presidente Ausente",
        stat: 0,
        val: -2,
        duration: 5,
        type: "bad",
      },
    },
  },
  {
    id: 10,
    speaker: "mas",
    text: "Se terminó el mundial. La gente se dio cuenta que el dólar blue tocó 350. Se viene el estallido.",
    left: {
      text: "¡Lanzar Precios Justos!",
      effect: [5, -5, 0, 10], // Parche temporal
      statusEffect: {
        name: "Olla a Presión",
        stat: 1, // Reservas
        val: -4,
        duration: 4,
        type: "bad",
      },
      tags: ["pazSocial"],
    },
    right: {
      text: "Culpar a la Corte",
      effect: [0, 0, -10, 5], // Clásico
    },
  },
  {
    id: 11,
    speaker: "por",
    text: "En Gran Hermano están hablando mal del Gobierno. ¡Tienen más rating que mis cadenas nacionales!",
    left: {
      text: "¡Clausurar el Reality!",
      effect: [-20, 0, -10, 0], // Pueblo furioso (aman GH), Orden baja (censura)
    },
    right: {
      text: "Mandar un militante",
      effect: [0, -5, 5, 10], // Gasto menor, Sindicatos (militancia) contenta
      tags: [],
    },
  },
  {
    id: 12,
    speaker: "mas",
    text: "No hay camisetas de la Selección originales. La gente quiere linchar a Adidas. ¿Abrimos las importaciones?",
    left: {
      text: "¡Dólar Camiseta!",
      effect: [15, -15, 0, 0], // Pueblo feliz, Reservas bajan
    },
    right: {
      text: "Fomentar La Salada",
      effect: [-5, 5, -5, 10], // Reservas suben (no gastas), Sindicatos (textiles) felices
      statusEffect: {
        name: "Indumentaria Nac&Pop",
        stat: 0, // Pueblo
        val: -2,
        duration: 2,
        type: "bad",
      },
    },
  },
  {
    id: 13,
    speaker: "mau",
    text: "Je, dicen que si ganamos el Mundial, el peronismo se queda 20 años más. ¿Tiro una 'mufada' sutil?",
    left: {
      text: "Decir que Alemania es raza superior",
      effect: [-10, 0, -10, 5], // Pueblo enojado, Orden baja (polémica), núcleo duro feliz
      statusEffect: {
        name: "Declaración Polémica",
        stat: 0,
        val: -3,
        duration: 3,
        type: "bad",
      },
    },
    right: {
      text: "Controlate Gato",
      effect: [0, 0, 5, 0],
      statusEffect: {
        name: "Mufa Contenida",
        stat: 1,
        val: 2,
        duration: 4,
        type: "good",
      },
      tags: ["noMufa"],
    },
  },
  {
    id: 14,
    speaker: "kri",
    text: "El técnico ese Scaloni... no me nombra en las conferencias. ¿Es de los nuestros o es un desclasado?",
    left: {
      text: "Expropiar a la Scaloneta",
      effect: [-20, 0, -20, 10], // Pueblo odia politización, Orden cae, Sindicatos feliz
      tags: ["argenmia"],
    },
    right: {
      text: "Dejalo, le va bien",
      effect: [5, 0, 5, -5],
    },
  },
  {
    id: 15,
    speaker: "alb",
    text: "Dylan me mira con cara de que perdemos la final. ¿Llamo a las brujas de la Secretaría de Cultos?",
    left: {
      text: "Brujería de Estado",
      effect: [10, -5, -5, 0], // Pueblo supersticioso aprueba, Gasto tonto
      statusEffect: {
        name: "Gualicho Oficial",
        stat: 0, // Pueblo
        val: 2,
        duration: 1,
        type: "good",
      },
      tags: [],
    },
    right: {
      text: "Confiá en Messi",
      effect: [5, 0, 5, 0],
    },
  },
  {
    id: 16,
    speaker: "mas",
    text: "¡Alerta Roja! El Blue tocó 400 mangos mientras todos miraban los penales contra Holanda.",
    left: {
      text: "¡Vendan Reservas ya!",
      effect: [5, -20, 5, 0], // Mantiene la paz, destruye reservas
      statusEffect: {
        name: "Dólar Soja 3.0",
        stat: 1, // Reservas
        val: -3,
        duration: 4,
        type: "bad",
      },
    },
    right: {
      text: "Cuidemos las Reservas",
      effect: [-15, 5, -10, 0], // Pueblo enojado por precios, Reservas se cuidan
    },
  },
  {
    id: 17,
    speaker: "pue",
    text: "¡Ganamos la semifinal! Queremos ir al Obelisco AHORA, pero es martes a las 2 de la tarde.",
    left: {
      text: "¡Asueto Administrativo!",
      effect: [20, -10, -5, 5], // Pueblo feliz, Reservas (productividad) baja
      tags: ["Populismo", "PazSocial"],
    },
    right: {
      text: "Vuelvan a trabajar",
      effect: [-25, 5, 10, -10], // Pueblo furioso
    },
  },
  {
    id: 18,
    speaker: "por",
    text: "La oposición dice que el gobierno se cuelga de la Copa. Hay que twittear algo ingenioso.",
    left: {
      text: "Twit: 'Gol de todos y todas'",
      effect: [-10, 0, -5, 5], // Cringe generalizado
    },
    right: {
      text: "Silencio de radio",
      effect: [5, 0, 5, -5],
    },
  },
  {
    id: 19,
    speaker: "alb",
    text: "Si ganamos, quiero manejar el micro de la Selección hasta Ezeiza. Tengo registro profesional.",
    left: {
      text: "Mejor quedate en Olivos",
      effect: [-5, -5, 10, -5], // Riesgo de accidente, ridículo mundial
    },
    right: {
      text: "Ahí va el capitán Beto",
      effect: [-15, -15, -5, 0], // Dignidad preservada
      statusEffect: {
        name: "Choque en Richieri",
        stat: 2, // Orden
        val: -10,
        duration: 3,
        type: "bad",
      },
      tags: ["Circo"],
    },
  },
  {
    id: 20,
    speaker: "kri",
    text: "Aprovechando que están todos borrachos festejando... ¿y si vamos contra la Corte Suprema?",
    left: {
      text: "¡Juicio Político YA!",
      effect: [-5, 0, -15, 20], // Pueblo ni se entera, Orden institucional baja, Sindicatos apoyan
    },
    right: {
      text: "Esperar a Marzo",
      effect: [0, 0, 5, -10],
      statusEffect: {
        name: "Argentina trajo la Copa",
        stat: 1, // Orden
        val: 5,
        duration: 5,
        type: "good",
      },
    },
  },
];
