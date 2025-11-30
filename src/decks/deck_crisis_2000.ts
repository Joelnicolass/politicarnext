import { CardData, Character, Objective } from "@/types";

// ------------------------------------------------------------------
// PERSONAJES (Arquetipos del 2001)
// ------------------------------------------------------------------
export const CRISIS_2000_CHARACTERS: Record<string, Character> = {
  chu: { id: "chu", name: "EL PRESI", icon: "frown", img: "politico_a.png" }, // De la Rúa
  min: {
    id: "min",
    name: "EL SUPER MINISTRO",
    icon: "briefcase",
    img: "ministro_a.png",
  }, // Cavallo
  cab: {
    id: "cab",
    name: "EL CABEZÓN",
    icon: "user-check",
    img: "ministro_b.png",
  }, // Duhalde
  fmi: {
    id: "fmi",
    name: "AUDITORA DEL FMI",
    icon: "dollar-sign",
    img: "fmi.png",
  }, // Anne Krueger
  cac: { id: "cac", name: "SEÑORA BISMAN", icon: "bell", img: "vieja_a.png" }, // Cacerolera
  piq: { id: "piq", name: "EL PIQUETERO", icon: "users", img: "cgt.png" }, // D'Elía/Castells
  ban: {
    id: "ban",
    name: "BANQUERO GOLPISTA",
    icon: "trending-down",
    img: "gremio_a.png",
  }, // Banca Extranjera
  med: {
    id: "med",
    name: "MOVILERO EN VIVO",
    icon: "tv",
    img: "periosdistas.png",
  }, // Cronica TV
  pro: { id: "pro", name: "EL ADROGUÉ", icon: "mic", img: "ministro_c.png" }, // Rodríguez Saá
  gor: {
    id: "gor",
    name: "EL GORDO VALIJA",
    icon: "briefcase",
    img: "gremio_a.png",
  }, // Sindicalismo
  tia: { id: "tia", name: "TU TÍA MARTA", icon: "coffee", img: "mujer_a.png" }, // Ahorrista estafada
};

// ------------------------------------------------------------------
// OBJETIVOS (20 Objetivos Únicos - La Ruta del Colapso)
// ------------------------------------------------------------------
export const CRISIS_2000_OBJECTIVES_POOL: Omit<Objective, "completed">[] = [
  // Fase 1: La Agonía de la Convertibilidad
  {
    id: "blindaje",
    description: "Conseguir el Blindaje",
    requiredTag: "Obj_Blindaje",
  },
  {
    id: "megacanje",
    description: "Hacer el Megacanje",
    requiredTag: "Obj_Megacanje",
  },
  {
    id: "deficit_cero",
    description: "Recortar el 13%",
    requiredTag: "Obj_DeficitCero",
  },
  {
    id: "riesgo_pais",
    description: "Riesgo País > 3000",
    requiredTag: "Obj_RiesgoPais",
  },

  // Fase 2: El Estallido
  {
    id: "corralito",
    description: "Instaurar el Corralito",
    requiredTag: "Obj_Corralito",
  },
  {
    id: "saqueos",
    description: "Contener Saqueos",
    requiredTag: "Obj_Saqueos",
  },
  {
    id: "estado_sitio",
    description: "Estado de Sitio",
    requiredTag: "Obj_EstadoSitio",
  },
  {
    id: "helicoptero",
    description: "Salida en Helicóptero",
    requiredTag: "Obj_Helicoptero",
  },

  // Fase 3: La Semana de los 5 Presidentes
  {
    id: "default",
    description: "Declarar el Default",
    requiredTag: "Obj_Default",
  },
  {
    id: "asamblea",
    description: "Asamblea Legislativa",
    requiredTag: "Obj_Asamblea",
  },

  // Fase 4: El Infierno Duhaldista
  {
    id: "devaluacion",
    description: "Fin del 1 a 1",
    requiredTag: "Obj_Devaluacion",
  },
  {
    id: "pesificacion",
    description: "Pesificación Asimétrica",
    requiredTag: "Obj_Pesificacion",
  },
  {
    id: "patacones",
    description: "Imprimir Patacones",
    requiredTag: "Obj_Patacones",
  },
  {
    id: "remedios",
    description: "Faltante de Insumos",
    requiredTag: "Obj_Remedios",
  },

  // Fase 5: Social / Cultural
  {
    id: "trueque",
    description: "Club del Trueque",
    requiredTag: "Obj_Trueque",
  },
  {
    id: "que_se_vayan",
    description: "Que se vayan todos",
    requiredTag: "Obj_QueSeVayanTodos",
  },
  {
    id: "voto_bronca",
    description: "Voto Bronca (Clemente)",
    requiredTag: "Obj_VotoBronca",
  },
  {
    id: "ahorros",
    description: "Golpear Puertas de Bancos",
    requiredTag: "Obj_Ahorros",
  },
  {
    id: "avellaneda",
    description: "Masacre en el Puente",
    requiredTag: "Obj_Puente",
  },
  {
    id: "manzanera",
    description: "Red de Manzaneras",
    requiredTag: "Obj_Manzaneras",
  },
];

