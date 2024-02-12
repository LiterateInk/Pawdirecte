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
 * @returns Instances of a client for each account, depending on the account type.
 */
export const initWithCredentials = async (username: string, password: string, fetcher = defaultEDFetcher): Promise<EDClient[]> => {
  const response = await edApiLogin(fetcher, { username, password });

  const token = response.token;
  const accounts = response.data.accounts;

  return accounts.map((account) => {
    return new EDStudent(token, account, fetcher);
  });
};
