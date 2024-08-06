import type { AccountKind } from "~/models";

export interface Account {
  readonly id_login: number
  readonly id: number
  readonly user_id: string
  readonly username: string
  readonly kind: AccountKind
  readonly ogec_id: string
  readonly main: boolean
  readonly last_connection: Date
  readonly first_name: string
  readonly last_name: string
  readonly email: string
  readonly phone: string
  readonly school_name: string
  readonly school_rne: string
  readonly school_logo_path: string
  /** As HEX. */
  readonly school_agenda_color: string
  readonly token: string
  readonly socket_token: string
  readonly gender: "M" | "F"
  readonly profile_picture_url: string
  readonly modules: any[] // TODO
}
