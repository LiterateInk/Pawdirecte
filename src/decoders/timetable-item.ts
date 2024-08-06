import { TimetableItem } from "~/models";

export function decodeTimetableItem (content: any): TimetableItem {
  return new TimetableItem(
    content.id,
    content.color,
    new Date(content.start_date),
    new Date(content.end_date),
    content.matiere,
    content.codeMatiere,
    content.salle,
    content.prof,
    content.typeCours,
    content.isAnnule,
    content.isModifie,
    content.text
  );
}
