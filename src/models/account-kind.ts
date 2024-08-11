export const AccountKind = {
  STUDENT: "E"
} as const;

export type AccountKind = typeof AccountKind[keyof typeof AccountKind];
