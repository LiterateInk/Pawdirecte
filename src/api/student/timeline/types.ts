import type { EdApiResponse } from "~/ecoledirecte/response";
import type { EdApiStudentTimelineItem } from "~/ecoledirecte/timeline";

export interface EdApiStudentTimeline {
  errors: 520 | 225,
  response: EdApiResponse<200, Array<EdApiStudentTimelineItem>>

  request: {}
}

export interface EdStudentTimeline {
  input: {
    token: string
    studentID: string
  }

  output: EdApiStudentTimeline["response"]
}
