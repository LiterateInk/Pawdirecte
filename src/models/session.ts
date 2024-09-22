import type { Fetcher } from "@literate.ink/utilities";
import type { DoubleAuth } from "~/models/double-auth";

export interface Session {
  readonly username: string
  readonly device_uuid: string
  token?: string | null
  accessToken?: string | null
  double_auth?: DoubleAuth | null
  fetcher?: Fetcher
}
