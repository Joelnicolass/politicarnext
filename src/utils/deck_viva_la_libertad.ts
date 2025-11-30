// ==========================================
// DECK: VIVA LA LIBERTAD CARAJO (VLLC)
// ==========================================

import { CardData, Character, Objective } from "@/types";

// --- PERSONAJES (La Libertad Avanza Era) ---
export const VLLC_CHARACTERS: Record<string, Character> = {
  peluca: { id: "peluca", name: "EL PRESIDENTE", icon: "chain-saw" }, // Motosierra
  bull: { id: "bull", name: "LA MINISTRA", icon: "shield" }, // Seguridad
  vocero: { id: "vocero", name: "EL VOCERO", icon: "bullhorn" }, // Conferencias de prensa
  aliado: { id: "aliado", name: "EL AMIGO DEL PACTO", icon: "handshake" }, // Aliados políticos
  sind: { id: "sind", name: "EL GORDO CGT", icon: "fist" }, // Sindicalismo tradicional
  casta: { id: "casta", name: "EL DIPUTADO", icon: "trash" }, // Casta Política
  analista: { id: "analista", name: "EL OPINÓLOGO", icon: "chart" }, // Economía
};

// --- OBJETIVOS ---
export const VLLC_OBJECTIVES_POOL: Omit<Objective, "completed">[] = [
  {
    id: "obj_motosierra",
    description: "Alcanzar el Déficit Cero a toda costa",
    requiredTag: "Motosierra",
  },
  {
    id: "obj_banco",
    description: "Voltear el Banco Central (Dolarización)",
    requiredTag: "Dolarizacion",
  },
  {
    id: "obj_casteo",
    description: "Destruir a la Casta Política",
    requiredTag: "Casteo",
  },
  {
    id: "obj_pacto",
    description: "Firmar el Pacto de Mayo en Córdoba",
    requiredTag: "Pacto",
  },
  {
    id: "obj_protocolo",
    description: "Aplicar el Protocolo Anti-Piquetes",
    requiredTag: "Protocolo",
  },
  {
    id: "obj_mega",
    description: "Aprobar la Ley Bases 'Omnibus'",
    requiredTag: "LeyBases",
  },
  {
    id: "obj_tibieza",
    description: "Cosa de Tibios",
    requiredTag: "Tibieza",
  },
  {
    id: "obj_drdolittle",
    description: "Hablar con los animales",
    requiredTag: "DrDolittle",
  },
  {
    id: "obj_peladonegociador",
    description: "Negociar con la experiencia del pelado",
    requiredTag: "PeladoNegociador",
  },
];

// --- CARTAS (25 Cartas) ---
// STATS: [Pueblo, Reservas, Orden, Sindicatos]

