import { GradesOverview } from "~/models";
import { decodeGradeValue } from "./grade-value";

export const buildOverview = (data: any): GradesOverview => {
  const overview: GradesOverview = {};
  const outOf = data.parametrage.moyenneSur;
  const showStudentAverage = data.parametrage.moyenneGenerale;

  for (const period of data.periodes) {
    const subjects = period.ensembleMatieres.disciplines;
    overview[period.idPeriode] = {
      classAverage: decodeGradeValue(period.ensembleMatieres.moyenneClasse),
      overallAverage: showStudentAverage ? decodeGradeValue(period.ensembleMatieres.moyenneGenerale) : getOverallAverageFromClassAverage(period),
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
        classAverage: decodeGradeValue(subject.moyenneClasse?.replace(",", ".")),
        maxAverage: decodeGradeValue(subject.moyenneMax?.replace(",", ".")),
        minAverage: decodeGradeValue(subject.moyenneMin?.replace(",", ".")),
        studentAverage: decodeGradeValue(subject.moyenne?.replace(",", ".")),
        outOf: decodeGradeValue(outOf)
      });
    }
  }

  return overview;
};

function getOverallAverageFromClassAverage(period: any) {

  const grades = [];
  let sum = 0;

  const subjects = period.ensembleMatieres.disciplines;

  for (const subject of subjects) {
    if (subject.moyenne !== ""){
      grades.push(
        decodeGradeValue(subject.moyenne?.replace(",", ".")).points
      );
      sum += decodeGradeValue(subject.moyenne?.replace(",", ".")).points;
    }
  }

  return decodeGradeValue((sum / grades.length).toString());
}
