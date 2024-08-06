import { TimelineItem } from "~/models";

export function decodeTimelineItem (content: any): TimelineItem {
  return new TimelineItem(
    content.titre,
    content.soustitre,
    content.contenu,
    content.idElement,
    // (as enum value directly)
    content.typeElement,
    new Date(content.date)
  );
}
