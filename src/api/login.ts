import { type Session, type AccountKind, type Account, DoubleAuthRequired } from "~/models";
import type { Request, Response } from "@literate.ink/utilities";

import { encode_form_body, encode_token, encode_version, init_request } from "~/encoders/request";
import { encodeDoubleAuth } from "~/encoders/double-auth";
import { decodeAccount } from "~/decoders/account";

function initBaseRequest (body: Record<string, unknown>, token: string | null = null): Request {
  const request = init_request("/login.awp");
  encode_version(request);
  encode_form_body(request, body);
  if (token) encode_token(request, token);
  return request;
};

export async function login (session: Session, password: string): Promise<Array<Account>> {
  const encoded_double_auth = encodeDoubleAuth(session.double_auth);
  const request = initBaseRequest({
    ...encoded_double_auth,
    fa: encoded_double_auth && [encoded_double_auth],

    identifiant: session.username,
    uuid: session.device_uuid,
    isReLogin: false,
    sesouvenirdemoi: true,
    motdepasse: password
  }, session.token);

  const response = await session.fetcher(request);
  return parseResponse(session, response);
}

export async function refresh (session: Session, account_token: string, account_kind: AccountKind): Promise<Array<Account>> {
  if (!session.token)
    throw new Error("Session token is required to refresh a session");

  const request = initBaseRequest({
    fa: [encodeDoubleAuth(session.double_auth)],

    identifiant: session.username,
    uuid: session.device_uuid,
    isReLogin: true,
    motdepasse: "???",
    typeCompte: account_kind,
    accesstoken: account_token
  }, session.token);

  const response = await session.fetcher(request);
  return parseResponse(session, response);
}

export function parseResponse (session: Session, response: Response): Array<Account> {
  const content = JSON.parse(response.content);

  if ("token" in content)
    session.token = content.token;

  switch (content.code) {
    case 505:
      throw new Error("Invalid credentials");
    case 517:
      throw new Error("Invalid version, please open an issue at the 'LiterateInk/Pawdirecte' GitHub repository.");
    case 250:
      throw new DoubleAuthRequired();
  }

  return content.data.accounts.map(decodeAccount);
}
