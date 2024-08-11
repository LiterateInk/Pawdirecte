import { type Account, type Session, SessionTokenRequired } from "~/models";
import { Request } from "~/core/request";

export const accountEdforms = async (session: Session, account: Account): Promise<Array<unknown>> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request("/edforms.awp?verbe=list")
    .addVersionURL()
    .setToken(session.token)
    .setFormData({
      idEntity: account.id,
      typeEntity: account.kind
    });

  const response = await request.send(session.fetcher);
  session.token = response.token;

  // TODO: a decoder for this, when we know what does it return.
  return response.data;
};
