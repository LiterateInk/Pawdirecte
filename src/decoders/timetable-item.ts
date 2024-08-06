import { TimetableItem } from "~/models";

export function decodeTimetableItem (item: any): TimetableItem {
  return new TimetableItem(
    item.id,
    item.color,
    new Date(item.start_date),
    new Date(item.end_date),
    item.matiere,
    item.codeMatiere,
    item.salle,
    item.prof,
    item.typeCours,
    item.isAnnule,
    item.isModifie,
    item.text
  );
}
