import type { TimelineItemKind } from "~/models";

export type TimelineItem = Readonly<{
  title: string
  description: string
  content: string
  element_id: number
  element_kind: TimelineItemKind
  date: Date
}>;
