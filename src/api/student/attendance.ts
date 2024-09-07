import {type Session, type Account, SessionTokenRequired, type AttendanceItem} from "~/models";
import {decodeAttendanceItem} from "~/decoders/attendance-item";
import {Request} from "~/core/request";

type AttendanceResponse = {
  punishments: Array<AttendanceItem>
  absences: Array<AttendanceItem>
};

export const studentAttendance = async (
  session: Session,
  account: Account
): Promise<AttendanceResponse> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/eleves/${account.id}/viescolaire.awp?verbe=get`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});

  const response = await request.send(session.fetcher);
  session.token = response.token;

  const punishments = response.data.sanctionsEncouragements;
  const absences = response.data.absencesRetards;

  return {
    punishments: punishments.map(decodeAttendanceItem),
    absences: absences.map(decodeAttendanceItem)
  };
};
