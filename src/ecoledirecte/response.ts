export interface EdApiResponseError<Codes> {
  code: Codes
  token: ""
  message: string
  data: {
    changementMDP: boolean
    accounts: []
  }
}

export interface EdApiResponse<Code, Res> {
  code: Code
  token: string
  message: ""
  data: Res
};
