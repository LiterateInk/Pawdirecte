import {SessionTokenRequired, type Session} from "~/models";
import {Request} from "~/core/request";


export const getAttachement = async (
  session: Session,
  type: string,
  id: number
) => {
  if (!session.token)
    throw new SessionTokenRequired();
  console.log(`/telechargement.awp?verbe=get&leTypeDeFichier=${type}&fichierId=${id}`);
  const request = new Request(`/telechargement.awp?verbe=get&leTypeDeFichier=${type}&fichierId=${id}`)
    .addVersionURL()
    .setFormData({forceDownload: 0})
    .setToken(session.token);

  console.log(request);

  const response = await request.sendRaw(session.fetcher);

  return response.content;
};
