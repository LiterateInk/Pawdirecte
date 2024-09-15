import { type Account, type Session, SessionTokenRequired, type TimelineItem } from "~/models";
import { Request } from "~/core/request";
import { APIReceivedMessagesList } from "~/models/messages-list";
import type { APIReceivedMessage, ReceivedMessage } from "~/models/message";
import { decodeMesssagesList } from "~/decoders/messages-list";

export const studentReceivedMessages = async (session: Session, account: Account): Promise<Array<ReceivedMessage>> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/eleves/${account.id}/messages.awp?verbe=get`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});

  const response: APIReceivedMessagesList = await request.send(session.fetcher);
  session.token = response.token;

  return response.data.messages.received.map(decodeMesssagesList).sort((m1, m2) => m1.date < m2.date);
};

export const readMessage = async (session: Session, account: Account, id: number): Promise<ReceivedMessage> => {
  if (!session.token)
    throw new SessionTokenRequired();
  const request = new Request(`/eleves/${account.id}/messages/${id}.awp?verbe=get&mode=destinataire`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});

  const response: APIReceivedMessage = await request.send(session.fetcher);
  session.token = response.token;

  return {
    id: response.data.id,
    type: response.data.mtype,
    date: new Date(response.data.date),
    read: response.data.read,
    canAnswer: response.data.canAnswer,
    subject: response.data.subject,
    content: Buffer.from(response.data.content, "base64"),
    sender: response.data.from.name,
    files: response.data.files.map((file) => ({ // to download attachement GET /telechargement.awp?leTypeDeFichier={type}&fichierId={id}
      id: file.id,
      name: file.libelle,
      type: file.type
    }))
  };
};

