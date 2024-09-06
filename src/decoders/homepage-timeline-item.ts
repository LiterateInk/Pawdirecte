import type { HomepageTimelineItem } from "~/models";
import { decode } from "js-base64";
import { decodeFrenchDate } from "./dates";

export const decodeHomepageTimelineItem = (item: any): HomepageTimelineItem => {
  return {
    authorName: item.auteur.nom,
    creationDate: decodeFrenchDate(item.dateCreation),
    startDate: decodeFrenchDate(item.dateDebut),
    endDate: decodeFrenchDate(item.dateFin),
    id: item.id,
    content: decode(item.contenu),
    colorName: item.type
  };
};
