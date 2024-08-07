import { BadCredentials, SessionTokenRequired, type DoubleAuthChallenge, type Session } from "~/models";
import { decodeDoubleAuthChallenge } from "~/decoders/double-auth-challenge";
import { decodeDoubleAuth } from "~/decoders/double-auth";
import { Request } from "~/core/request";

import { encode } from "js-base64";

export async function initDoubleAuth (session: Session): Promise<DoubleAuthChallenge> {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request("/connexion/doubleauth.awp?verbe=get")
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});

  const response = await request.send(session.fetcher);

  if (!response.token)
    throw new BadCredentials();
  else session.token = response.token;

  return decodeDoubleAuthChallenge(response.data);
}

export async function checkDoubleAuth (session: Session, answer: string): Promise<boolean> {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request("/connexion/doubleauth.awp?verbe=post")
    .addVersionURL()
    .setToken(session.token)
    .setFormData({
      choix: encode(answer)
    });

  const response = await request.send(session.fetcher);

  session.token = response.token;
  session.double_auth = decodeDoubleAuth(response.data);

  return true;
}
