import { CardData, Character, Objective } from "@/types";

// ------------------------------------------------------------------
// PERSONAJES (15 Arquetipos de la fauna política argentina)
// ------------------------------------------------------------------
export const DEFAULT_CHARACTERS: Record<string, Character> = {
  leo: { id: "leo", name: "EL PELUCA", icon: "zap", img: "milei.png" }, // El Presidente Libertario
  jef: { id: "jef", name: "LA ABOGADA EXITOSA", icon: "crown", img: "cfk.png" }, // La ex-Presidenta
  min: {
    id: "min",
    name: 'MINISTRO "TOTO"',
    icon: "briefcase",
    img: "ministro_a.png",
  }, // Economía
  syn: {
    id: "syn",
    name: "EL GORDO DEL BOMBO",
    icon: "megaphone",
    img: "cgt.png",
  }, // Sindicatos
  fmi: {
    id: "fmi",
    name: "COMITIVA DEL FMI",
    icon: "dollar-sign",
    img: "fmi.png",
  }, // Organismo Internacional
  gen: { id: "gen", name: 'PATO "BULL"', icon: "shield", img: "bullrich.png" }, // Seguridad
  pue: {
    id: "pue",
    name: "DOÑA ROSA",
    icon: "shopping-bag",
    img: "mujer_a.png",
  }, // La gente común
  med: {
    id: "med",
    name: "OPERADOR ENSOBRADO",
    icon: "tv",
    img: "periodistas.png",
  }, // Prensa
  pan: {
    id: "pan",
    name: "EL PANQUEQUE",
    icon: "refresh-cw",
    img: "politico_a.png",
  }, // Político cambiante
  cry: {
    id: "cry",
    name: "EL PIBE CRYPTO",
    icon: "smartphone",
    img: "joven_a.png",
  }, // Joven Tech/Libertario
  cam: { id: "cam", name: "EL GAUCHO SOJERO", icon: "sun", img: "campo_a.png" }, // El Campo
  jub: {
    id: "jub",
    name: "JUBILADO QUEJOSO",
    icon: "coffee",
    img: "viejo_a.png",
  }, // Clase Pasiva
  dog: {
    id: "dog",
    name: "CONAN (EL PERRO)",
    icon: "ghost",
    img: "perro_politico.png",
  }, // Consejero Espiritual
  emp: {
    id: "emp",
    name: "EL EMPRESARIO PREBENDARIO",
    icon: "trending-up",
    img: "politico.png",
  }, // Círculo Rojo
  gov: {
    id: "gov",
    name: "GOBERNADOR FEUDAL",
    icon: "map",
    img: "ministro_b.png",
  }, // Provincias
};

