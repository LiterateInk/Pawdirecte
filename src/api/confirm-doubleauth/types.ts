import type { EdApiDoubleAuthValues } from "~/constants/auth";
import type { EdApiResponse } from "~/ecoledirecte/response";

export interface EdApiConfirmDoubleAuth {
  errors: 0 // Not sure yet what the error codes are.
  response: EdApiResponse<200, EdApiDoubleAuthValues>

  request: {
    /** Encoded in base 64, the answer to the question. */
    choix: string
  }
}

export interface ApiConfirmDoubleAuth {
  input: {
    /** UTF-8 encoded choice. Will be converted to base64 in the handler. */
    choice: string
    token: string
  }

  output: {
    token: string
    values: EdApiDoubleAuthValues
  }
}
