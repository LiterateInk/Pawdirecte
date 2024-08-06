import { type Account, type Session, SessionTokenRequired } from "~/models";
import { Request } from "~/core/request";

export async function studentVisios (session: Session, account: Account): Promise<Array<unknown>> {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/eleves/${account.id}/visios.awp?verbe=get`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});

  const response = await request.send(session.fetcher);
  session.token = response.token;

  // TODO: a decoder for this, when we know what does it return.
  return response.data;
}
