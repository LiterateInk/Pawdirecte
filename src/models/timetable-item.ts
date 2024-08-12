import type { TimetableItemKind } from "~/models";

export type TimetableItem = Readonly<{
  id: number
  /** As HEX. */
  color: string
  startDate: Date
  endDate: Date
  subjectName: string
  subjectShortName: string
  room: string
  teacher: string
  kind: TimetableItemKind
  cancelled: boolean
  updated: boolean
  notes: string
}>;