// ------------------------------------------------------------------
// OBJETIVOS (20 Objetivos Únicos - 1 a 1 con las cartas)
// ------------------------------------------------------------------
export const DEFAULT_OBJECTIVES: Omit<Objective, "completed">[] = [
  // Eje Económico / Liberal
  {
    id: "deficit_cero",
    description: "Lograr el Déficit Cero",
    requiredTag: "Obj_DéficitCero",
  },
  {
    id: "dolarizacion",
    description: "Dolarizar la Economía",
    requiredTag: "Obj_Dolarizar",
  },
  {
    id: "privatizacion",
    description: "Vender Empresas Públicas",
    requiredTag: "Obj_Privatizar",
  },
  {
    id: "laboral",
    description: "Reforma Laboral Flexible",
    requiredTag: "Obj_ReformaLaboral",
  },
  {
    id: "bicicleta",
    description: "Bicicleta Financiera",
    requiredTag: "Obj_Bicicleta",
  },

  // Eje Social / Peronista
  {
    id: "justicia_social",
    description: "Justicia Social (Plan Platita)",
    requiredTag: "Obj_PlanPlatita",
  },
  {
    id: "soberania",
    description: "Soberanía Nacional",
    requiredTag: "Obj_Soberania",
  },
  {
    id: "paritaria",
    description: "Salarios dignos",
    requiredTag: "Obj_Paritaria",
  },
  {
    id: "ciencia",
    description: "Defender la Ciencia",
    requiredTag: "Obj_Ciencia",
  },
  {
    id: "industrial",
    description: "Proteger Industria Nacional",
    requiredTag: "Obj_Industria",
  },

  // Eje Político / Institucional
  {
    id: "represion",
    description: "Mano Dura / Orden",
    requiredTag: "Obj_Orden",
  },
  {
    id: "casta",
    description: "Privilegios de la Casta",
    requiredTag: "Obj_Casta",
  },
  {
    id: "impunidad",
    description: "Controlar Jueces",
    requiredTag: "Obj_Impunidad",
  },
  {
    id: "federalismo",
    description: "Coparticipación a Provincias",
    requiredTag: "Obj_Federalismo",
  },
  {
    id: "grieta",
    description: "Profundizar la Grieta",
    requiredTag: "Obj_Grieta",
  },

  // Eje Cultural / Varios
  {
    id: "batalla",
    description: "Batalla Cultural",
    requiredTag: "Obj_BatallaCultural",
  },
  {
    id: "misticismo",
    description: "Guía Espiritual",
    requiredTag: "Obj_FuerzasCielo",
  },
  {
    id: "circo",
    description: "Pan y Circo (Fútbol)",
    requiredTag: "Obj_Mundial",
  },
  {
    id: "fmi_acuerdo",
    description: "Acuerdo con el FMI",
    requiredTag: "Obj_FMI",
  },
  { id: "campo", description: "Paz con el Campo", requiredTag: "Obj_Campo" },
];

