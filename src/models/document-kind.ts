export const DocumentKind = {
  Grades: "Note",
  Document: "Doc",
  SchoolLife: "Viesco", // TODO, not sure
  Invoice: "Fac", // TODO, not sure
  Registration: "Inscr", // TODO, not sure
  Textbook: "FICHIER_CDT",
  Other: ""
} as const;

export type DocumentKind = typeof DocumentKind[keyof typeof DocumentKind];
