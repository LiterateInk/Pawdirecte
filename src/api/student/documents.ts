import {PawdirecteDocument, SessionTokenRequired, type Session} from "~/models";
import {Request} from "~/core/request";
import { decodeDocument } from "~/decoders/document";

/**
 * @param archive "The year of document, if it's an archive; YYYY format."
 */
export const studentDocuments = async (
  session: Session,
  archive: string = ""
): Promise<PawdirecteDocument[]> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/elevesDocuments.awp?verbe=get&archive=${archive}`)
    .addVersionURL()
    .setFormData({forceDownload: 0})
    .setToken(session.token);

  const response = await request.send(session.fetcher);
  const allDocuments = [].concat(response.data.factures).concat(response.data.notes).concat(response.data.viescolaire).concat(response.data.administratifs).concat(response.data.inscriptions)
  return allDocuments.map(decodeDocument);
};
