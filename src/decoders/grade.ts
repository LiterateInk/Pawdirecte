import { Grade } from "~/models";
import { decodeGradeValue } from "~/decoders/grade-value";
import { decodeSkill } from "~/decoders/skill";

export const decodeGrade = (item: any): Grade => {
  return {
    comment: item.devoir,
    average: decodeGradeValue(item.moyenneClasse, item.noteSur),
    isOptional: item.valeurisee,
    skills: item.elementsProgramme.map(decodeSkill),
    coefficient: Number(item.coef),
    date: new Date(item.date),
    examType: item.typeDevoir,
    max: decodeGradeValue(item.maxClasse, item.noteSur),
    min: decodeGradeValue(item.minClasse, item.noteSur),
    outOf: 20,
    period: {
      id: item.codePeriode,
      // TODO: fill name
      name: ""
    },
    subject: {
      id: item.codeMatiere,
      subSubjectId: item.codeSousMatiere,
      name: item.libelleMatiere
    },
    subjectFilePath: item.uncSujet,
    correctionFilePath: item.uncCorrige,
    value: decodeGradeValue(item.valeur, item.noteSur)
  };
};
