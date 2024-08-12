import type { TimetableItem } from "~/models";

export const decodeTimetableItem = (item: any): TimetableItem => {
  return {
    id: item.id,
    color: item.color,
    startDate: new Date(item.start_date),
    endDate: new Date(item.end_date),
    subjectName: item.matiere,
    subjectShortName: item.codeMatiere,
    room: item.salle,
    teacher: item.prof,
    kind: item.typeCours,
    cancelled: item.isAnnule,
    updated: item.isModifie,
    notes: item.text
  };
};
