import { UnknownEnumValue, DocumentKind } from "~/models";

export const decodeDocumentKind = (kind: any): DocumentKind => {
  switch (kind) {
    case DocumentKind.Document: return DocumentKind.Document;
    case DocumentKind.Grades: return DocumentKind.Grades;
    case DocumentKind.SchoolLife: return DocumentKind.SchoolLife;
    case DocumentKind.Invoice: return DocumentKind.Invoice;
    case DocumentKind.Registration: return DocumentKind.Registration;
    case DocumentKind.Other: return DocumentKind.Other;
    default: throw new UnknownEnumValue("AccountKind", kind);
  }
};