export const VLLC_CARDS: CardData[] = [
  {
    id: 301,
    speaker: "peluca",
    text: "La batalla es contra el gasto público. Necesitamos eliminar 100 mil contratos del Estado.",
    left: {
      text: "Motosierra sin anestesia.",
      effect: [-20, 15, 0, -20], // Pueblo golpeado, Reservas mejoran, Sindicatos de estatales explotan
      tags: ["Motosierra", "Ajuste"],
    },
    right: {
      text: "Recorte gradual.",
      effect: [5, -5, 0, 5],
      tags: ["Tibieza"],
    },
  },
  {
    id: 302,
    speaker: "bull",
    text: "Piqueteros cortan el 9 de Julio. Propongo un 'Protocolo Anti-Piquetes': ruta libre o los sacamos.",
    left: {
      text: "Aplicar el Protocolo.",
      effect: [-15, 0, 25, -30], // Pueblo se divide, Orden sube, Sindicatos y organizaciones de izquierda en guerra
      tags: ["Protocolo"],
    },
    right: {
      text: "Negociar la liberación.",
      effect: [10, -5, -10, 10],
    },
  },
  {
    id: 303,
    speaker: "analista",
    text: "La gente siente el ajuste, pero hay superávit fiscal. Es un éxito económico o una tragedia social, ¿cuál ve?",
    left: {
      text: "Es un éxito. (Culpar a la 'Casta').",
      effect: [10, 0, -5, -15], // Refuerza el mensaje
      tags: ["Casteo"],
    },
    right: {
      text: "Admitir que duele.",
      effect: [5, 0, -5, -5],
      tags: ["Tibieza"],
    },
  },
  {
    id: 304,
    speaker: "sind",
    text: "La CGT llama a un Paro General total contra el DNU. No se mueve ni una mosca.",
    left: {
      text: "Declarar el paro ilegal.",
      effect: [-10, 0, 10, -25], // Orden sube, Sindicatos furiosos
      tags: ["Paro"],
    },
    right: {
      text: "Abrir la negociación.",
      effect: [5, -15, -10, 15], // Cuesta plata, pero calma el fuego
    },
  },
  {
    id: 305,
    speaker: "peluca",
    text: "El Banco Central es un nido de ladrones. ¡Tenemos que volarlo!",
    left: {
      text: "Inminente Dolarización.",
      effect: [-10, 30, 0, -10], // Gana credibilidad en Reservas, Pueblo teme, Sindicatos pierden poder
      tags: ["Dolarizacion"],
    },
    right: {
      text: "Reforma gradual.",
      effect: [5, 5, 0, 0],
    },
  },
  {
    id: 306,
    speaker: "casta",
    text: "El Congreso bloquea la Ley Bases y pide más plata para las provincias.",
    left: {
      text: "Veto total. ¡Son la Casta!",
      effect: [15, -10, 0, 0], // Pueblo apoya el enfrentamiento, Reservas afectadas
      tags: ["Casteo"],
    },
    right: {
      text: "Negociar y ceder.",
      effect: [-5, -15, 10, 0], // Pierde apoyo, gana estabilidad
    },
  },
  {
    id: 307,
    speaker: "peluca",
    text: "Hay que desregular la economía con un DNU de 300 artículos.",
    left: {
      text: "Firmar y publicar.",
      effect: [10, 10, 0, -20],
      statusEffect: {
        name: "Judicialización",
        stat: 2, // Orden (judicial)
        val: -4,
        duration: 5,
        type: "bad",
      },
      tags: ["LeyBases", "Ajuste"],
    },
    right: {
      text: "Enviar al Congreso (más lento).",
      effect: [0, -10, 5, 10],
      statusEffect: {
        name: "Judicialización",
        stat: 2, // Orden (judicial)
        val: 5,
        duration: 3,
        type: "good",
      },
    },
  },
  {
    id: 308,
    speaker: "vocero",
    text: "Un periodista 'ensobrado' critica las reformas con dureza.",
    left: {
      text: "Desmentirlo y confrontarlo públicamente.",
      effect: [5, 0, -5, 0], // Se gana el aplauso de los propios, pierde credibilidad
      tags: ["Casteo"],
    },
    right: {
      text: "Ignorar el ruido.",
      effect: [0, 0, 5, 0],
    },
  },
  {
    id: 309,
    speaker: "aliado",
    text: "Necesitamos apoyo político para el plan a largo plazo. ¿Pactamos en Córdoba?",
    left: {
      text: "Llamar al Pacto de Mayo.",
      effect: [5, 0, 10, 0], // Estabilidad política sube
      tags: ["Pacto"],
    },
    right: {
      text: "Seguir en soledad.",
      effect: [0, 0, -10, 0],
    },
  },
  {
    id: 310,
    speaker: "analista",
    text: "Las Universidades Públicas se están desfinanciando. Hay una marcha masiva.",
    left: {
      text: "Ignorar la protesta. ¡Son adoctrinadores!",
      effect: [-25, 10, 0, 0], // Pierde Pueblo, Reservas se salvan
      tags: ["Motosierra"],
    },
    right: {
      text: "Aumentar el presupuesto.",
      effect: [15, -10, 0, 0],
    },
  },
  {
    id: 311,
    speaker: "peluca",
    text: "Me invitaron a Davos. ¿Qué les digo a los socialistas del mundo?",
    left: {
      text: "Dar un discurso incendiario contra el socialismo.",
      effect: [10, 5, 0, 0], // Sube la imagen internacional liberal, Reservas contentas
      tags: ["Casteo"],
    },
    right: {
      text: "Mantener un perfil bajo.",
      effect: [0, 0, 0, 0],
    },
  },
  {
    id: 312,
    speaker: "sind",
    text: "La reforma laboral del DNU es inconstitucional. La judicializamos.",
    left: {
      text: "Defender el DNU en la Corte.",
      effect: [0, 0, -10, -15], // Orden Judicial en contra, Sindicatos batallando
      tags: ["LeyBases"],
    },
    right: {
      text: "Retirar la reforma laboral.",
      effect: [10, -5, 5, 10],
    },
  },
  {
    id: 313,
    speaker: "bull",
    text: "Se propuso usar a las Fuerzas Armadas en Rosario por el narcotráfico.",
    left: {
      text: "Sacar al Ejército a la calle.",
      effect: [20, -20, 10, 0], // Orden sube mucho, pero genera conflicto
      tags: ["Protocolo"],
    },
    right: {
      text: "Mandar a Espert a negociar (tiene experiencia).",
      effect: [-10, -5, 5, -10],
      tags: ["PeladoNegociador"],
    },
  },
  {
    id: 314,
    speaker: "analista",
    text: "La inflación es del 12% y va bajando. ¿Pero qué hacemos con las tarifas?",
    left: {
      text: "Quitar todos los subsidios de una vez.",
      effect: [-25, 20, 0, 0], // Gran golpe al Pueblo, enorme ahorro en Reservas
      tags: ["Motosierra"],
    },
    right: {
      text: "Subir de forma gradual.",
      effect: [-5, 5, 0, 0],
    },
  },
  {
    id: 315,
    speaker: "casta",
    text: "Nos quedamos sin gas para el invierno. Las obras de infraestructura están todas paradas.",
    left: {
      text: "Mantener la motosierra. ¡Es un gasto!",
      effect: [-15, 10, 0, -10], // Pueblo padece, Reservas ahorran, Sindicatos de la construcción en paro
    },
    right: {
      text: "Activar el Gasoducto (gasto).",
      effect: [5, -15, 0, 10],
    },
  },
  {
    id: 316,
    speaker: "peluca",
    text: "La deuda de las Leliqs es una bomba. Emitimos Bopreal para salvar el agujero.",
    left: {
      text: "Emitir Bopreal.",
      effect: [0, 15, 0, 0], // Solución financiera compleja, gana Reservas
      tags: ["Dolarizacion"],
    },
    right: {
      text: "Que la pague el que la hizo.",
      effect: [-10, -15, 0, 0],
    },
  },
  {
    id: 317,
    speaker: "bull",
    text: "La policía no tiene presupuesto para combustible ni horas extra.",
    left: {
      text: "¡El orden se mantiene por fe!",
      effect: [0, 0, -10, 0], // Orden cae por falta de recursos
    },
    right: {
      text: "Transferir fondos (recorte a otra área).",
      effect: [0, -5, 10, 0],
    },
  },
  {
    id: 318,
    speaker: "aliado",
    text: "La Ley Bases sigue frenada. Las empresas piden que se privatice YPF y el Banco Nación.",
    left: {
      text: "Privatizar todas las empresas.",
      effect: [5, 20, 0, -20], // Gran inyección a Reservas, Sindicatos en contra
      tags: ["LeyBases"],
    },
    right: {
      text: "Sólo algunas.",
      effect: [0, 10, 0, -5],
    },
  },
  {
    id: 319,
    speaker: "peluca",
    text: "Mi hermana dice que el plan está funcionando. Mi perro Conan me apoya.",
    left: {
      text: "Consultar con los mastines.",
      effect: [-10, 0, -5, -5],
      tags: ["DrDolittle"],
    },
    right: {
      text: "Consultar con Sturzenegger.",
      effect: [-5, 5, 0, 0],
    },
  },
  {
    id: 320,
    speaker: "vocero",
    text: "Los jubilados no llegan a fin de mes. Hay que darles un aumento por DNU.",
    left: {
      text: "Aumentar por DNU (fórmula previsional nueva).",
      effect: [-10, -5, 0, 0], // Pueblo sigue golpeado, pequeño gasto de Reservas
    },
    right: {
      text: "Mantener la fórmula anterior.",
      effect: [-20, 10, 0, 0], // Enorme ahorro para Reservas, Pueblo furioso
    },
  },
  {
    id: 321,
    speaker: "casta",
    text: "La Vicepresidenta votó distinto a nosotros en un tema clave. Hay rumores de crisis interna.",
    left: {
      text: "Confrontar públicamente.",
      effect: [10, 0, -35, 0], // Rompe el orden interno
    },
    right: {
      text: "Resolver la crisis en privado.",
      effect: [-10, 0, 5, 0],
    },
  },
  {
    id: 322,
    speaker: "peluca",
    text: "Necesitamos un acuerdo con el FMI, pero exigen más ajuste a las provincias.",
    left: {
      text: "Culpar a las provincias y ajustar más.",
      effect: [-35, 25, -5, -5], // Entra plata de Reservas, pero el Pueblo sufre
      tags: ["Motosierra"],
    },
    right: {
      text: "Retrasar el acuerdo.",
      effect: [10, -10, 0, 5],
    },
  },
  {
    id: 323,
    speaker: "sind",
    text: "Hacemos marchas de antorchas y bloqueos al Puerto. ¡Que se note la disconformidad!",
    left: {
      text: "Aplicar el Protocolo Anti-Piquetes.",
      effect: [-10, 0, 15, -20],
      tags: ["Protocolo"],
    },
    right: {
      text: "Dejar que se desahoguen.",
      effect: [5, 0, -10, 10],
    },
  },
  {
    id: 324,
    speaker: "aliado",
    text: "Ya cedimos mucho. Los gobernadores exigen subir sus propios impuestos.",
    left: {
      text: "Aceptar (Pacto de Mayo en peligro).",
      effect: [-5, 5, -5, 0],
      tags: ["Pacto"],
    },
    right: {
      text: "Mantener el ajuste federal.",
      effect: [10, 0, 0, 0],
      tags: ["Casteo"],
    },
  },
  {
    id: 325,
    speaker: "peluca",
    text: "La gente me ama, mi misión es clara: libertad económica pura. ¡Viva la Libertad Carajo!",
    left: {
      text: "Duplicar la apuesta.",
      effect: [5, 10, 0, -25],
      tags: ["Dolarizacion"],
    },
    right: {
      text: "Tomarse un descanso.",
      effect: [-5, -5, 0, 5],
      tags: ["Tibieza"],
    },
  },
];
