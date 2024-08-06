import { AccountKind } from "~/models";

export function decodeAccountKind (str: string): AccountKind {
  switch (str) {
    case "E": return AccountKind.Student;
    default: throw new Error(`Unknown account kind: ${str}`);
  }
}
