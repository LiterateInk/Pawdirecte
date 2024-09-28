import {FileKind, SessionTokenRequired, type Session} from "~/models";
import {Request} from "~/core/request";

const buildUrl = (type: FileKind, id: number | string, year: string = "") => {
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
  year: string = ""
): Promise<string> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const url = buildUrl(type, id, year);
  const request = new Request(url)
    .addVersionURL()
    .setFormData({forceDownload: 0})
    .setToken(session.token);

  const response = await request.sendRaw(session.fetcher);

  return response.content;
};
