import type { TimetableItemKind } from "~/models";

export type TimetableItem = Readonly<{
  id: number
  /** As HEX. */
  color: string
  start_date: Date
  end_date: Date
  subject_name: string
  subject_short_name: string
  room: string
  teacher: string
  kind: TimetableItemKind
  cancelled: boolean
  updated: boolean
  notes: string
}>;
