import type { TimelineItemKind } from "~/models";

export interface TimelineItem {
  readonly title: string
  readonly description: string
  readonly content: string
  readonly element_id: number
  readonly element_kind: TimelineItemKind
  readonly date: Date
}
