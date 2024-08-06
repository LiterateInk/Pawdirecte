import { type Request, setHeaderToRequest } from "@literate.ink/utilities";

/**
 * Initializes a request with the given path.
 *
 * Also uses the API endpoint as base URL
 * and sets the `User-Agent` header.
 */
export function init_request (path: string): Request {
  return {
    url: new URL("https://api.ecoledirecte.com/v3" + path),
    headers: { "User-Agent": "EDMOBILE" }
  };
}

/**
 * Adds the `X-Token` header to the request
 * with the given token.
 */
export function encode_token (req: Request, token: string): void {
  setHeaderToRequest(req, "X-Token", token);
}

/**
 * Sets the query parameter `key` to `value`
 * in the URL.
 */
export function encode_param (req: Request, key: string, value: string): void {
  req.url.searchParams.set(key, value);
}

/**
 * Adds the `v` query parameter to the URL
 * which is a constant for the API version.
 */
export function encode_version (req: Request): void {
  encode_param(req, "v", "6.15.1");
}

/**
 * Wraps the body in the `data` key
 * and sets the `Content-Type` header.
 */
export function encode_form_body (req: Request, body: Record<string, unknown>) {
  req.method = "POST";
  req.content = "data=" + JSON.stringify(body);
  setHeaderToRequest(req, "Content-Type", "application/x-www-form-urlencoded");
}
