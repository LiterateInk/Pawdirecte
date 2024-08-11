import type { TimelineItem } from "~/models";

export const decodeTimelineItem = (item: any): TimelineItem => {
  return {
    title: item.titre,
    description: item.soustitre,
    content: item.contenu,
    element_id: item.idElement,
    element_kind: item.typeElement,
    date: new Date(item.date)
  };
};