// ------------------------------------------------------------------
// CARTAS (25 Total - Historia tragicómica del 2001)
// Indicadores: [Opinión, Economía, Seguridad, Política]
// ------------------------------------------------------------------
export const CRISIS_2000_CARDS: CardData[] = [
  // --- FASE 1: INTENTANDO SALVAR EL 1 a 1 ---

  {
    id: 1, // Objetivo: BLINDAJE
    speaker: "chu",
    text: "Dicen que soy aburrido. Pero el FMI nos ofrece un 'Blindaje' millonario. ¿Lo tomamos?",
    left: {
      text: "¡Qué linda noticia!",
      effect: [10, 15, 0, -5],
      statusEffect: {
        name: "Deuda Eterna",
        stat: 1,
        val: -5,
        duration: 5,
        type: "bad",
      },
      tags: ["Obj_Blindaje"],
    },
    right: {
      text: "Ajustar nosotros",
      effect: [-15, 5, 0, -10],
      tags: [],
    },
  },
  {
    id: 2, // Objetivo: MEGACANJE
    speaker: "min",
    text: "Los vencimientos de deuda son impagables este mes. Necesito patear todo para el 2030.",
    left: {
      text: "Hacer Megacanje",
      effect: [0, 10, 0, 0], // Alivio momentaneo
      statusEffect: {
        name: "Tasas Usureras",
        stat: 1,
        val: -10,
        duration: 4,
        type: "bad",
      },
      tags: ["Obj_Megacanje"],
    },
    right: {
      text: "Pagar con reservas",
      effect: [0, -20, 0, 0],
      tags: [],
    },
  },
  {
    id: 3, // Objetivo: DÉFICIT CERO
    speaker: "fmi",
    text: "No more money, mister. Si quiere el desembolso, debe gastar solo lo que recauda.",
    left: {
      text: "Recortar 13% a Jubilados",
      effect: [-20, 10, 0, -10], // Suicidio politico
      tags: ["Obj_DeficitCero"],
    },
    right: {
      text: "Ignorar al FMI",
      effect: [10, -20, -5, 0],
      tags: [],
    },
  },
  {
    id: 4, // Objetivo: VOTO BRONCA
    speaker: "med",
    text: "La gente está harta. En las urnas están metiendo fetas de salame en lugar de boletas.",
    left: {
      text: "Validar Voto Bronca",
      effect: [-10, 0, 0, -20], // Deslegitimación total
      tags: ["Obj_VotoBronca"],
    },
    right: {
      text: "Culpar al clima",
      effect: [-5, 0, 0, 0],
      tags: [],
    },
  },
  {
    id: 5, // Objetivo: RIESGO PAÍS
    speaker: "ban",
    text: "Los mercados están nerviosos. Si no das una señal de autoridad, se van todos.",
    left: {
      text: "Poner cara de malo",
      effect: [-5, -5, 0, 0],
      statusEffect: {
        name: "Riesgo País 4000",
        stat: 1,
        val: -10,
        duration: 3,
        type: "bad",
      },
      tags: ["Obj_RiesgoPais"],
    },
    right: {
      text: "Rogar piedad",
      effect: [-10, -5, 0, 0],
      tags: [],
    },
  },

  // --- FASE 2: DICIEMBRE 2001 ---

  {
    id: 6, // Objetivo: CORRALITO
    speaker: "min",
    text: "¡Se están llevando todos los dólares! ¡Hay corridas bancarias! ¿Cerramos los bancos?",
    left: {
      text: "Instaurar EL CORRALITO",
      effect: [-20, 5, -20, -10], // Estallido social inmediato
      tags: ["Obj_Corralito"],
    },
    right: {
      text: "Dejar que se lleven todo",
      effect: [10, -30, 0, 0], // Quiebra del sistema
      tags: [],
    },
  },
  {
    id: 7, // Objetivo: SAQUEOS
    speaker: "piq",
    text: "Tenemos hambre. Vamos a entrar al Coto de Temperley a buscar comida (y televisores).",
    left: {
      text: "Repartir Bolsones",
      effect: [5, -5, -10, 5],
      tags: ["Obj_Saqueos"],
    },
    right: {
      text: "Mandar a la Montada",
      effect: [-20, 0, 10, -20],
      tags: [],
    },
  },
  {
    id: 8, // Objetivo: ESTADO DE SITIO
    speaker: "cac",
    text: "(Cacerola noise) ¡PIQUETE Y CACEROLA, LA LUCHA ES UNA SOLA! ¡Que se vayan!",
    left: {
      text: "Declarar Estado de Sitio",
      effect: [-20, 0, 15, -20], // El fin
      tags: ["Obj_EstadoSitio"],
    },
    right: {
      text: "Renunciar Ministros",
      effect: [10, -5, 0, -10],
      tags: [],
    },
  },
  {
    id: 9, // Objetivo: HELICÓPTERO
    speaker: "chu",
    text: "Hay humo en el Patio de las Palmeras. Me dicen que hay un transporte aéreo listo en la terraza.",
    left: {
      text: "Subir al Helicóptero",
      effect: [-20, 0, 0, -20], // Game Over técnico (pero sigue la historia)
      statusEffect: {
        name: "Acefalía",
        stat: 3,
        val: -10,
        duration: 2,
        type: "bad",
      },
      tags: ["Obj_Helicoptero"],
    },
    right: {
      text: "Resistir en el despacho",
      effect: [-20, 0, -20, 0],
      tags: [],
    },
  },

  // --- FASE 3: LA SEMANA LOCA ---

  {
    id: 10, // Objetivo: DEFAULT
    speaker: "pro",
    text: "Soy Presidente por un rato. Quiero anunciar algo histórico en el Congreso.",
    left: {
      text: "¡EL DEFAULT!",
      effect: [20, 10, -10, 10], // Ovación en el congreso, mundo horrorizado
      tags: ["Obj_Default"],
    },
    right: {
      text: "Seguir pagando",
      effect: [-20, -10, 0, 0],
      tags: [],
    },
  },
  {
    id: 11, // Objetivo: ASAMBLEA
    speaker: "gor",
    text: "Renunció el puntano. No queda nadie. Hay que elegir a alguien que ponga orden.",
    left: {
      text: "Elegir al Cabezón",
      effect: [-10, 0, 10, 20], // El aparato peronista toma el control
      tags: ["Obj_Asamblea"],
    },
    right: {
      text: "Elecciones anticipadas",
      effect: [10, -10, -10, -10],
      tags: [],
    },
  },

  // --- FASE 4: 2002 - EL AJUSTE DUHALDISTA ---

  {
    id: 12, // Objetivo: DEVALUACIÓN
    speaker: "min",
    text: "El que depositó dólares, recibirá dólares... (guiño). Mentira, no hay un verde.",
    left: {
      text: "Fin del 1 a 1",
      effect: [-20, 10, 0, 0], // Pobreza al 50%
      tags: ["Obj_Devaluacion"],
    },
    right: {
      text: "Dolarizar sin dólares",
      effect: [-10, -20, -10, 0],
      tags: [],
    },
  },
  {
    id: 13, // Objetivo: PESIFICACIÓN
    speaker: "ban",
    text: "Las empresas deben millones en dólares. Si no licuamos las deudas, quiebran todas.",
    left: {
      text: "Pesificación Asimétrica",
      effect: [-20, -10, 0, 10], // Estafa a ahorristas, salvo empresas
      statusEffect: {
        name: "Licuadora",
        stat: 1,
        val: 5,
        duration: 4,
        type: "good",
      },
      tags: ["Obj_Pesificacion"],
    },
    right: {
      text: "Que paguen lo que deben",
      effect: [10, -20, 0, -20],
      tags: [],
    },
  },
  {
    id: 14, // Objetivo: PATACONES
    speaker: "pro",
    text: "No hay pesos para pagarle a los maestros. ¿Imprimimos billetes con la cara de un prócer inventado?",
    left: {
      text: "Imprimir Patacones",
      effect: [5, 10, 0, 5], // La economía se mueve con papelitos
      statusEffect: {
        name: "Cuasimonedas",
        stat: 1,
        val: -3,
        duration: 5,
        type: "bad",
      },
      tags: ["Obj_Patacones"],
    },
    right: {
      text: "No pagar sueldos",
      effect: [-20, 5, -20, -10],
      tags: [],
    },
  },
  {
    id: 15, // Objetivo: QUE SE VAYAN TODOS
    speaker: "cac",
    text: "Los bancos pusieron chapas de metal en las ventanas. ¡Chorros! ¡Devuelvan los ahorros!",
    left: {
      text: "Cantar 'Que se vayan...'",
      effect: [10, 0, -10, -20], // Anti-política al máximo
      tags: ["Obj_QueSeVayanTodos"],
    },
    right: {
      text: "Irse a casa",
      effect: [-10, 0, 0, 10],
      tags: [],
    },
  },

  // --- FASE 5: SOBREVIVIENDO EN EL INFIERNO ---

  {
    id: 16, // Objetivo: TRUEQUE
    speaker: "tia",
    text: "Nene, no tengo efectivo. Pero hice empanadas. ¿Me las cambiás por un corte de pelo?",
    left: {
      text: "Al Club del Trueque",
      effect: [10, -5, 0, 0], // Economía solidaria de subsistencia
      tags: ["Obj_Trueque"],
    },
    right: {
      text: "Pedir fiado",
      effect: [-5, -5, 0, 0],
      tags: [],
    },
  },
  {
    id: 17, // Objetivo: AHORROS
    speaker: "cac",
    text: "Un juez me dio un amparo para sacar mis dólares, pero el banco no me abre.",
    left: {
      text: "Romper el cajero",
      effect: [5, 0, -15, 0], // Furia
      tags: ["Obj_Ahorros"],
    },
    right: {
      text: "Esperar el bono 2012",
      effect: [-20, 5, 0, 0], // Resignación
      tags: [],
    },
  },
  {
    id: 18, // Objetivo: PUENTE PUEYRREDON
    speaker: "piq",
    text: "Cortamos el Puente Pueyrredón. Queremos planes Jefes y Jefas ya.",
    left: {
      text: "Represión Feroz",
      effect: [-20, 0, -20, -10], // Tragedia histórica
      tags: ["Obj_Puente"],
    },
    right: {
      text: "Dar Planes Sociales",
      effect: [5, -10, 5, 10],
      tags: [],
    },
  },
  {
    id: 19, // Objetivo: MANZANERAS
    speaker: "cab",
    text: "Necesitamos controlar el conurbano. Las 'Chicas' de la red barrial son claves.",
    left: {
      text: "Activar Manzaneras",
      effect: [0, -5, 10, 20], // Control territorial peronista
      tags: ["Obj_Manzaneras"],
    },
    right: {
      text: "Confiar en ONGs",
      effect: [5, 0, -5, -10],
      tags: [],
    },
  },
  {
    id: 20, // Objetivo: REMEDIOS
    speaker: "tia",
    text: "Fui a la farmacia y no hay insulina importada. Me ofrecen un té de tilo.",
    left: {
      text: "Genéricos Nacionales",
      effect: [10, 5, 0, -5], // Ley de genéricos (buena medida)
      tags: ["Obj_Remedios"],
    },
    right: {
      text: "Rezar",
      effect: [-10, -5, 0, 0],
      tags: [],
    },
  },

  // --- CARTAS DE RELLENO (CONTEXTO) ---

  {
    id: 21,
    speaker: "med",
    text: "En la tele hay un programa donde rompen todo. Se llama 'Rompeportones' o algo así.",
    left: {
      text: "Reírse para no llorar",
      effect: [5, 0, 0, 0],
      tags: [],
    },
    right: {
      text: "Ver Cadena Nacional",
      effect: [-5, 0, 0, 0],
      tags: [],
    },
  },
  {
    id: 22,
    speaker: "ban",
    text: "Las casas matrices no mandan ni un centavo. ¿Bajamos la persiana?",
    left: {
      text: "Poner chapas de zinc",
      effect: [-10, 0, -5, 0], // Imagen icónica del 2001
      tags: [],
    },
    right: {
      text: "Atender por ventanilla",
      effect: [5, -5, -10, 0],
      tags: [],
    },
  },
  {
    id: 23,
    speaker: "fmi",
    text: "Mister, su país es 'unserious'. No cumplen ni una meta fiscal.",
    left: {
      text: "Culpar al contexto",
      effect: [0, 0, 0, 0],
      tags: [],
    },
    right: {
      text: "Prometer ajuste",
      effect: [-10, 5, 0, 0],
      tags: [],
    },
  },
  {
    id: 24,
    speaker: "chu",
    text: "Me invitaron al programa de Tinelli. ¿Voy y me hago el gracioso?",
    left: {
      text: "Ir y confundirse la salida",
      effect: [-15, 0, 0, 0], // Papelón histórico
      tags: [],
    },
    right: {
      text: "Quedarse en Olivos",
      effect: [0, 0, 0, 0],
      tags: [],
    },
  },
  {
    id: 25,
    speaker: "cab",
    text: "El país está en llamas, pero el tipo de cambio alto nos va a salvar (eventualmente).",
    left: {
      text: "Tener esperanza",
      effect: [5, 0, 0, 0],
      tags: [],
    },
    right: {
      text: "Emigrar a España",
      effect: [-5, -5, 0, 0], // Fuga de cerebros
      tags: [],
    },
  },
];
