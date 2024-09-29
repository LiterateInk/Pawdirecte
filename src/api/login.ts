import {
  type Session,
  type AccountKind,
  type Account,

  DoubleAuthRequired,
  SessionTokenRequired,
  BadCredentials,
  InvalidVersion
} from "~/models";

import { encodeDoubleAuth } from "~/encoders/double-auth";
import { decodeAccount } from "~/decoders/account";
import { Request } from "~/core/request";

const init = (body: Record<string, unknown>, token: string | null = null): Request => {
  const request = new Request("/login.awp")
    .addVersionURL()
    .setFormData(body);

  if (token) request.setToken(token);
  return request;
};

export const login = async (session: Session, password: string): Promise<Array<Account>> => {
  const encoded_double_auth = encodeDoubleAuth(session.double_auth);
  const request = init({
    ...encoded_double_auth,
    fa: encoded_double_auth && [encoded_double_auth],

    identifiant: session.username,
    uuid: session.device_uuid,
    isReLogin: false,
    sesouvenirdemoi: true,
    motdepasse: encodeURI(password)
  }, session.token);

  return pipe(session, request);
};

export const refresh = async (session: Session, account_kind: AccountKind): Promise<Array<Account>> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = init({
    fa: [encodeDoubleAuth(session.double_auth)],

    identifiant: session.username,
    uuid: session.device_uuid,
    isReLogin: true,
    motdepasse: "???",
    typeCompte: account_kind,
    accesstoken: session.accessToken
  }, session.token);

  return pipe(session, request);
};

const pipe = async (session: Session, request: Request): Promise<Array<Account>> => {
  const response = await request.send(session.fetcher);
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
};

export const setAccessToken = (session: Session, account: Account) => {
  session.accessToken = account.access_token
}
