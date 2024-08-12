import type { TimelineItem } from "~/models";

export const decodeTimelineItem = (item: any): TimelineItem => {
  return {
    title: item.titre,
    description: item.soustitre,
    content: item.contenu,
    elementID: item.idElement,
    elementKind: item.typeElement,
    date: new Date(item.date)
  };
};
