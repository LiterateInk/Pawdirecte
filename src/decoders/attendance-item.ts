import type { AttendanceItem } from "~/models";

export const decodeAttendanceItem = (item: any): AttendanceItem => {
  return {
    id: item.id,
    studentId: item.idEleve,
    studentName: item.nomEleve,
    reason: item.motif,
    date: new Date(item.date),
    dateOfEvent: new Date(item.dateDeroulement),
    label: item.libelle,
    teacher: item.par,
    comment: item.commentaire,
    justified: item.justifie,
    justificationType: item.typeJustification,
    onlineJustification: item.justifieEd,
    todo: item.aFaire,
    kind: item.typeElement,
    displayDate: item.displayDate
  };
};
