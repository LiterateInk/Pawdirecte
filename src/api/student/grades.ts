import { type Account, Grade, type Session, SessionTokenRequired } from "~/models";
import { Request } from "~/core/request";
import { decodeGrade } from "~/decoders/grade";

/**
 * @param year "The year to fetch grades in YYYY format."
 */
export const studentGrades = async (session: Session, account: Account, year: string): Promise<Array<Grade>> => {
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

  // TODO: decode periods, skills colors and more
  return response.data.notes.map(decodeGrade);
};
