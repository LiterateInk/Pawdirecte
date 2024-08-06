import type { TimetableItem } from "~/models";

export function decodeTimetableItem (item: any): TimetableItem {
  return {
    id: item.id,
    color: item.color,
    start_date: new Date(item.start_date),
    end_date: new Date(item.end_date),
    subject_name: item.matiere,
    subject_short_name: item.codeMatiere,
    room: item.salle,
    teacher: item.prof,
    kind: item.typeCours,
    cancelled: item.isAnnule,
    updated: item.isModifie,
    notes: item.text
  };
}
