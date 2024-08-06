import type { DoubleAuthChallenge, Session } from "~/models";

import { encode_form_body, encode_token, encode_version, init_request } from "~/encoders/request";
import { decodeDoubleAuthChallenge } from "~/decoders/double-auth-challenge";
import { decodeDoubleAuth } from "~/decoders/double-auth";

import { getHeaderFromResponse } from "@literate.ink/utilities";
import { btoa } from "js-base64";

export async function initDoubleAuth (session: Session): Promise<DoubleAuthChallenge> {
  if (!session.token)
    throw new Error("Session token is required to fetch double auth challenge");

  const request = init_request("/connexion/doubleauth.awp?verbe=get");
  encode_version(request);

  encode_token(request, session.token);
  encode_form_body(request, {});

  const response = await session.fetcher(request);
  const token = getHeaderFromResponse(response, "X-Token");

  if (!token)
    throw new Error("No token found in the response headers");
  else session.token = token;

  const json = JSON.parse(response.content);
  return decodeDoubleAuthChallenge(json.data);
}

export async function checkDoubleAuth (session: Session, answer: string): Promise<boolean> {
  if (!session.token)
    throw new Error("Session token is required to confirm double auth");

  const request = init_request("/connexion/doubleauth.awp?verbe=post");
  encode_version(request);

  encode_token(request, session.token);
  encode_form_body(request, {
    choix: btoa(answer)
  });

  const response = await session.fetcher(request);
  const json = JSON.parse(response.content);

  session.double_auth = decodeDoubleAuth(json.data);
  return true;
}