// ------------------------------------------------------------------
// CARTAS (30 Total)
// Indicadores: [Opinión Pública, Economía, Seguridad, Sindicatos]
// ------------------------------------------------------------------
export const DEFAULT_CARDS: CardData[] = [
  // --- GRUPO 1: DEFINEN OBJETIVOS ECONÓMICOS LIBERALES ---

  {
    id: 1, // Objetivo: DÉFICIT CERO
    speaker: "min",
    text: "La planilla de Excel da rojo furioso. Si no cortamos gastos ya, explotamos mañana.",
    left: {
      text: "¡Motosierra a full!",
      effect: [-25, 20, -10, -15],
      tags: ["Obj_DéficitCero"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Emitir un poquito más",
      effect: [10, -20, 0, 5],
      statusEffect: {
        name: "Inflación",
        stat: 1,
        val: -5,
        duration: 3,
        type: "bad",
      },
      tags: [],
    },
  },
  {
    id: 2, // Objetivo: DOLARIZAR
    speaker: "leo",
    text: "El Peso es excremento. Tengo los dólares (creo) para dinamitar el Banco Central.",
    left: {
      text: "¡Dolarización Endógena!",
      effect: [5, -10, 0, -10],
      tags: ["Obj_Dolarizar"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Canasta de Monedas",
      effect: [0, 5, 0, 0],
      tags: [],
    },
  },
  {
    id: 3, // Objetivo: PRIVATIZAR
    speaker: "emp",
    text: "Los trenes pierden millones y llegan tarde. Mi grupo inversor ofrece comprarlos por $1.",
    left: {
      text: "Vendan todo",
      effect: [-15, 10, 0, -20],
      tags: ["Obj_Privatizar"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "El tren es del pueblo",
      effect: [10, -10, 0, 10],
      tags: [],
    },
  },
  {
    id: 4, // Objetivo: REFORMA LABORAL
    speaker: "emp",
    text: "Si contrato a alguien y lo despido, me funde el juicio. Así no invierte nadie.",
    left: {
      text: "Eliminar indemnizaciones",
      effect: [-20, 15, 5, -30],
      tags: ["Obj_ReformaLaboral"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Multar empleo en negro",
      effect: [5, -5, 0, 10],
      tags: [],
    },
  },
  {
    id: 5, // Objetivo: BICICLETA FINANCIERA
    speaker: "min",
    text: "El dólar está quieto y la tasa en pesos es alta. Los inversores quieren hacer 'Carry Trade'.",
    left: {
      text: "Permitir la Bicicleta",
      effect: [0, 10, 0, 0], // Mejora economía corto plazo (ficticio)
      statusEffect: {
        name: "Fuga Futura",
        stat: 1,
        val: -10,
        duration: 5,
        type: "bad",
      }, // Explota despues
      tags: ["Obj_Bicicleta"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Bajar tasas",
      effect: [0, -5, 0, 0],
      tags: [],
    },
  },

  // --- GRUPO 2: DEFINEN OBJETIVOS SOCIALES / PERONISTAS ---

  {
    id: 6, // Objetivo: JUSTICIA SOCIAL
    speaker: "pue",
    text: "La gente tiene hambre, Presi. No llegan a comprar la polenta.",
    left: {
      text: "Plan Platita Universal",
      effect: [25, -25, -5, 15],
      tags: ["Obj_PlanPlatita"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Capital Humano (Vouchers)",
      effect: [-15, 5, 0, -10],
      tags: [],
    },
  },
  {
    id: 7, // Objetivo: SOBERANIA
    speaker: "gen",
    text: "Un pesquero chino está robando calamares en la milla 201. ¿Mandamos a la Prefectura?",
    left: {
      text: "Hundan al barco",
      effect: [20, -5, 10, 0], // Conflicto diplomatico pero patriotico
      tags: ["Obj_Soberania"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Hacerse los distraídos",
      effect: [-20, 5, -10, 0],
      tags: [],
    },
  },
  {
    id: 8, // Objetivo: PARITARIA
    speaker: "syn",
    text: "La inflación se comió el sueldo. Queremos aumento o paro general indeterminado.",
    left: {
      text: "Homologar Aumento",
      effect: [10, -15, 0, 25],
      statusEffect: {
        name: "Espiriral Precios",
        stat: 1,
        val: -3,
        duration: 4,
        type: "bad",
      },
      tags: ["Obj_Paritaria"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Conciliación Obligatoria",
      effect: [-10, 5, 0, -15],
      tags: [],
    },
  },
  {
    id: 9, // Objetivo: CIENCIA
    speaker: "sci",
    text: "Sin presupuesto, los científicos del CONICET se van a lavar platos a Europa.",
    left: {
      text: "Triplicar Presupuesto",
      effect: [10, -10, 0, 5],
      tags: ["Obj_Ciencia"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Que busquen sponsors",
      effect: [-10, 5, 0, 0],
      tags: [],
    },
  },
  {
    id: 10, // Objetivo: INDUSTRIA NACIONAL
    speaker: "emp",
    text: "Están entrando termos importados de China a mitad de precio. ¡Mi fábrica de termos quiebra!",
    left: {
      text: "Cerrar Importaciones",
      effect: [5, -5, 0, 10],
      tags: ["Obj_Industria"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "¡Compitan o mueran!",
      effect: [-5, 5, 0, -5],
      tags: [],
    },
  },

  // --- GRUPO 3: DEFINEN OBJETIVOS POLÍTICOS ---

  {
    id: 11, // Objetivo: ORDEN / REPRESION
    speaker: "gen",
    text: "Cortaron la autopista Ricchieri. La gente no llega al aeropuerto.",
    left: {
      text: "Desalojo con Gendarmería",
      effect: [5, -5, 25, -20],
      statusEffect: {
        name: "Calles Despejadas",
        stat: 2,
        val: 5,
        duration: 2,
        type: "good",
      },
      tags: ["Obj_Orden"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Negociar carril lento",
      effect: [-10, 0, -10, 5],
      tags: [],
    },
  },
  {
    id: 12, // Objetivo: CASTA
    speaker: "pan",
    text: "Los senadores dicen que ganan poco. Quieren aumentarse las dietas a mano alzada.",
    left: {
      text: "Aprobar Aumento",
      effect: [-30, -5, 0, 0], // La gente odia esto
      tags: ["Obj_Casta"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Sortear mi sueldo",
      effect: [15, 0, 0, -5],
      tags: [],
    },
  },
  {
    id: 13, // Objetivo: IMPUNIDAD
    speaker: "med",
    text: "Hay audios de jueces arreglando causas en un viaje al sur. ¿Lo tapamos?",
    left: {
      text: "Operativo Silencio",
      effect: [-10, 0, 0, 10], // Favores politicos
      tags: ["Obj_Impunidad"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Cadena Nacional y Escrache",
      effect: [10, 0, -15, -10], // Guerra judicial
      tags: [],
    },
  },
  {
    id: 14, // Objetivo: FEDERALISMO
    speaker: "gov",
    text: "Las provincias no tienen plata para pagar sueldos docentes. Amenazan con emitir cuasimonedas.",
    left: {
      text: "Enviar Coparticipación",
      effect: [5, -15, 0, 5],
      tags: ["Obj_Federalismo"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Que se fundan",
      effect: [-10, 10, -5, 0],
      tags: [],
    },
  },
  {
    id: 15, // Objetivo: GRIETA
    speaker: "jef",
    text: "La oposición dice que sos un dictador. Hay que contestarles con todo.",
    left: {
      text: "Discurso polarizante",
      effect: [10, 0, -5, 0], // Solo sube con tu base, ignora el resto
      tags: ["Obj_Grieta"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Llamar al diálogo",
      effect: [-10, 0, 5, 0], // Tu base te ve debil
      tags: [],
    },
  },

  // --- GRUPO 4: CULTURALES Y VARIOS ---

  {
    id: 16, // Objetivo: BATALLA CULTURAL
    speaker: "leo",
    text: "En el Ministerio de Educación usan la 'E'. Dicen 'todes'. Me hierve la sangre.",
    left: {
      text: "Prohibir Lenguaje Inclusivo",
      effect: [5, 0, 0, -5], // Base conservadora feliz, progres enojados
      tags: ["Obj_BatallaCultural"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Me da igual",
      effect: [0, 0, 0, 0],
      tags: [],
    },
  },
  {
    id: 17, // Objetivo: MISTICISMO
    speaker: "dog",
    text: "(Guau) *Conan dice que el fantasma de un prócer te aconseja pelearte con Brasil.*",
    left: {
      text: "Obedecer al perro",
      effect: [-5, -10, 0, 0], // Locura total
      tags: ["Obj_FuerzasCielo"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Ignorar al perro",
      effect: [0, 5, 0, 0],
      tags: [],
    },
  },
  {
    id: 18, // Objetivo: CIRCO / MUNDIAL
    speaker: "pue",
    text: "La selección juega la final. El país está paralizado. ¿Qué hacemos?",
    left: {
      text: "Feriado Nacional",
      effect: [30, -10, 0, 5],
      tags: ["Obj_Mundial"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "A laburar igual",
      effect: [-20, 5, 0, 0],
      tags: [],
    },
  },
  {
    id: 19, // Objetivo: FMI ACUERDO
    speaker: "fmi",
    text: "Mister President, el staff report está listo. Firme aquí y le giramos los DEGs.",
    left: {
      text: "Firmar Ajuste Brutal",
      effect: [-15, 10, -5, -10],
      tags: ["Obj_FMI"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Defaultear",
      effect: [10, -30, 0, 0],
      statusEffect: {
        name: "Default",
        stat: 1,
        val: -10,
        duration: 10,
        type: "bad",
      },
      tags: [],
    },
  },
  {
    id: 20, // Objetivo: CAMPO
    speaker: "cam",
    text: "La cosecha viene récord, pero con estas retenciones no liquidamos nada.",
    left: {
      text: "Bajar Retenciones",
      effect: [5, -5, 0, 0], // Menos recaudacion, campo feliz
      tags: ["Obj_Campo"], // ÚNICA CARTA QUE CUMPLE ESTE OBJETIVO
    },
    right: {
      text: "Subir Retenciones",
      effect: [-5, 10, -10, 0], // Conflicto
      tags: [],
    },
  },

  // --- GRUPO 5: CARTAS DE RELLENO / EQUILIBRIO (SIN OBJETIVOS ESPECÍFICOS) ---
  // Estas cartas sirven para acomodar los stats y sobrevivir, o añaden color

  {
    id: 21,
    speaker: "cry",
    text: "Che, armé un bot que compra USDT cuando estornudás. ¿Lo regulamos?",
    left: {
      text: "Vivan las Crypto",
      effect: [5, 0, -5, 0], // Lavado
      tags: [],
    },
    right: {
      text: "Impuesto a la ganancia",
      effect: [-10, 5, 0, 0],
      tags: [],
    },
  },
  {
    id: 22,
    speaker: "jub",
    text: "Me aumentaron los remedios un 500%. ¿Tengo que elegir entre comer o curarme?",
    left: {
      text: "Remedios Gratis (PAMI)",
      effect: [10, -10, 0, 0],
      tags: [],
    },
    right: {
      text: "El mercado se regula",
      effect: [-20, 5, 0, 0], // Crueldad
      tags: [],
    },
  },
  {
    id: 23,
    speaker: "med",
    text: "La oposición te está matando en TV. ¿Les cortamos la pauta oficial?",
    left: {
      text: "Cortar Pauta",
      effect: [-5, 5, 0, 0], // Prensa enojada, ahorro fiscal
      statusEffect: {
        name: "Prensa Enemiga",
        stat: 0,
        val: -2,
        duration: 5,
        type: "bad",
      },
      tags: [],
    },
    right: {
      text: "Sobres para todos",
      effect: [5, -5, 0, 0],
      tags: [],
    },
  },
  {
    id: 24,
    speaker: "pue",
    text: "Hay una invasión de mosquitos y no hay repelente en ningún lado.",
    left: {
      text: "Importar Repelente",
      effect: [5, -5, 0, 0],
      tags: [],
    },
    right: {
      text: "Que se pongan vainilla",
      effect: [-15, 0, 0, 0],
      tags: [],
    },
  },
  {
    id: 25,
    speaker: "min",
    text: "China ofrece financiar una represa en el sur, pero quieren usar tecnología propia.",
    left: {
      text: "Aceptar Inversión",
      effect: [0, 10, 0, 5],
      tags: [],
    },
    right: {
      text: "Rechazar por comunistas",
      effect: [0, -5, 0, 0],
      tags: [],
    },
  },
  {
    id: 26,
    speaker: "syn",
    text: "Mañana es el Día de la Lealtad. ¿Vamos a la plaza o nos quedamos en casa?",
    left: {
      text: "Ir a la Plaza",
      effect: [5, -5, 0, 10], // Gesto peronista
      tags: [],
    },
    right: {
      text: "Trabajar",
      effect: [-5, 5, 0, -10],
      tags: [],
    },
  },
  {
    id: 27,
    speaker: "gen",
    text: "Compramos aviones de combate usados a Dinamarca. ¿Hacemos desfile?",
    left: {
      text: "Desfile Militar",
      effect: [5, -5, 10, 0],
      tags: [],
    },
    right: {
      text: "Guardarlos en el hangar",
      effect: [0, 0, 5, 0],
      tags: [],
    },
  },
  {
    id: 28,
    speaker: "leo",
    text: "Me invitaron al foro de Davos. ¿Voy a retarlos o a buscar inversiones?",
    left: {
      text: "Retarlos (Zurdeos)",
      effect: [5, 0, 0, 0], // Base fanatica feliz, mundo confundido
      tags: [],
    },
    right: {
      text: "Buscar Inversiones",
      effect: [-5, 5, 0, 0], // Aburrido
      tags: [],
    },
  },
  {
    id: 29,
    speaker: "jud",
    text: "Un fallo nos obliga a pagar una deuda millonaria por una expropiación vieja.",
    left: {
      text: "Pagar (con bonos)",
      effect: [0, -10, 0, 0],
      tags: [],
    },
    right: {
      text: "Desconocer fallo",
      effect: [5, 0, -10, 0], // Seguridad juridica baja
      tags: [],
    },
  },
  {
    id: 30,
    speaker: "pan",
    text: "Se rompió la coalición en el congreso. Necesitamos votos para la ley.",
    left: {
      text: "Ofrecer Embajadas",
      effect: [-5, -5, 0, 5], // Casta pura
      tags: [],
    },
    right: {
      text: "Retirar la ley",
      effect: [-10, 0, 0, 0], // Debilidad
      tags: [],
    },
  },
];
