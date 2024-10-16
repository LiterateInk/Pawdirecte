import {type Account, type Session, SessionTokenRequired, type ComingHomework, type ClassSubject} from "~/models";
import {Request} from "~/core/request";
import {decodeClassSubject, decodeComingHomework, decodeHomework} from "~/decoders/homework";
import type {Homework} from "~/models";


export const studentHomeworks = async (
  session: Session,
  account: Account,
  date: string
): Promise<{ homeworks: Homework[], subjects: ClassSubject[] }> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/Eleves/${account.id}/cahierdetexte/${date}.awp?verbe=get`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});
  const response = await request.send(session.fetcher);

  session.token = response.token;

  const homeworks = response.data?.matieres.filter((h: any) => h.aFaire).map(decodeHomework);
  const subjects = response.data?.matieres.map((item: any) => decodeClassSubject(item, new Date(date))).filter((subject: ClassSubject) => subject.attachments.length > 0 || subject.content !== "");
  return { homeworks, subjects };
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
