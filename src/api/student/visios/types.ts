import type { EdApiResponse } from "~/ecoledirecte/response";

export interface EdApiStudentVisios {
  errors: 520 | 225,
  // TODO: If someone have a video conference one day, please tell me what is the response here !
  response: EdApiResponse<200, Array<unknown>>

  request: {}
}

export interface EdStudentVisios {
  input: {
    token: string
    studentID: string
  }

  output: EdApiStudentVisios["response"]
}
