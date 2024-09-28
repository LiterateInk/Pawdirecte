export type APINextAssignments = {
  matiere: string;
  codeMatiere: string;
  aFaire: boolean;
  idDevoir: number;
  documentsAFaire: boolean;
  donneLe: string;
  effectue: boolean;
  interrogation: boolean;
  rendreEnLigne: boolean;
};

export type APIDateAssignments = {
  [key: string]: APINextAssignments[];
};

export type APINextAssignmentsResponse = {
  token: string | null;
  data: APIDateAssignments;
};

export type NextAssignment = {
  id: number;
  class: string;
  exam: boolean;
  done: boolean;
  createdDate: Date;
};

export type NextAssignments = {
  date: Date;
  assignments: NextAssignment[];
}[];
