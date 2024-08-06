import { type Response, getHeaderFromResponse } from "@literate.ink/utilities";
import { EDResponse } from "~/models";

export function encodeEDResponse (response: Response): EDResponse {
  const content = JSON.parse(response.content);
  let token: string | null = null;

  if ("token" in content) {
    token = content.token;
  }
  else {
    token = getHeaderFromResponse(response, "x-token");
  }

  return new EDResponse(
    // .status
    content.code,
    // .token
    token,
    // .message
    content.message,
    // .data
    content.data
  );
}
