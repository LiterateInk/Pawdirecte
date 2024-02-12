import type { EdApiAccount } from "~/ecoledirecte/account";
import type { EdApiResponse } from "~/ecoledirecte/response";

export interface EdApiLogin {
  response: EdApiResponse<{
    successCode: 200,
    errorCode: 505 | 522,
    successData: {
      changementMDP: boolean
      accounts: Array<EdApiAccount>
    }
  }>

  request: {
    identifiant: string
    motdepasse: string
    /** NOTE: Not sure what this does. */
    isReLogin: boolean
    /** NOTE: Not sure where this is stored. */
    uuid: string
  }
}

export interface EdLogin {
  input: {
    username: string
    password: string
  }

  output: EdApiLogin["response"]
}
