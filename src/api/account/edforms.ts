import { type Account, type Session, SessionTokenRequired } from "~/models";
import { encodeRequest, encodeRequestFormData, encodeRequestToken, encodeRequestUrlVersion } from "~/encoders/request";
import { encodeEDResponse } from "~/encoders/ed-response";

export async function accountEdforms (session: Session, account: Account): Promise<Array<unknown>> {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = encodeRequest("/edforms.awp?verbe=list");
  encodeRequestUrlVersion(request);

  encodeRequestToken(request, session.token);
  encodeRequestFormData(request, {
    idEntity: account.id,
    typeEntity: account.kind
  });

  const raw_response = await session.fetcher(request);
  const response = encodeEDResponse(raw_response);
  session.token = response.token;

  // TODO: a decoder for this, when we know what does it return.
  return response.data;
}
