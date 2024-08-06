import { TimelineItemKind } from "~/models";

export class TimelineItem {
  public constructor (
    public title: string,
    public description: string,
    public content: string,
    public element_id: number,
    public element_kind: TimelineItemKind,
    public date: Date
  ) {}
}
