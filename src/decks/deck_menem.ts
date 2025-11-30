// ==========================================
// DECK: MENEM LO HIZO
// ==========================================

import { CardData, Character, Objective } from "@/types";

// --- PERSONAJES (Menem Era) ---
export const MENEM_CHARACTERS: Record<string, Character> = {
  carlos: { id: "carlos", name: "EL RIOJANO", icon: "sunglasses" }, // El protagonista
  mingo: { id: "mingo", name: "EL MINISTRO", icon: "piggy-bank" }, // Cavallo
  alsog: { id: "alsog", name: "EL INGENIERO", icon: "building-columns" }, // Alsogaray / Liberales
  sind: { id: "sind", name: "EL GORDO CGT", icon: "drum" }, // Sindicalismo tradicional
  vedet: { id: "vedet", name: "LA VEDETTE", icon: "sparkles" }, // Farándula
  period: { id: "period", name: "EL OPERADOR", icon: "microphone" }, // Neustadt/Grondona
  usa: { id: "usa", name: "MISTER AMBASSADOR", icon: "flag" }, // Embajada EEUU
};

// --- OBJETIVOS ---
export const MENEM_OBJECTIVES_POOL: Omit<Objective, "completed">[] = [
  {
    id: "obj_unoauno",
    description: "Mantener el 1 a 1 hasta el final",
    requiredTag: "Convertibilidad",
  },
  {
    id: "obj_const",
    description: "Reformar la Constitución (Reelección)",
    requiredTag: "Reeleccion",
  },
  {
    id: "obj_priv",
    description: "Vender todas las Joyas de la Abuela",
    requiredTag: "Privatizacion",
  },
  {
    id: "obj_carnal",
    description: "Relaciones Carnales con el Norte",
    requiredTag: "USA",
  },
  {
    id: "obj_ferrari",
    description: "Quedarse con la Ferrari Roja",
    requiredTag: "Corrupcion",
  },
  {
    id: "obj_flex",
    description: "Flexibilizar a los trabajadores",
    requiredTag: "Flexibilizacion",
  },
];

// --- CARTAS (25 Cartas) ---
// STATS: [Pueblo, Economía, Orden, Sindicatos]

