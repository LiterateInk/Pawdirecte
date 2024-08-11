import { type Session, type Account, SessionTokenRequired, type TimetableItem } from "~/models";
import { decodeTimetableItem } from "~/decoders/timetable-item";
import { Request } from "~/core/request";

/**
 * @param startDate Timetable starting from this date.
 * @param endDate When not defined, it's the same as `from` so it displays the timetable for the day.
 */
export const studentTimetable = async (
  session: Session,
  account: Account,
  startDate: Date,
  endDate = startDate
): Promise<Array<TimetableItem>> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/E/${account.id}/emploidutemps.awp?verbe=get`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({
      dateDebut: startDate.toLocaleDateString("fr-CA"),
      dateFin: endDate.toLocaleDateString("fr-CA"),
      avecTrous: false
    });

  const response = await request.send(session.fetcher);
  session.token = response.token;

  return response.data.map(decodeTimetableItem);
};
