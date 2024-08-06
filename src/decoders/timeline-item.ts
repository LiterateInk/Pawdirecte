import { TimelineItem } from "~/models";

export function decodeTimelineItem (item: any): TimelineItem {
  return new TimelineItem(
    item.titre,
    item.soustitre,
    item.contenu,
    item.idElement,
    // (as enum value directly)
    item.typeElement,
    new Date(item.date)
  );
}
