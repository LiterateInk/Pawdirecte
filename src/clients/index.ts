import type EDStudent from "~/clients/Student";
import EDClientsManager, { EDClientsManagerExported } from "./Manager";
import { defaultEDFetcher } from "~/utils/fetcher";
import { callApiLogin } from "~/api/login";

/**
 * An union of all the clients for EcoleDirecte
 * available in the library.
 */
export type EDClient = (
  | EDStudent
);

/**
 * A way to authenticate to EcoleDirecte using your credentials.
 * @returns A client manager for all the accounts available under a single token.
 */
export const initWithCredentials = async (username: string, password: string, fetcher = defaultEDFetcher): Promise<EDClientsManager> => {
  const response = await callApiLogin(fetcher, { username, password });

  const token = response.token;
  const accounts = response.data.accounts;

  return new EDClientsManager(token, accounts);
};

/**
 * Recover the manager from exported data.
 * @returns A client manager for the data imported.
 */
export const initWithExportedData = (exportedData: EDClientsManagerExported): EDClientsManager => {
  return new EDClientsManager(exportedData.token, exportedData.accounts);
};
