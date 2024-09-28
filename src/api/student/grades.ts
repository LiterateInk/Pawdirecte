import { type Account, Grade, Period, type Session, SessionTokenRequired, GradeValue } from "~/models";
import { Request } from "~/core/request";
import { decodeGrade } from "~/decoders/grade";
import { decodePeriod } from "~/decoders/period";
import { decodeGradeValue } from "~/decoders/grade-value";

type SubjectOverview = {
  classAverage: GradeValue
  overallAverage: GradeValue
  subjects: {
    name: string
    id: string
    childSubjectId: string
    isChildSubject: boolean
    color: string
    classAverage: GradeValue
    maxAverage: GradeValue
    minAverage: GradeValue
    studentAverage: GradeValue
    outOf: GradeValue
  }[]
}

type GradesResponse = {
  grades: Array<Grade>
  periods: Array<Period>
  overview: {
    [key: string]: SubjectOverview
  }
};

const buildOverview = (data: any): GradesResponse["overview"] => {
  const overview: GradesResponse["overview"] = {};
  const outOf = data.parametrage.moyenneSur

  for (const period of data.periodes) {
    const subjects = period.ensembleMatieres.disciplines;
    overview[period.idPeriode] = {
      classAverage: decodeGradeValue(period.ensembleMatieres.moyenneClasse),
      overallAverage: decodeGradeValue(period.ensembleMatieres.moyenneGenerale),
      subjects: []
    }
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
      })
    }
  }

  return overview;
};

/**
 * @param year "The year to fetch grades in YYYY format." SENSITIVE PARAMETER NOT ALL ACCOUNTS CAN DO THAT
 */
export const studentGrades = async (session: Session, account: Account, year: string): Promise<GradesResponse> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/eleves/${account.id}/notes.awp?verbe=get`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({
      anneeScolaire: year
    });

  const response = await request.send(session.fetcher);
  session.token = response.token;

  // TODO: return parameters like colors ect...
  return {
    grades: response.data.notes?.map(decodeGrade),
    periods: response.data.periodes?.map(decodePeriod),
    overview: buildOverview(response.data)
  };
};
