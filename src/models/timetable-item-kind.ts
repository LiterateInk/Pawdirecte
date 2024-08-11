export const TimetableItemKind = {
  COURS: "COURS",
  PERMANENCE: "PERMANENCE",
  CONGE: "CONGE"
} as const;

export type TimetableItemKind = typeof TimetableItemKind[keyof typeof TimetableItemKind];
