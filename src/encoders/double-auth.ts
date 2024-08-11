import type { DoubleAuth } from "~/models/double-auth";

export const encodeDoubleAuth = (double_auth: DoubleAuth | null | undefined): any => {
  return double_auth ? {
    cn: double_auth.name,
    cv: double_auth.value
  } : void 0;
};
