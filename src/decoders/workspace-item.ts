import { WorkspaceItem } from "~/models";

export const decodeWorkspace = (item: any): WorkspaceItem => {
  return {
    id: item.id,
    title: item.titre,
    description: item.description,
    summary: item.resume,
    cloud: item.cloud,
    discussion: item.discussion,
    agenda: item.agenda,
    isPublic: item.public,
    isOpen: item.ouvert,
    kind: item.type,
    isMember: item.estMembre,
    isAdmin: item.estAdmin,
    teacherRooms: item.salleDesProfs,
    createdBy: item.creePar,
    permissions: item.droitUtilisateur,
    nbMembers: item.nbMembres,
    colorEventAgenda: item.couleurEvenementAgenda,
    createdAt: item.creeLe
  };
};
