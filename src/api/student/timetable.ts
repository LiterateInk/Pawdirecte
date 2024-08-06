import { type Session, type Account, SessionTokenRequired, type TimetableItem } from "~/models";
import { encodeRequest, encodeRequestFormData, encodeRequestToken, encodeRequestUrlVersion } from "~/encoders/request";
import { encodeEDResponse } from "~/encoders/ed-response";
import { decodeTimetableItem } from "~/decoders/timetable-item";

/**
 * @param startDate Timetable starting from this date.
 * @param endDate When not defined, it's the same as `from` so it displays the timetable for the day.
 */
export async function studentTimetable (
  session: Session,
  account: Account,
  startDate: Date,
  endDate = startDate
): Promise<Array<TimetableItem>> {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = encodeRequest(`/E/${account.id}/emploidutemps.awp?verbe=get`);
  encodeRequestUrlVersion(request);

  encodeRequestToken(request, session.token);
  encodeRequestFormData(request, {
    dateDebut: startDate.toLocaleDateString("fr-CA"),
    dateFin: endDate.toLocaleDateString("fr-CA"),
    avecTrous: false
  });

  const raw_response = await session.fetcher(request);
  const response = encodeEDResponse(raw_response);
  session.token = response.token;

  return response.data.map(decodeTimetableItem);
}