export const MENEM_CARDS: CardData[] = [
  {
    id: 201,
    speaker: "mingo",
    text: "La hiperinflación nos come. Propongo atar el peso al dólar. Un peso, un dólar. ¿Se anima?",
    left: {
      text: "¡Convertibilidad ya!",
      effect: [20, 20, 10, 0], // Éxtasis inicial
      statusEffect: {
        name: "Estabilidad Artificial",
        stat: 1, // Economía
        val: -2, // Costo de mantenimiento por turno
        duration: 10,
        type: "bad",
      },
      tags: ["Convertibilidad"],
    },
    right: {
      text: "Mejor emitimos un poco.",
      effect: [-10, -10, -5, 0], // Más de lo mismo
    },
  },
  {
    id: 202,
    speaker: "carlos",
    text: "Los teléfonos del estado no andan. Para tener línea hay que esperar 15 años o coimear.",
    left: {
      text: "Privatizar ENTEL.",
      effect: [10, 20, 0, -20], // Pueblo feliz por servicio, entra plata, Sindicatos odio total
      tags: ["Privatizacion"],
    },
    right: {
      text: "Lo arreglamos con alambre.",
      effect: [-15, -5, 0, 5], // Sigue el mal servicio
    },
  },
  {
    id: 203,
    speaker: "sind",
    text: "Compañero, si vende Aerolíneas y los trenes, le paramos el país. ¡Ramal que para, ramal que cierra!",
    left: {
      text: "Ramal que para, ramal que cierra.",
      effect: [5, 15, 10, -30], // Mano dura, entra dinero de venta, guerra sindical
      tags: ["Privatizacion"],
    },
    right: {
      text: "Negociemos indemnizaciones.",
      effect: [0, -10, -5, 15], // Gasto plata, calmo sindicatos
    },
  },
  {
    id: 204,
    speaker: "usa",
    text: "Mister President, queremos que envíe naves al Golfo Pérsico. We need your support.",
    left: {
      text: "Relaciones Carnales.",
      effect: [-10, 15, 0, 0], // Pueblo no quiere guerra, FMI manda plata
      tags: ["USA"],
    },
    right: {
      text: "Somos neutrales.",
      effect: [5, -10, 0, 0],
    },
  },
  {
    id: 205,
    speaker: "vedet",
    text: "Carlo, la farándula quiere fiesta en la Quinta de Olivos. ¡Pizza con Champagne para todos!",
    left: {
      text: "¡Abran los portones!",
      effect: [-5, -5, -5, 0], // Escándalo, gasto, desorden... pero divertido
      tags: ["Farandula"],
    },
    right: {
      text: "Soy un hombre serio.",
      effect: [0, 0, 5, 0],
    },
  },
  {
    id: 206,
    speaker: "carlos",
    text: "Un empresario italiano me regaló una Ferrari Testarossa. Dicen que es un soborno.",
    left: {
      text: "¡Es mía, mía, mía!",
      effect: [-10, 0, -15, 0], // Imagen negativa, impunidad (baja orden moral)
      tags: ["Corrupcion"],
    },
    right: {
      text: "Donarla al Estado.",
      effect: [10, 0, 5, 0],
    },
  },
  {
    id: 207,
    speaker: "period",
    text: "Bernardo dice en la TV que 'Doña Rosa' puede comprarse una TV en cuotas. El consumo explota.",
    left: {
      text: "¡Voto Cuota para todos!",
      effect: [20, -10, 10, 0], // Pueblo feliz consumiendo, deuda sube (baja econ real)
      tags: ["Convertibilidad"],
    },
    right: {
      text: "Ahorrar para el invierno.",
      effect: [-15, 5, 0, 0], // Nadie quiere austeridad en los 90
    },
  },
  {
    id: 208,
    speaker: "alsog",
    text: "Las jubilaciones son un gasto enorme. ¿Creamos las AFJP y privatizamos el ahorro?",
    left: {
      text: "Crear las AFJP.",
      effect: [0, 15, 0, -15], // Entra plata fresca al mercado, sindicatos pierden caja
      tags: ["Privatizacion"],
    },
    right: {
      text: "Estado presente.",
      effect: [5, -10, 0, 5],
    },
  },
  {
    id: 209,
    speaker: "carlos",
    text: "Quiero ser presidente de nuevo, pero la Constitución no me deja. Necesito una reforma.",
    left: {
      text: "Pacto de Olivos con Alfonsín.",
      effect: [-5, -5, 20, 0], // Acuerdo político (Orden sube), costo político
      tags: ["Reeleccion"],
    },
    right: {
      text: "Respetar la ley.",
      effect: [10, 0, -10, 0], // Te vas a casa
    },
  },
  {
    id: 210,
    speaker: "mingo",
    text: "El desempleo subió al 18%. Las empresas dicen que despedir es muy caro.",
    left: {
      text: "Flexibilización Laboral.",
      effect: [-10, 10, 0, -25], // Pueblo sufre, Empresas invierten, Gremios te matan
      tags: ["Flexibilizacion"],
    },
    right: {
      text: "Prohibir despidos.",
      effect: [10, -20, 0, 15], // Sindicatos felices, economía se estanca
    },
  },
  {
    id: 211,
    speaker: "period",
    text: "Explotó la fábrica militar de Río Tercero. Justo cuando vendíamos armas a escondidas.",
    left: {
      text: "Fue un accidente.",
      effect: [-15, 0, -20, 0], // Nadie te cree, el orden institucional cae
      tags: ["Corrupcion"],
    },
    right: {
      text: "Investigar a fondo.",
      effect: [5, 0, 5, 0], // Poco probable
    },
  },
  {
    id: 212,
    speaker: "sind",
    text: "Estamos importando hasta los escarbadientes. La industria nacional está cerrando.",
    left: {
      text: "Que se reconviertan.",
      effect: [5, 10, 0, -10], // Consumidores felices (barato), Econ (importaciones), Gremios mal
    },
    right: {
      text: "Aranceles a la importación.",
      effect: [-10, -10, 0, 10], // Cosas caras, FMI enojado
    },
  },
  {
    id: 213,
    speaker: "carlos",
    text: "Tengo que dar un discurso de apertura de sesiones. ¿Qué les prometo?",
    left: {
      text: "Vuelos a la Estrósfera.",
      effect: [-10, 0, -5, 0], // Ridículo, baja imagen y seriedad
      tags: ["Farandula"],
    },
    right: {
      text: "Revolución Productiva.",
      effect: [5, 0, 0, 0],
    },
  },
  {
    id: 214,
    speaker: "mingo",
    text: "Necesitamos jueces amigos que no molesten con las denuncias de corrupción.",
    left: {
      text: "La servilleta de Corach.",
      effect: [0, 0, 20, 0], // Jueces propios garantizan orden/impunidad
      tags: ["Corrupcion"],
    },
    right: {
      text: "Justicia Independiente.",
      effect: [10, 0, -20, 0], // Riesgo de ir preso
    },
  },
  {
    id: 215,
    speaker: "vedet",
    text: "Vienen los Rolling Stones a la Argentina. ¡Es una locura total!",
    left: {
      text: "Recibirlos en la Rosada.",
      effect: [15, 0, 0, 0], // Popularidad pura
      tags: ["Farandula"],
    },
    right: {
      text: "Son drogadictos.",
      effect: [-10, 0, 0, 0],
    },
  },
  {
    id: 216,
    speaker: "usa",
    text: "Bill Clinton viene de visita. ¿Cómo lo recibimos?",
    left: {
      text: "Abrazo y Tango.",
      effect: [5, 10, 0, 0], // Buena relación, entra crédito
      tags: ["USA"],
    },
    right: {
      text: "Protocolo frío.",
      effect: [0, -5, 0, 0],
    },
  },
  {
    id: 217,
    speaker: "carlos",
    text: "Mi pueblo natal, Anillaco, necesita un aeropuerto internacional para... exportar aceitunas.",
    left: {
      text: "Construir la Pista.",
      effect: [-5, -10, 0, 0], // Gasto corrupto
      tags: ["Corrupcion"],
    },
    right: {
      text: "Es mucho gasto.",
      effect: [0, 5, 0, 0],
    },
  },
  {
    id: 218,
    speaker: "sind",
    text: "Vamos a hacer un acto en la Plaza. Le decimos 'NO' al modelo neoliberal.",
    left: {
      text: "Ignorarlos e ir a jugar al golf.",
      effect: [-5, 0, 0, -10], // Desprecio
    },
    right: {
      text: "Ofrecer Obras Sociales.",
      effect: [0, -10, 5, 20], // Comprar la paz sindical con plata
    },
  },
  {
    id: 219,
    speaker: "period",
    text: "Atentado a la AMIA. Es un desastre. Hay confusión y encubrimiento.",
    left: {
      text: "Mirar a otro lado.",
      effect: [-20, 0, -20, 0], // Golpe durísimo a la imagen y seguridad
      tags: ["Corrupcion"],
    },
    right: {
      text: "Exigir justicia.",
      effect: [5, 0, 5, 0],
    },
  },
  {
    id: 220,
    speaker: "mingo",
    text: "La deuda externa se duplicó, pero tenemos muchas reservas gracias a la deuda. ¿Se entiende?",
    left: {
      text: "Pedir más deuda.",
      effect: [0, 15, 0, 0], // La fiesta continúa
      statusEffect: {
        name: "Intereses FMI",
        stat: 1, // Economía
        val: -4,
        duration: 8,
        type: "bad",
      },
      tags: ["Convertibilidad"],
    },
    right: {
      text: "Ajustar el gasto.",
      effect: [-15, 5, -5, -5], // Enfría la economía
    },
  },
  {
    id: 221,
    speaker: "carlos",
    text: "Los Carapintadas se están levantando de nuevo. Es el último intento golpista.",
    left: {
      text: "Aplastarlos definitivamente.",
      effect: [10, -5, 25, 0], // Fin de los golpes militares en Argentina (Orden +++)
    },
    right: {
      text: "Negociar indulto.",
      effect: [-10, 0, -10, 0],
    },
  },
  {
    id: 222,
    speaker: "vedet",
    text: "Diego dio positivo en el doping. El país está de luto. ¿Qué dice el Presi?",
    left: {
      text: "Foto en el balcón.",
      effect: [15, 0, 0, 0], // Populismo
      tags: ["Farandula"],
    },
    right: {
      text: "Que se cure.",
      effect: [-5, 0, 0, 0],
    },
  },
  {
    id: 223,
    speaker: "mingo",
    text: "Para mantener el déficit, vamos a subir el IVA al 21%.",
    left: {
      text: "Subir IVA.",
      effect: [-10, 15, 0, -5], // Recauda, golpea consumo (pueblo y gremios)
      tags: ["Convertibilidad"],
    },
    right: {
      text: "Bajar gastos políticos.",
      effect: [10, -5, -10, 0], // Populista pero pierde apoyo político
    },
  },
  {
    id: 224,
    speaker: "period",
    text: "Un fotógrafo apareció muerto en la costa. Apuntan al poder.",
    left: {
      text: "No sé nada.",
      effect: [-25, 0, -25, 0], // El principio del fin del poder político (Orden --, Pueblo --)
      tags: ["Corrupcion"],
    },
    right: {
      text: "Entregar al culpable.",
      effect: [5, 0, -10, 0], // Sacrificar un alfil
    },
  },
  {
    id: 225,
    speaker: "carlos",
    text: "Se termina el mandato. La gente está cansada, pero tengo la Ferrari y la gloria.",
    left: {
      text: "Intentar 'Re-Re' indefinida.",
      effect: [-20, 0, -20, 0], // Inconstitucional, la gente se cansa
      tags: ["Reeleccion"],
    },
    right: {
      text: "Volver a Anillaco.",
      effect: [5, 0, 5, 0], // Retiro digno (o no)
    },
  },
];
