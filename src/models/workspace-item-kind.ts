export const WorkspaceItemKind = {
  LIBRE: "LIBRE"
  //OTHER ?
} as const;

export type WorkspaceItemKind = typeof WorkspaceItemKind[keyof typeof WorkspaceItemKind];
