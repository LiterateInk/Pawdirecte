import EDStudent from "~/clients/Student";
import { defaultEDFetcher } from "~/utils/fetcher";
import { edApiLogin } from "~/api/login";

/**
 * An union of all the clients for EcoleDirecte
 * available in the library.
 */
export type EDClient = (
  | EDStudent
);


/**
 * A way to authenticate to EcoleDirecte using your credentials.
 * @returns An instance of a client, depending on the account type.
 */
export const initWithCredentials = async (username: string, password: string, fetcher = defaultEDFetcher): Promise<EDClient> => {
  const user = await edApiLogin(fetcher, { username, password });
  // The only account type available for now is a student,
  // so we won't bother to do the check manually.
  return new EDStudent(user, fetcher);
};
