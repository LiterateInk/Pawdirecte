import type { EdApiResponseError } from "~/ecoledirecte/response";
import type { EDFetcher } from "./fetcher";

import { API_URL, API_VERSION } from "./constants";
import encoder from "./encoder";

export const makeApiRequest = async <
  Api extends { errors: unknown, request: unknown, response: unknown },
  ResponseType extends "json" | "text" = "json"
>(fetcher: EDFetcher, init: {
  /**
   * Should contain a slash at the beginning.
   * Path is directly appended to the API endpoint origin.
   */
  path: string

  /**
   * Will be appended to `X-Token` header.
   * Not required when authenticating, for example.
   */
  token: string | undefined

  /**
   * Data sent as `application/x-www-form-urlencoded`
   * if `GET` method is not used.
   */
  data?: Api["request"]

  /**
   * Prevent sending a POST request with `data` as body.
   * Otherwise we simply send a GET request with given search params.
   */
  forceUseGET?: boolean

  /**
   * Most of the requests use the `verbe` search params.
   * Not all though, so we don't use it as default.
   */
  additionalSearchParams?: {
    verbe?: "list" | "get"
    [key: string]: string | undefined
  }

  /**
   * By default, `v` search param is ALWAYS sent, because it's required
   * on most the requests. But some of them don't need it, so
   */
  removeVersionFromSearchParams?: boolean

  /**
   * By default, uses `json`.
   * When downloading binaries, we should use `text`.
   */
  responseType?: ResponseType
}): Promise<(ResponseType extends "json" ? Api["response"] : string) | EdApiResponseError<Api["errors"]>> => {
  const url = new URL(`${API_URL}${init.path}`);
  const searchParamsAsObject: Record<string, string | undefined> = {
    ...init.additionalSearchParams,
    v: API_VERSION
  };

  if (init.removeVersionFromSearchParams) {
    delete searchParamsAsObject.v;
  }

  for (const key of Object.keys(searchParamsAsObject)) {
    const value = searchParamsAsObject[key];
    if (typeof value !== "string") continue;

    url.searchParams.set(key, value);
  }

  const headers: Record<string, string> = {};
  if (init.token) headers["X-Token"] = init.token;

  let body: string | undefined;
  if (init.data && !init.forceUseGET) {
    body = encoder(init.data);
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  const response = await fetcher(url.href, {
    method: init.forceUseGET ? "GET" : "POST",
    headers,
    body
  });

  if (init.responseType && init.responseType === "text") {
    return response.text();
  }

  return response.json();
};
