import { type Document, SessionTokenRequired, type Session } from "~/models";
import {Request} from "~/core/request";
import { decodeDocument } from "~/decoders/document";

/**
 * @param archive "The year of document, if it's an archive; YYYY format."
 */
export const studentDocuments = async (
  session: Session,
  archive = ""
): Promise<Document[]> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/elevesDocuments.awp?verbe=get&archive=${archive}`)
    .addVersionURL()
    .setFormData({forceDownload: 0})
    .setToken(session.token);

  const response = await request.send(session.fetcher);
  const allDocuments = [
    ...response.data.factures,
    ...response.data.notes,
    ...response.data.viescolaire,
    ...response.data.administratifs,
    ...response.data.inscriptions
  ];
  return allDocuments.map(decodeDocument);
};
