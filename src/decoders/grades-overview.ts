import { GradesOverview } from "~/models";
import { decodeGradeValue } from "./grade-value";

export const buildOverview = (data: any): GradesOverview => {
  const overview: GradesOverview = {};
  const outOf = data.parametrage.moyenneSur;

  for (const period of data.periodes) {
    const subjects = period.ensembleMatieres.disciplines;
    overview[period.idPeriode] = {
      classAverage: decodeGradeValue(period.ensembleMatieres.moyenneClasse),
      overallAverage: decodeGradeValue(period.ensembleMatieres.moyenneGenerale),
      subjects: []
    };
    for (const subject of subjects) {
      overview[period.idPeriode].subjects.push({
        name: subject.discipline,
        id: subject.codeMatiere,
        childSubjectId: subject.codeSousMatiere,
        isChildSubject: subject.sousMatiere,
        // TODO
        color: "string",
        classAverage: decodeGradeValue(subject.moyenneClasse),
        maxAverage: decodeGradeValue(subject.moyenneMax),
        minAverage: decodeGradeValue(subject.moyenneMin),
        studentAverage: decodeGradeValue(subject.moyenne),
        outOf: decodeGradeValue(outOf)
      });
    }
  }

  return overview;
};
