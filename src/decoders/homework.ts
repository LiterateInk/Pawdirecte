import { decodeDocument } from "./document";
import { decode } from "js-base64";
import type { ClassSubject, ComingHomework, Homework } from "~/models";

export const decodeHomework = (item: any): Homework => {
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


/**
 *
 * @param matiere
 * @returns
 *
 * Feed les matières contenant les devoirs également, return les contenus de séances.
 */

export function decodeClassSubject(item: any, date: Date): ClassSubject {
  return {
    date,
    id: item.id,
    subject: item.matiere,
    teacher: item.nomProf,
    content: decode(item.contenuDeSeance?.contenu ?? ""),
    attachments: item.contenuDeSeance?.documents?.map(decodeDocument) ?? []
  };
}
