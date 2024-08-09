import { defaultFetcher, type Fetcher, type Request as UnsafeRequest } from "@literate.ink/utilities";
import { Response } from "./response";

export class Request {
  public url: URL;
  public headers: Record<string, string>;
  public method: string | undefined;
  public content: string | undefined;

  public constructor (path: string) {
    this.url = new URL("https://api.ecoledirecte.com/v3" + path);
    this.headers = { "User-Agent": "EDMOBILE" };
  }

  public setToken (token: string): Request {
    this.headers["X-Token"] = token;
    return this;
  }

  public addVersionURL (): Request {
    this.url.searchParams.set("v", "6.17.0");
    return this;
  }

  public setFormData (body: any): Request {
    this.method = "POST";
    this.content = "data=" + JSON.stringify(body);
    this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return this;
  }

  public async send (fetcher: Fetcher = defaultFetcher): Promise<Response> {
    const response = await fetcher(this as UnsafeRequest);
    return new Response(response);
  }
}
