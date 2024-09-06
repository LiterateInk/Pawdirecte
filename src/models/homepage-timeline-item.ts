export type HomepageTimelineItem = Readonly<{
  id: string;
  content: string;
  authorName: string
  creationDate: Date;
  startDate: Date;
  endDate: Date;
  colorName: string
}>;
