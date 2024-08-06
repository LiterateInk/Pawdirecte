import type { TimelineItem } from "~/models";

export function decodeTimelineItem (item: any): TimelineItem {
  return {
    title: item.titre,
    description: item.soustitre,
    content: item.contenu,
    element_id: item.idElement,
    element_kind: item.typeElement,
    date: new Date(item.date)
  };
}
