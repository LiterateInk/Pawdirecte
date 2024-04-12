import type { EdApiDoubleAuthValues } from "~/constants/auth";
import type { EdApiAccount } from "~/ecoledirecte/account";
import type { EDClient } from "~/clients";

import { defaultEDFetcher } from "~/utils/fetcher";
import EDStudent from "~/clients/Student";

import { callApiDoubleAuth } from "~/api/doubleauth";
import { callApiConfirmDoubleAuth } from "~/api/confirm-doubleauth";
import { callApiLogin } from "~/api/login";

export interface EDClientsManagerExported {
  token: string
  /**
   * `null` when double authentication is required.
   */
  accounts: EdApiAccount[] | null
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
  readonly #uuid: string;

  #clients: EDClient[] = [];
  #accounts: Record<string, EdApiAccount> | null = null;

  #token: string;
  readonly #tokenSignal: EDClientsManagerSignals["token"] = [
    () => this.#token,
    (newToken: string) => (this.#token = newToken)
  ];

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

  #mapAccountsToClients (receivedAccounts: EdApiAccount[]) {
    return receivedAccounts.map((account) => {
      const signals: EDClientsManagerSignals = {
        token: this.#tokenSignal,
        accounts: [
          () => this.#accounts![account.id],
          (accounts: EdApiAccount[]) => (this.#accounts = this.#mapAccountsToObject(accounts))
        ]
      };

      // We only have the student wrapper for now, so don't write any check.
      return new EDStudent(this.#uuid, signals, this.fetcher);
    });
  }

  #initAccounts (accounts: EdApiAccount[] | null): void {
    // Check if we given an array and not `null`.
    if (Array.isArray(accounts)) {
      this.#accounts = this.#mapAccountsToObject(accounts);
      this.#clients = this.#mapAccountsToClients(accounts);
    }
    else { // reset to default values.
      this.#accounts = null;
      this.#clients = [];
    }
  }

  constructor (
    uuid: string,
    token: string,
    /** `null` when double authentication is required. */
    accounts: EdApiAccount[] | null,
    public fetcher = defaultEDFetcher
  ) {
    this.#uuid = uuid;
    this.#token = token;

    this.#initAccounts(accounts);
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
      accounts: this.#accounts === null ? null : Object.values(this.#accounts)
    };
  }

  public get clients (): EDClient[] {
    return this.#clients;
  }

  public get token (): string {
    return this.#token;
  }

  public get requiresDoubleAuthentication (): boolean {
    return this.#accounts === null;
  }

  public async getDoubleAuthenticationQCM () {
    const { token, ...response } = await callApiDoubleAuth(this.fetcher, {
      token: this.#token
    });

    this.#token = token;
    return response;
  }

  public async replyDoubleAuthenticationQCM (choice: string): Promise<EdApiDoubleAuthValues> {
    const { token, values } = await callApiConfirmDoubleAuth(this.fetcher, {
      choice,
      token: this.#token
    });

    this.#token = token;
    return values;
  }

  public async renewAuthentication (username: string, password: string, doubleAuthValues?: EdApiDoubleAuthValues): Promise<void> {
    const response = await callApiLogin(this.fetcher, {
      doubleAuth: doubleAuthValues,

      deviceUUID: this.#uuid,
      username: username,

      recovery: false,
      password: password
    });

    this.#token = response.token;
    this.#initAccounts(response.data.accounts);
  }
}

export default EDClientsManager;
