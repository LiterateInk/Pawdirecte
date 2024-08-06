import type { AccountKind } from "~/models";

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
    public phone: string,
    public school_name: string,
    public school_rne: string,
    public school_logo_path: string,
    /** As HEX. */
    public school_agenda_color: string,
    public token: string,
    public socket_token: string,
    public gender: "M" | "F",
    public profile_picture_url: string,
    public modules: any[] // TODO
  ) {}
}
