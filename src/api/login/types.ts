import type { EdApiAccount } from "~/ecoledirecte/account";
import type { EdApiResponse } from "~/ecoledirecte/response";
import type { EdUserType } from "~/constants/UserType";

export interface EdApiLogin {
  errors: 505 | 522
  response: EdApiResponse<200, {
    changementMDP: boolean
    accounts: Array<EdApiAccount>
  }>

  request: {
    identifiant: string
    /** UUID of the device used to remember the login. */
    uuid: string
  } & (
    | {
      isReLogin: false
      motdepasse: string
      sesouvenirdemoi: true
    }
    | {
      isReLogin: true
      motdepasse: "???"
      typeCompte: keyof typeof EdUserType
      accesstoken: string
    }
  )
}

export interface EdLogin {
  input: {
    username: string
    deviceUUID: string
  } & (
    | {
      recovery: false
      password: string
    }
    | {
      recovery: true
      accessToken: string
      managerToken: string
      accountType: keyof typeof EdUserType
    }
  )

  output: EdApiLogin["response"]
}
