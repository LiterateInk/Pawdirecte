import {type Account, type Session, SessionTokenRequired, ComingHomework} from "~/models";
import {Request} from "~/core/request";
import {decodeComingHomework, decodeHomework} from "~/decoders/homework";
import {Homework} from "~/models";

export const studentHomeworks = async (
  session: Session,
  account: Account,
  date: string
): Promise<Homework[]> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/Eleves/${account.id}/cahierdetexte/${date}.awp?verbe=get`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});
  const response = await request.send(session.fetcher);
  session.token = response.token;
  console.log(response.data);
  return response.data?.matieres.filter((h: any) => h.aFaire).map(decodeHomework);
};


export const studentComingHomeworks = async (
  session: Session,
  account: Account
): Promise<{ date: Date, homeworks: ComingHomework[] }[]> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/Eleves/${account.id}/cahierdetexte.awp?verbe=get`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});

  const response = await request.send(session.fetcher);
  session.token = response.token;
  return Object.keys(response.data).map((date: string) => {
    return {
      date: new Date(date),
      homeworks: response.data[date].map(decodeComingHomework)
    };
  });
};


export const setHomeworkState = async (
  session: Session,
  account: Account,
  homeworkId: number,
  done: boolean
): Promise<void> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/Eleves/${account.id}/cahierdetexte.awp?verbe=put`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({
      idDevoirsEffectues: [done ? homeworkId : null],
      idDevoirsNonEffectues: [done ? null : homeworkId]
    });

  await request.send(session.fetcher);
};
