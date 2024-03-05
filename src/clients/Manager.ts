import type { EdApiAccount } from "~/ecoledirecte/account";
import type { EDClient } from "~/clients";

import { defaultEDFetcher } from "~/utils/fetcher";
import EDStudent from "~/clients/Student";

export interface EDClientsManagerExported {
  token: string
  accounts: EdApiAccount[]
}

export interface EDClientsManagerSignals {
  token: [() => string, (newToken: string) => void];
  /**
   * @remark The getter of this gives directly the account of the user,
   * while the setter sets **every**
  */
  accounts: [() => EdApiAccount, (newAccounts: EdApiAccount[]) => void];
}

class EDClientsManager {
  #clients: EDClient[] = [];

  #token: string;
  #accounts: Record<string, EdApiAccount>;

  readonly #uuid: string;

  /**
   * Helper to map the accounts array into a object
   * containing the ID as key and the account as value.
   *
   * Provides a easier getter for the signals given
   * to the clients.
   */
  #mapAccountsToObject (receivedAccounts: EdApiAccount[]) {
    const accounts: Record<string, EdApiAccount> = {};

    for (const account of receivedAccounts) {
      accounts[account.id] = account;
    }

    return accounts;
  }

  constructor (
    uuid: string,
    token: string,
    accounts: EdApiAccount[],
    public fetcher = defaultEDFetcher
  ) {
    this.#uuid = uuid;

    this.#token = token;
    this.#accounts = this.#mapAccountsToObject(accounts);

    const tokenSignal: EDClientsManagerSignals["token"] = [
      () => this.#token,
      (newToken: string) => (this.#token = newToken)
    ];

    this.#clients = accounts.map((account) => {
      const signals: EDClientsManagerSignals = {
        token: tokenSignal,
        accounts: [
          () => this.#accounts[account.id],
          (accounts: EdApiAccount[]) => (this.#accounts = this.#mapAccountsToObject(accounts))
        ]
      };

      // We only have the student wrapper for now, so don't write any check.
      return new EDStudent(this.#uuid, signals, this.fetcher);
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
      accounts: Object.values(this.#accounts)
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
