import { type Request, setHeaderToRequest } from "@literate.ink/utilities";

/**
 * Initializes a request with the given path.
 *
 * Also uses the API endpoint as base URL
 * and sets the `User-Agent` header.
 */
export function encodeRequest (path: string): Request {
  return {
    url: new URL("https://api.ecoledirecte.com/v3" + path),
    headers: { "User-Agent": "EDMOBILE" }
  };
}

/**
 * Adds the `X-Token` header to the request
 * with the given token.
 */
export function encodeRequestToken (req: Request, token: string): void {
  setHeaderToRequest(req, "X-Token", token);
}

/**
 * Adds the `v` query parameter to the URL
 * which is a constant for the API version.
 */
export function encodeRequestUrlVersion (req: Request): void {
  req.url.searchParams.set("v", "6.15.1");
}

/**
 * Wraps the body in the `data` key
 * and sets the `Content-Type` header.
 */
export function encodeRequestFormData (req: Request, body: Record<string, unknown>) {
  req.method = "POST";
  req.content = "data=" + JSON.stringify(body);
  setHeaderToRequest(req, "Content-Type", "application/x-www-form-urlencoded");
}
