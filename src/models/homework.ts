import { Document } from "./document";

export type Homework = Readonly<{
  id: number;
  subject: string;
  teacher: string;
  exam: boolean;
  done: boolean;
  content: string;
  createdDate: Date;
  attachments: Document[];
}>;

export type ComingHomework = Readonly<{
  id: number;
  subject: string;
  isExam: boolean;
  done: boolean;
  createdDate: Date;
}>;
