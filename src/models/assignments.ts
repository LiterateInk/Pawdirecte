import { PawdirecteDocument } from "./document";

export type APIAssignment = {

  entityCode: string;
  entityLibelle: string;
  entityType: string;
  matiere: string;
  codeMatiere: string;
  nomProf: string;
  id: number;
  interrogation: boolean;
  blogActif: boolean;
  nbJourMaxRenduDevoir: number;
  aFaire: {
    idDevoir: number;
    contenu: string;
    rendreEnLigne: boolean;
    donneLe: string;
    effectue: boolean;
    ressource: string;
    documentsRendusDeposes: boolean;
    ressourceDocuments: any[];
    documents: PawdirecteDocument[];
    elementsProg: any[];
    liensManuel: any[];
    documentsRendus: any[];
    contenuDeSeance: {
      contenu: string;
      documents: any[];
    };
  };

};

export type APIAssignmentsResponse = {
  token: string | null;
  data: { date: string, matieres: APIAssignment[] };
};


export type Assignments = {
  id: number;
  class: string;
  teacher: string;
  exam: boolean;
  done: boolean;
  subject: string;
  createdDate: Date;
  attachments: PawdirecteDocument[];
};

