import { UnknownEnumValue, DocumentKind } from "~/models";

export const decodeDocumentKind = (kind: any): DocumentKind => {
  switch (kind) {
    case DocumentKind.Attachment: return DocumentKind.Attachment;
    case DocumentKind.CDT: return DocumentKind.CDT;
    case DocumentKind.ClickNCollect: return DocumentKind.ClickNCollect;
    case DocumentKind.Cloud: return DocumentKind.Cloud;
    default: throw new UnknownEnumValue("AccountKind", kind);
  }
};
