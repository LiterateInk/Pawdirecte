import { getHeaderFromResponse, type Response as UnsafeResponse } from "@literate.ink/utilities";

export class Response {
  public status: number;
  public token: string | null;
  public access_token: string | null = null;
  public message: string | null = null;
  public data: any;

  public constructor (response: UnsafeResponse) {
    this.token = getHeaderFromResponse(response, "x-token");

    const content_type = getHeaderFromResponse(response, "content-type");
    if (!content_type?.startsWith("application/json")) {
      this.status = parseInt(getHeaderFromResponse(response, "x-code")!, 10);
    }
    else {
      const content = JSON.parse(response.content);

      this.status = content.code;
      this.data = content.data;
      this.message = content.message;

      if ("token" in content) {
        this.token = content.token;
      }

      if ("access_token" in content) {
        this.access_token = content.accessToken;
      }
    }
  }
}
