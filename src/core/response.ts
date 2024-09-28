import { getHeaderFromResponse, type Response as UnsafeResponse } from "@literate.ink/utilities";

const validJson = (value: string) => {
  return (value.startsWith("[") || value.startsWith("{")) && (value.endsWith("]") || value.endsWith("}"))
}

export class Response {
  public status: number;
  public token: string | null;
  public access_token: string | null = null;
  public message: string | null = null;
  public data: any;

  public constructor (response: UnsafeResponse) {
    this.token = getHeaderFromResponse(response, "x-token");

    const content_type = getHeaderFromResponse(response, "content-type");
    // Set error if response is not JSON and don't starts like JSON. ED sometimes return JSON in a text/html Content-Type (yes....)
    if (!content_type?.startsWith("application/json") && !validJson(response.content)) {
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
