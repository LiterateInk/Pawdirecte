import type { EdApiAccount } from "~/ecoledirecte/account";

export interface EdApiLogin {
  response: {
    code: 200
    token: string
    message: ""
    data: {
      changementMDP: boolean
      accounts: Array<EdApiAccount>
    }
  } | {
    code: 505 | 522
    token: ""
    message: string
    data: {
      changementMDP: boolean
      accounts: []
    }
  }

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
