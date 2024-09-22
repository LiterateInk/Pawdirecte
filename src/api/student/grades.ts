import { type Account, Grade, Period, type Session, SessionTokenRequired, GradeValue } from "~/models";
import { Response } from "~/core/response";
import { Request } from "~/core/request";
import { decodeGrade } from "~/decoders/grade";
import { decodePeriod } from "~/decoders/period";

type GradesResponse = {
  grades: Array<Grade>
  periods: Array<Period>
  overview: {
    [key: string]: {
      classAverage: number
      overallAverage: number
      subjects: {
        name: string
        color: string
        classAverage: GradeValue
        maxAverage: GradeValue
        minAverage: GradeValue
        studentAverage: GradeValue
        outOf: GradeValue
      }[]
    }
  }
};

const buildOverview = (data: any): GradesResponse["overview"] => {
  const overview = {}
  for (const period of data.periodes) {
    // TODO
  }
  // TODO
  return {}
}

/**
 * @param year "The year to fetch grades in YYYY format." SENSITIVE PARAMATER NOT ALL ACCOUNTS CAN DO THAT
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
