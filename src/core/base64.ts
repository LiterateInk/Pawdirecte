import { decode, encode } from "js-base64";

/**
 * This function decodes the b64 input string, and decode uri escaped chars, if escape function exists.
 *
 * Escape function allow to transform encoded chars into utf-8 ones.
 * */
export function decodeString(value: string, escapeString: boolean = true): string {
  const decoded = decode(value);
  if (escape && escapeString) {
    return decodeURIComponent(escape(decoded));
  }
  return decoded;
}

/**
 * Encode string to b64
 */
export function encodeString(value: string): string {
  return encode(value);
}
