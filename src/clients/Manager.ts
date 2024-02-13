import type { EdApiAccount } from "~/ecoledirecte/account";
import type { EDClient } from "~/clients";

import { defaultEDFetcher } from "~/utils/fetcher";
import EDStudent from "~/clients/Student";

export interface EDClientsManagerExported {
  token: string
  accounts: EdApiAccount[]
}

class EDClientsManager {
  public clients: EDClient[] = [];

  constructor (
    protected token: string,
    protected accounts: EdApiAccount[],
    public fetcher = defaultEDFetcher
  ) {
    this.token = token;
    this.clients = accounts.map((account) => {
      // We only have the student wrapper for now, so don't write any check.
      return new EDStudent(token, account, this.fetcher);
    });
  }

  public createDataExport (): EDClientsManagerExported {
    return {
      token: this.token,
      accounts: this.accounts
    };
  }
}

export default EDClientsManager;
