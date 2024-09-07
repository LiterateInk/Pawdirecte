import type { AttendanceItemKind } from "~/models";


export type AttendanceItem = Readonly<{
  id: number
  studentId: number
  studentName: string
  reason: string
  date: Date
  dateOfEvent: Date
  label: string
  teacher: string
  comment: string
  justified: boolean
  justificationType: string
  onlineJustification: boolean
  todo: boolean
  kind: AttendanceItemKind
}>;
