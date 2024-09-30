import { GradesOverview } from "~/models";
import { decodeGradeValue } from "./grade-value";

export const buildOverview = (data: any): GradesOverview => {
  const overview: GradesOverview = {};
  const outOf = data.parametrage.moyenneSur;
  const showStudentAverage = data.parametrage.moyenneGenerale;
  const showYearlyPeriod = data.parametrage.notePeriodeAnnuelle;

  for (const period of data.periodes) {
    if (!period.annuel && !showYearlyPeriod) {
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
  }

  return overview;
};

function getOverallAverageFromClassAverage(period: any) {

  let count = 0;
  let sum = 0;

  const subjects = period.ensembleMatieres.disciplines;

  for (const subject of subjects) {
    if (subject.moyenne !== ""){
      const grade = decodeGradeValue(subject.moyenne?.replace(",", ".")).points;
      const coef = subject.coef == 0 ? 1: subject.coef;
      count += coef;
      sum += grade * coef;
    }
  }

  return decodeGradeValue((sum / count).toString());
}
