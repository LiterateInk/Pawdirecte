import { DoubleAuth } from "~/models/double-auth";

export function decodeDoubleAuth (content: Record<string, unknown>): DoubleAuth {
  return new DoubleAuth(
    content["cn"] as string,
    content["cv"] as string
  );
};
