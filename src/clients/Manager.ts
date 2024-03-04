import type { EdApiAccount } from "~/ecoledirecte/account";
import type { EDClient } from "~/clients";

import { defaultEDFetcher } from "~/utils/fetcher";
import EDStudent from "~/clients/Student";

export interface EDClientsManagerExported {
  token: string
  accounts: EdApiAccount[]
}

class EDClientsManager {
  #clients: EDClient[] = [];

  #token: string;
  readonly #uuid: string;
  readonly #accounts: EdApiAccount[];

  constructor (
    token: string,
    accounts: EdApiAccount[],
    uuid: string,
    public fetcher = defaultEDFetcher
  ) {
    this.#uuid = uuid;
    this.#token = token;
    this.#accounts = accounts;

    // A signal allowing to read the latest token value
    // and update it for each clients.
    const tokenSignal = [
      // Getter
      () => this.#token,
      // Setter
      (newToken: string) => (this.#token = newToken)
    ] as const;

    this.#clients = accounts.map((account, index) => {
      // We only have the student wrapper for now, so don't write any check.
      return new EDStudent(
        this.#uuid,
        tokenSignal,
        account,
        this.fetcher
      );
    });
  }

  /**
   * Making an export allows for later usage of that manager.
   * You can use it in the `initWithExportedData()` function
   * to recover the manager and renew tokens if needed.
   *
   * @note Make sure to pass the same `deviceUUID` as the one used
   * when the export was made when recovering using `initWithExportedData()`.
   */
  public createManagerExport (): EDClientsManagerExported {
    return {
      token: this.#token,
      accounts: this.#accounts
    };
  }

  public get clients (): EDClient[] {
    return this.#clients;
  }

  public get token (): string {
    return this.#token;
  }
}

export default EDClientsManager;
