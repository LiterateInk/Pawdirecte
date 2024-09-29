import { GradeValue, GradeKind } from "~/models";

export const decodeGradeValue = (value: string, noteSur: number = 20): GradeValue => {
  if (!value) return {kind: GradeKind.Error, points: 0};

  switch (value) {
    case "Disp":
      return {
        kind: GradeKind.Exempted,
        points: 0
      };
    case "Abs":
      return {
        kind: GradeKind.Absent,
        points: 0
      };
    case "NE": // Unknown, so putting not graded
    case "EA": // "Non évalué"
      return {
        kind: GradeKind.NotGraded,
        points: 0
      };
    default:
      try {
        return {
          kind: GradeKind.Grade,
          points: (Number(value) * 20 / noteSur)
        };
      }
      catch {
        return {
          kind: GradeKind.Error,
          points: 0
        };
      }
  }
};
