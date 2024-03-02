import type { EdApiResponse } from "~/ecoledirecte/response";
import type { EdApiStudentTimetableItem } from "~/constants/timetable";

export interface EdApiStudentTimetable {
  errors: 520 | 225,
  response: EdApiResponse<200, Array<EdApiStudentTimetableItem>>

  request: {
    dateDebut: string
    dateFin: string
    avecTrous: boolean
  }
}

export interface EdStudentTimetable {
  input: {
    token: string
    studentID: string

    startDate: Date
    endDate: Date
  }

  output: EdApiStudentTimetable["response"]
}
