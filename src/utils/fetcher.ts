/**
 * A fetcher that looks like the Fetch API
 * so every fetcher applied to Pawdirecte will have the
 * same API and should output the same thing.
 *
 * @example
 * import type { EDFetcher } from "pawdirecte";
 *
 * // With the `fetch()` builtin, in TypeScript.
 * // This is actually the code for the default fetcher.
 * const fetcher: EDFetcher = async (url, options) => {
 *   const response = await fetch(url, {
 *     method: options.method,
 *     headers: options.headers,
 *     // Setting a body is not allowed on GET requests.
 *     body: (options.method === "GET") ? void 0 : options.body
 *   });
 *
 *   return {
 *     headers: response.headers,
 *     text: () => response.text(),
 *     json: <T>() => response.json() as T
 *   };
 * };
 */
export type EDFetcher = (url: string, options: {
  method: "GET" | "POST"
  /** Headers that should be appended to the request. */
  headers?: Record<string, string> | Headers
  /** Body of the request, always as string. */
  body?: string
}) => Promise<{
  headers: Record<string, string> | Headers
  text: () => Promise<string>
  json: <T>() => Promise<T>
}>;

/** @see https://www.whatismybrowser.com/guides/the-latest-user-agent/chrome */
const DEFAULT_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36";

/**
 * Simple and default fetcher using `fetch` if none was given
 * in the authentication function.
 */
export const defaultEDFetcher: EDFetcher = async (url, options) => {
  if (options.headers instanceof Headers) { // use the builtin `set` method.
    options.headers.set("User-Agent", DEFAULT_USER_AGENT);
  }
  else { // use the default header.
    options.headers = {
      ...options.headers,
      "User-Agent": DEFAULT_USER_AGENT
    };
  }

  const response = await fetch(url, {
    method: options.method,
    headers: options.headers,
    // Setting a body is not allowed on GET requests.
    body: (options.method === "GET") ? void 0 : options.body
  });

  return {
    headers: response.headers,
    text: () => response.text(),
    json: <T>() => response.json() as T
  };
};
