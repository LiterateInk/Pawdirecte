import type { DoubleAuth } from "~/models/double-auth";

export function encodeDoubleAuth (double_auth: DoubleAuth | null) {
  return double_auth ? {
    cn: double_auth.cn,
    cv: double_auth.cv
  } : void 0;
}
