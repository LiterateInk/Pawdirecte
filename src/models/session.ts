import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";
import { DoubleAuth } from "~/models/double-auth";

export class Session {
  public constructor (
    public username: string,
    public device_uuid: string,
    public token: string | null = null,
    public double_auth: DoubleAuth | null = null,
    public fetcher: Fetcher = defaultFetcher
  ) {}
}
