import { TimetableItemKind } from "~/models";

export class TimetableItem {
  public constructor (
    // .id
    public readonly id: number,

    // .color
    /** As HEX. */
    public readonly color: string,

    // .start_date
    public readonly start_date: Date,

    // .end_date
    public readonly end_date: Date,

    // .matiere
    public readonly subject_name: string,

    // .codeMatiere
    public readonly subject_short_name: string,

    // .salle
    public readonly room: string,

    // .prof
    public readonly teacher: string,

    // .typeCours
    public readonly kind: TimetableItemKind,

    // .isAnnule
    public readonly cancelled: boolean,

    // .isModifie
    public readonly updated: boolean,

    // .text
    public readonly notes: string
  ) {}
}
