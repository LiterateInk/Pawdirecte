import type { TimelineItemKind } from "~/models";

export type TimelineItem = Readonly<{
  title: string
  description: string
  content: string
  elementID: number
  elementKind: TimelineItemKind
  date: Date
}>;
