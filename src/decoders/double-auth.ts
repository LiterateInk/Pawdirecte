import { BadDoubleAuth, DoubleAuth } from "~/models";

export function decodeDoubleAuth (double_auth: any): DoubleAuth {
  if (double_auth === null)
    throw new BadDoubleAuth();

  return new DoubleAuth(
    double_auth.cn,
    double_auth.cv
  );
};
