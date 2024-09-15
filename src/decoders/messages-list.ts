import { APIReceivedMessageType, ReceivedMessage } from "~/models/message";

export const decodeMesssagesList = (message: APIReceivedMessageType): ReceivedMessage => {
  return {
    id: message.id,
    type: message.mtype,
    read: message.read,
    subject: message.subject,
    date: new Date(message.date),
    sender: message.from.name,
    canAnswer: message.canAnswer,
    content: message.content,
    files: message.files.map((file) => ({ // to download attachement GET /telechargement.awp?leTypeDeFichier={type}&fichierId={id}
      id: file.id,
      name: file.libelle,
      type: file.type
    }))
  };
};
