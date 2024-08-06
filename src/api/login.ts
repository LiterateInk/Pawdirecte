import type { Request, Response } from "@literate.ink/utilities";

import {
  type Session,
  type AccountKind,
  type Account,

  DoubleAuthRequired,
  SessionTokenRequired,
  BadCredentials,
  InvalidVersion
} from "~/models";

import { encodeRequestFormData, encodeRequestToken, encodeRequestUrlVersion, encodeRequest } from "~/encoders/request";
import { encodeDoubleAuth } from "~/encoders/double-auth";
import { encodeEDResponse } from "~/encoders/ed-response";
import { decodeAccount } from "~/decoders/account";

/**
 * Creates the base request for login
 * and refresh since they both have
 * a similar structure.
 */
function initBaseRequest (body: Record<string, unknown>, token: string | null = null): Request {
  const request = encodeRequest("/login.awp");
  encodeRequestUrlVersion(request);
  encodeRequestFormData(request, body);
  if (token) encodeRequestToken(request, token);
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
    throw new SessionTokenRequired();

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

export function parseResponse (session: Session, raw_response: Response): Array<Account> {
  const response = encodeEDResponse(raw_response);
  session.token = response.token;

  switch (response.status) {
    case 505:
      throw new BadCredentials();
    case 517:
      throw new InvalidVersion();
    case 250:
      throw new DoubleAuthRequired();
  }

  return response.data.accounts.map(decodeAccount);
}
