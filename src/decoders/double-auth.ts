import { BadDoubleAuth, type DoubleAuth } from "~/models";

export function decodeDoubleAuth (double_auth: any): DoubleAuth {
  if (double_auth === null)
    throw new BadDoubleAuth();

  return {
    name: double_auth.cn,
    value: double_auth.cv
  };
};
