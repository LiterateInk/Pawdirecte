import {FileKind, SessionTokenRequired, type Session} from "~/models";
import {Request} from "~/core/request";
import { type Response } from "@literate.ink/utilities";

export const buildPawdirecteFileDownloadUrl = (type: FileKind, id: number | string, year = "") => {
  const endpoint = `/telechargement.awp?verbe=get&fichierId=${id}`;
  let url;
  switch (type) {
    case FileKind.Administrative:
      url = endpoint + year != "" ? `archive=true&anneeArchive=${year}`: "";
      break;
    case FileKind.Attachement:
      url = endpoint + year != "" ? `anneeMessages=${year}`: "";
      break;
    default:
      url = endpoint + `&leTypeDeFichier=${type}`;
  }
  return url;
};

/**
 * @param type "The type of file to download"
 * @param id "The file ID or UNC path"
 * @param year "The year of document; YYYY format." ONLY AVAILABLE FOR ADMINISTRATIVE AND MESSAGES ATTACHEMENTS FILES
 */
export const getFile = async (
  session: Session,
  type: FileKind,
  id: number | string,
  year = ""
): Promise<Response> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const url = buildPawdirecteFileDownloadUrl(type, id, year);
  const request = new Request(url)
    .addVersionURL()
    .setFormData({ forceDownload: 0 })
    .setToken(session.token);

  return request.sendRaw(session.fetcher);
};
