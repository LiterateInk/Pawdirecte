import { Subject } from "~/models/subject";
import { GradeValue } from "~/models/grade-value";
import { Skill } from "~/models/skill";

// TODO: integrate QCM
export type Grade = Readonly<{
  comment: string
  /**
   * @example "Devoir Maison"
   * @example "Devoir sur table"
   */
  examType: string
  period: {
    id: string
    name: string
  }
  subject: Subject
  coefficient: number
  value: GradeValue
  max: GradeValue;
  min: GradeValue;
  average: GradeValue
  isOptional: boolean
  outOf: number
  date: Date
  subjectFilePath: string
  corectionFilePath: string
  skills: Skill[]
}>;
