import type { EdApiResponse } from "~/ecoledirecte/response";

export interface EdApiEdforms {
  errors: 225
  // TODO: What is the return ?
  // I have an empty array in my tests...
  response: EdApiResponse<200, Array<unknown>>

  request: {
    // TODO: Should be converted to an enum when more information is available.
    typeEntity: "E"

    /** `id` but as an number. */
    idEntity: number
  }
}

export interface EdEdforms {
  input: {
    id: string
    token: string
  }

  output: EdApiEdforms["response"]
}
