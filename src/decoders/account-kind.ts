import { AccountKind, UnknownEnumValue } from "~/models";

export const decodeAccountKind = (kind: any): AccountKind => {
  switch (kind) {
    case "E": return AccountKind.STUDENT;
    default: throw new UnknownEnumValue("AccountKind", kind);
  }
};
