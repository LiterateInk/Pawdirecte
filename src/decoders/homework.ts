import { decodeDocument } from "./document";
import { decode } from "js-base64";
import { ComingHomework, Homework } from "~/models";

export const decodeHomework = (item: any): Homework => {
  if (!item.aFaire) return {content: "", id: 0, subject: "", teacher: "", exam: false, done: false, createdDate: new Date(), attachments: []}; // contenu de séance
  return {
    id: item.id,
    subject: item.matiere,
    teacher: item.nomProf,
    exam: item.interrogation,
    done: item.aFaire.effectue,
    content: decode(item.aFaire.contenu),
    createdDate: new Date(item.aFaire.donneLe),
    attachments: item.aFaire.documents.map(decodeDocument)
  };
};

export const decodeComingHomework = (item: any): ComingHomework => {
  return {
    id: item.idDevoir,
    subject: item.matiere,
    isExam: item.interrogation,
    done: item.effectue,
    createdDate: new Date(item.donneLe)
  };
};

