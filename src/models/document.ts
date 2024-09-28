import { DocumentKind } from "~/models";

export type PawdirecteDocument = Readonly<{
  id: number
  name: string
  date: Date
  kind: DocumentKind
  signatureRequired: boolean
  signature: any
}>;
