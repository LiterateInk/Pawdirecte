import type { WorkspaceItemKind } from "~/models";

export type WorkspaceItem = Readonly<{
  id: string
  title: string
  description: string
  summary: string
  cloud: boolean
  discussion: boolean
  agenda: boolean
  isPublic: boolean
  isOpen: boolean
  kind: WorkspaceItemKind
  isMember: boolean
  isAdmin: boolean
  teacherRooms: boolean
  createdBy: string
  permissions: 0 | 1 | 2 // ?
  nbMembers: 0
  colorEventAgenda: string
  createdAt?: string //"JJ/MM/AAAA à HH:MM"
}>;
