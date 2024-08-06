import { AccountKind } from "~/models";

export function decodeAccountKind (kind: string): AccountKind {
  switch (kind) {
    case "E": return AccountKind.Student;
    default: throw new Error(`Unknown account kind: ${kind}`);
  }
}
