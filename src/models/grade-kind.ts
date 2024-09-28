export const GradeKind = {
  Error: -1,
  Grade: 0,
  Absent: 1,
  Exempted: 2,
  NotGraded: 3
} as const;
// Stolen from pawnote

export type GradeKind = typeof GradeKind[keyof typeof GradeKind];
