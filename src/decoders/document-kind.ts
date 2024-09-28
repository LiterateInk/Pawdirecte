import { DocumentKind } from "~/models";

export const decodeDocumentKind = (kind: any): DocumentKind => {
  return kind as DocumentKind;
};
