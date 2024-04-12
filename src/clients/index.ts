import type EDStudent from "~/clients/Student";
import EDClientsManager, { type EDClientsManagerExported } from "./Manager";
import { defaultEDFetcher, type EDFetcher } from "~/utils/fetcher";
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
export const initWithCredentials = async (options: {
  username: string,
  password: string,
  deviceUUID: string,
  fetcher?: EDFetcher
}): Promise<EDClientsManager> => {
  const fetcher = options.fetcher ?? defaultEDFetcher;
  const response = await callApiLogin(fetcher, {
    deviceUUID: options.deviceUUID,
    username: options.username,

    recovery: false,
    password: options.password
  });

  return new EDClientsManager(
    options.deviceUUID,
    response.token,
    // When we require double authentication (code = 250), we give `null`.
    response.code === 250 ? null : response.data.accounts,
    fetcher
  );
};

/**
 * Recover the manager from exported data.
 * @returns A client manager for the data imported.
 */
export const initWithExportedData = (options: {
  data: EDClientsManagerExported,
  deviceUUID: string,
  fetcher?: EDFetcher
}): EDClientsManager => {
  const fetcher = options.fetcher ?? defaultEDFetcher;
  return new EDClientsManager(options.deviceUUID, options.data.token, options.data.accounts, fetcher);
};
