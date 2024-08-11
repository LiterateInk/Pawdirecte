export const TimelineItemKind = {
  Note: "Note",
  VieScolaire: "VieScolaire",
  ReunionPP: "ReunionPP",
  ReunionPPFamille: "ReunionPPFamille",
  Actualite: "Actualite",
  Messagerie: "Messagerie",
  DocumentFamille: "DocumentFamille",
  Document: "Document"
} as const;

export type TimelineItemKind = typeof TimelineItemKind[keyof typeof TimelineItemKind];
