import { BadCredentials, SessionTokenRequired, type DoubleAuthChallenge, type Session } from "~/models";

import { encodeRequestFormData, encodeRequestToken, encodeRequestUrlVersion, encodeRequest } from "~/encoders/request";
import { decodeDoubleAuthChallenge } from "~/decoders/double-auth-challenge";
import { decodeDoubleAuth } from "~/decoders/double-auth";

import { getHeaderFromResponse } from "@literate.ink/utilities";
import { btoa } from "js-base64";

export async function initDoubleAuth (session: Session): Promise<DoubleAuthChallenge> {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = encodeRequest("/connexion/doubleauth.awp?verbe=get");
  encodeRequestUrlVersion(request);

  encodeRequestToken(request, session.token);
  encodeRequestFormData(request, {});

  const response = await session.fetcher(request);
  const token = getHeaderFromResponse(response, "X-Token");

  if (!token)
    throw new BadCredentials();
  else session.token = token;

  const json = JSON.parse(response.content);
  return decodeDoubleAuthChallenge(json.data);
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

  const response = await session.fetcher(request);
  const json = JSON.parse(response.content);

  session.double_auth = decodeDoubleAuth(json.data);
  return true;
}
