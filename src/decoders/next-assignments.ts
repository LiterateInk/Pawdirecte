
import { APINextAssignments, NextAssignment, NextAssignments } from "~/models/next-assignments";

export const decodeNextAssignments = (assignment: APINextAssignments): NextAssignment => {
  return {
    id: assignment.idDevoir,
    class: assignment.matiere,
    exam: assignment.interrogation,
    done: assignment.effectue,
    createdDate: new Date(assignment.donneLe)
  };
};
