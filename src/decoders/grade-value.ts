import { GradeValue, GradeKind } from "~/models";

export const decodeGradeValue = (value: string): GradeValue => {
  switch (value) {
    case "Disp":
    case "Disp ":
      return {
        kind: GradeKind.Exempted,
        points: 0
      };
    case "Abs":
      return {
        kind: GradeKind.Absent,
        points: 0
      };
    default:
      return {
        kind: GradeKind.Grade,
        points: Number(value)
      };
  }
};
