import { BadCredentials, SessionTokenRequired, type DoubleAuthChallenge, type Session } from "~/models";
import { encodeRequestFormData, encodeRequestToken, encodeRequestUrlVersion, encodeRequest } from "~/encoders/request";
import { encodeEDResponse } from "~/encoders/ed-response";
import { decodeDoubleAuthChallenge } from "~/decoders/double-auth-challenge";
import { decodeDoubleAuth } from "~/decoders/double-auth";

import { btoa } from "js-base64";

export async function initDoubleAuth (session: Session): Promise<DoubleAuthChallenge> {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = encodeRequest("/connexion/doubleauth.awp?verbe=get");
  encodeRequestUrlVersion(request);

  encodeRequestToken(request, session.token);
  encodeRequestFormData(request, {});

  const raw_response = await session.fetcher(request);
  const response = encodeEDResponse(raw_response);

  if (!response.token)
    throw new BadCredentials();
  else session.token = response.token;

  return decodeDoubleAuthChallenge(response.data);
}

export async function checkDoubleAuth (session: Session, answer: string): Promise<boolean> {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = encodeRequest("/connexion/doubleauth.awp?verbe=post");
  encodeRequestUrlVersion(request);

  encodeRequestToken(request, session.token);
  encodeRequestFormData(request, {
    choix: btoa(answer)
  });

  const raw_response = await session.fetcher(request);
  const response = encodeEDResponse(raw_response);

  session.token = response.token;
  session.double_auth = decodeDoubleAuth(response.data);

  return true;
}
