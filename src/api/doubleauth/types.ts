import type { EdApiResponse } from "~/ecoledirecte/response";

export interface EdApiDoubleAuth {
  errors: 0 // Not sure yet what the error codes are.
  response: EdApiResponse<200, {
    /**
     * Encoded in base64, the question to answer.
     * @example "UXVlbCBlc3QgbGUgc2VucyBkZSBsYSB2aWUgPw==" // = "Quel est le sens de la vie ?"
     */
    question: string
    /**
     * The propositions to answer the question that are also encoded in base64.
     * @example ["NDI==", "TGUgZnJvbWFnZQ=="]
     */
    propositions: Array<string>
  }>

  request: {}
}

export interface ApiDoubleAuth {
  input: { token: string }
  output: {
    question: string
    answers: string[]
    token: string
  }
}
