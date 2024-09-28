export const AttendanceItemKind = {
  PUNITION: "Punition",
  RETARD: "Retard",
  ABSENCE: "Absence"
} as const;

export type AttendanceItemKind = typeof AttendanceItemKind[keyof typeof AttendanceItemKind];
