import type { AccountKind } from "~/models";

export type Account = Readonly<{
  id_login: number
  id: number
  user_id: string
  username: string
  kind: AccountKind
  ogec_id: string
  main: boolean
  last_connection: Date
  first_name: string
  last_name: string
  email: string
  phone: string
  school_name: string
  school_rne: string
  school_logo_path: string
  /** As HEX. */
  school_agenda_color: string
  token: string
  socket_token: string
  gender: "M" | "F"
  profile_picture_url: string
  modules: any[] // TODO
}>;
