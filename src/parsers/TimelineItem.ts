import type { EdApiStudentTimelineItem, EdApiStudentTimelineTypeElement } from "~/ecoledirecte/timeline";

class TimelineItem {
  public title: string;
  public description: string;
  public content: string;

  public element: {
    id: number
    type: EdApiStudentTimelineTypeElement
  };

  public date: Date;

  constructor (item: EdApiStudentTimelineItem) {
    this.title = item.titre;
    this.description = item.soustitre;
    this.content = item.contenu;

    this.element = {
      id: item.idElement,
      type: item.typeElement
    };

    this.date = new Date(item.date);
  }
}

export default TimelineItem;
