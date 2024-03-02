import type { EdApiStudentTimetableItem } from "~/constants/timetable";

class TimetableItem {
  readonly #id: number;

  constructor (item: EdApiStudentTimetableItem) {
    this.#id = item.id;
  }

  public get id (): number {
    return this.#id;
  }
}

export default TimetableItem;
