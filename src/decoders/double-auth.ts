import { BadDoubleAuth, DoubleAuth } from "~/models";

export function decodeDoubleAuth (content: Record<string, unknown>): DoubleAuth {
  if (content === null)
    throw new BadDoubleAuth();

  return new DoubleAuth(
    content["cn"] as string,
    content["cv"] as string
  );
};
