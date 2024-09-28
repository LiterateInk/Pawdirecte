import { type Account, type Session, SessionTokenRequired } from "~/models";
import { Request } from "~/core/request";
import { decodeAssignments } from "~/decoders/assignment";

import { APIAssignmentsResponse, Assignments } from "~/models/assignments";
export const getAssignments = async (session: Session, account: Account, date: string): Promise<Assignments[]> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/Eleves/${account.id}/cahierdetexte/${date}.awp?verbe=get&v=4.62.1`)
    .setToken(session.token)
    .setFormData({});

  const response = await request.sendRaw(session.fetcher);

  const responseHTML = new ResponseHTML(response);
  session.token = responseHTML.token;

  return responseHTML.data.matieres.map(decodeAssignments);
};

import { getHeaderFromResponse, type Response as UnsafeResponse } from "@literate.ink/utilities";

export class ResponseHTML {
  public status: number;
  public token: string | null;
  public access_token: string | null = null;
  public message: string | null = null;
  public data: any;

  public constructor (response: UnsafeResponse) {
    this.token = getHeaderFromResponse(response, "x-token");


    const content = JSON.parse(response.content);

    this.status = content.code;
    this.data = content.data;
    this.message = content.message;

    if ("token" in content) {
      this.token = content.token;
    }

    if ("access_token" in content) {
      this.access_token = content.accessToken;
    }
  }

}
