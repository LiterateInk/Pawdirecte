export const DocumentKind = {
  Cloud: "Cloud",
  CDT: "FICHIER_CDT",
  Attachment: "PIECE_JOINTE",
  ClickNCollect: "FICHIER_MENU_RESTAURATION"
} as const;

export type DocumentKind = typeof DocumentKind[keyof typeof DocumentKind];
