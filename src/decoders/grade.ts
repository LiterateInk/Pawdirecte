import { Grade } from "~/models";
import { decodeGradeValue } from "~/decoders/grade-value";
import { decodeSkill } from "~/decoders/skill";

export const decodeGrade = (item: any): Grade => {
  return {
    comment: item.devoir,
    average: decodeGradeValue(item.moyenneClasse),
    isOptional: item.valeurisee,
    skills: item.elementsProgramme.map(decodeSkill),
    coefficient: Number(item.coef),
    date: new Date(item.date),
    examType: item.typeDevoir,
    max: decodeGradeValue(item.maxClasse),
    min: decodeGradeValue(item.minClasse),
    outOf: item.noteSur,
    period: {
      id: item.codePeriode,
      name: ""
    },
    subject: {
      id: item.codeMatiere,
      subSubjectId: item.codeSousMatiere,
      name: item.libelleMatiere
    },
    value: decodeGradeValue(item.valeur)
  };
};
