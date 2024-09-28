import { DocumentKind } from "~/models";

export type Document = Readonly<{
  id: number
  name: string
  date: Date
  kind: DocumentKind
  signatureRequired: boolean
  signature: any
}>;
