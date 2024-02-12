export type EdApiResponse<T extends {
  successCode: unknown
  successData: unknown
  errorCode: unknown
}> = {
  code: T["successCode"]
  token: string
  message: ""
  data: T["successData"]
} | {
  code: T["errorCode"]
  token: ""
  message: string
  data: {
    changementMDP: boolean
    accounts: []
  }
};
