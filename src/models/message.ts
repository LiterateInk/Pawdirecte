import { FileKind } from "./files";

export type ReceivedMessage = Readonly<{
  id: number,
  type: string,
  date: Date,
  read: boolean,
  subject: string,
  canAnswer: boolean,
  content: string,
  sender: string,
  files: { type: FileKind, id: number, name: string }[]
}>;

export type APIReceivedMessageType = Readonly<{
  id: number;
  responseId: number;
  forwardId: number;
  mtype: string;
  read: boolean;
  idDossier: number;
  idClasseur: number;
  transferred: boolean;
  answered: boolean;
  to_cc_cci: string;
  brouillon: boolean;
  canAnswer: boolean;
  subject: string;
  content: string;
  date: string;
  to: string[];
  files: {
    id: number;
    libelle: string;
    date: string;
    type: string;
    signatureDemandee: boolean;
    etatSignatures: any[];
    signature: Record<string, any>;
  }[];
  from: {
    name: string;
    nom: string;
    prenom: string;
    particule: string;
    civilite: string;
    role: string;
    listeRouge: boolean;
    id: number;
    read: boolean;
    fonctionPersonnel: string;
  };

}>;

export type APIReceivedMessage = Readonly<{
  status: number;
  token: string | null;
  data: APIReceivedMessageType
}>;
