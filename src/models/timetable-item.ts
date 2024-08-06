import type { TimetableItemKind } from "~/models";

export interface TimetableItem {
  readonly id: number
  /** As HEX. */
  readonly color: string
  readonly start_date: Date
  readonly end_date: Date
  readonly subject_name: string
  readonly subject_short_name: string
  readonly room: string
  readonly teacher: string
  readonly kind: TimetableItemKind
  readonly cancelled: boolean
  readonly updated: boolean
  readonly notes: string
}
