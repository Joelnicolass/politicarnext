import { Deck } from "@/types";

export const TESTING_DECK_NARRATIVE: Deck = {
  unlocked: true,
  hidden: true,
  id: "testing_narrative",
  name: "",
  description: "",
  difficulty: "hard",
  thumbnail: "",
  cards: [
    {
      id: 199999,
      left: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      right: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      speaker: "narrator",
      text: "New card [deck narrative].",
    },
    {
      id: 199998,
      left: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      right: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      speaker: "narrator",
      text: "New card [deck narrative]",
    },
  ],
  characters: {},
  objectivesPool: [
    {
      id: "narrative_objective_1",
      description: "Completar el arco narrativo del deck",
      requiredTag: "narrative_complete",
    },
    {
      id: "narrative_objective_2",
      description: "Mantener la coherencia de la historia",
      requiredTag: "story_coherent",
    },
  ],
};

export const TESTING_DECK: Deck = {
  unlocked: true,
  hidden: true,
  id: "testing",
  name: "",
  description: "",
  difficulty: "hard",
  thumbnail: "",
  cards: [
    {
      id: 99990,
      left: {
        effect: [1, 1, 1, 1],
        text: "1 1 1 1",
        tags: ["test"],
        statusEffect: undefined,
      },
      right: {
        effect: [-1, -1, -1, -1],
        text: "-1 -1 -1 -1",
        tags: ["test"],
        statusEffect: undefined,
      },
      speaker: "test_character",
      text: "INFO: [ 0, 0, 0, 0 ] -> Opinion pública | Economía | Defensa Nacional | Gremialistas.\n STATUS EFFECTS: good, bad.",
    },
    {
      id: 99991,
      left: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      right: {
        effect: [-5, -5, -5, -5],
        text: "NEGATIVE EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      speaker: "test_character",
      text: "This is a test card for testing purposes.",
    },
    {
      id: 99992,
      left: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      right: {
        effect: [0, 0, 0, 0],
        text: "STATUS EFFECT GOOD",
        tags: ["test"],
        statusEffect: {
          duration: 3,
          name: "Test Status",
          stat: 0,
          val: 2,
          type: "good",
        },
      },
      speaker: "test_character",
      text: "This is a test card for testing purposes.",
    },
    {
      id: 99993,
      left: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      right: {
        effect: [5, 5, 5, 5],
        text: "POSITIVE EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      speaker: "test_character",
      text: "This is a test card for testing purposes.",
    },
    {
      id: 99994,
      left: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      right: {
        effect: [0, 0, 0, 0],
        text: "STATUS EFFECT BAD 1",
        tags: ["test"],
        statusEffect: {
          duration: 2,
          name: "Test Negative Status",
          stat: 0,
          val: -3,
          type: "bad",
        },
      },
      speaker: "test_character",
      text: "This is a test card for testing purposes.",
    },
    {
      id: 99994,
      left: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      right: {
        effect: [0, 0, 0, 0],
        text: "STATUS EFFECT BAD 2",
        tags: ["test"],
        statusEffect: {
          duration: 2,
          name: "Test Negative Status",
          stat: 1,
          val: -3,
          type: "bad",
        },
      },
      speaker: "test_character",
      text: "This is a test card for testing purposes.",
    },
    {
      id: 99994,
      left: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      right: {
        effect: [0, 0, 0, 0],
        text: "STATUS EFFECT BAD 3",
        tags: ["test"],
        statusEffect: {
          duration: 2,
          name: "Test Negative Status",
          stat: 2,
          val: -3,
          type: "bad",
        },
      },
      speaker: "test_character",
      text: "This is a test card for testing purposes.",
    },
    {
      id: 99994,
      left: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      right: {
        effect: [0, 0, 0, 0],
        text: "STATUS EFFECT BAD 4",
        tags: ["test"],
        statusEffect: {
          duration: 2,
          name: "Test Negative Status",
          stat: 3,
          val: -3,
          type: "bad",
        },
      },
      speaker: "test_character",
      text: "This is a test card for testing purposes.",
    },
    {
      id: 99998,
      left: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      right: {
        effect: [0, 0, 0, 0],
        text: "OBJETIVE TAG - POSITIVE",
        tags: ["positive"],
        statusEffect: undefined,
      },
      speaker: "test_character",
      text: "This is another test card for testing purposes.",
    },
    {
      id: 99999,
      left: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: ["test"],
        statusEffect: undefined,
      },
      right: {
        effect: [0, 0, 0, 0],
        text: "OBJETIVE TAG - NEGATIVE",
        tags: ["negative"],
        statusEffect: undefined,
      },
      speaker: "test_character",
      text: "This is yet another test card for testing purposes.",
    },
    {
      id: 100000,
      left: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: [],
        statusEffect: undefined,
      },
      right: {
        effect: [0, 0, 0, 0],
        text: "ADD DECK - TESTING_NARRATIVE",
        tags: [],
        statusEffect: undefined,
        specialEffect: {
          type: "add_deck" as const,
          data: TESTING_DECK_NARRATIVE,
        },
      },
      speaker: "test_character",
      text: "This card will add a narrative deck WITH OBJECTIVES to the game when you swipe right.",
    },
    {
      id: 100001,
      left: {
        effect: [0, 0, 0, 0],
        text: "NO EFFECTS",
        tags: [],
        statusEffect: undefined,
      },
      right: {
        effect: [0, 0, 0, 0],
        text: "ADD OBJECTIVES",
        tags: [],
        statusEffect: undefined,
        specialEffect: {
          type: "add_objectives" as const,
          data: {
            objectives: [
              {
                id: "dynamic_objective_1",
                description:
                  "Nuevo objetivo: Mantener estabilidad durante 5 turnos",
                requiredTag: "stability",
              },
              {
                id: "dynamic_objective_2",
                description: "Nuevo objetivo: Aprobar reforma importante",
                requiredTag: "reform",
              },
            ],
          },
        },
      },
      speaker: "test_character",
      text: "This card will add 2 new objectives to the game when you swipe right.",
    },
  ],
  characters: {
    test_character: {
      id: "test_character",
      name: "Test Character",
      icon: "briefcase",
    },
  },
  objectivesPool: [
    {
      id: "test_objective_1",
      description: "Achieve testing excellence.",
      requiredTag: "positive",
    },
    {
      id: "test_objective_2",
      description: "Avoid negative testing outcomes.",
      requiredTag: "negative",
    },
  ],
};
