import { encodeEDResponse } from "~/encoders/ed-response";
import { encodeRequest, encodeRequestFormData, encodeRequestToken, encodeRequestUrlVersion } from "~/encoders/request";
import { type Account, type Session, SessionTokenRequired } from "~/models";

export async function studentVisios (session: Session, account: Account): Promise<Array<unknown>> {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = encodeRequest(`/eleves/${account.id}/visios.awp?verbe=get`);
  encodeRequestUrlVersion(request);

  encodeRequestToken(request, session.token);
  encodeRequestFormData(request, {});

  const raw_response = await session.fetcher(request);
  const response = encodeEDResponse(raw_response);
  session.token = response.token;

  // TODO: a decoder for this, when we know what does it return.
  return response.data;
}
