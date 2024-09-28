import { decodeDocument } from "./document";
import { APIAssignment } from "~/models/assignments";
import { decode } from "js-base64";

export const decodeAssignments = (assignment: APIAssignment) => {
  return {
    id: assignment.id,
    class: assignment.matiere,
    teacher: assignment.nomProf,
    exam: assignment.interrogation,
    done: assignment.aFaire.effectue,
    subject: decode(assignment.aFaire.contenu),
    createdDate: new Date(assignment.aFaire.donneLe),
    attachments: assignment.aFaire.documents.map(decodeDocument)
  };
};
