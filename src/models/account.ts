import type { AccountKind } from "./account-kind";

export class Account {
  public constructor (
    public id_login: number,
    public id: number,
    public user_id: string,
    public username: string,
    public kind: AccountKind,
    public ogec_id: string,
    public main: boolean,
    public last_connection: Date,
    public first_name: string,
    public last_name: string,
    public email: string,
    public school_name: string,
    public school_logo_path: string,
    /** as hex */
    public school_agenda_color: string,
    public token: string,
    public socket_token: string,
    public modules: any[], // TODO
    public profile: any // TODO
  ) {}
}
