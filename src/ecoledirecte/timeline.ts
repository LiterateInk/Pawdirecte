export enum EdApiStudentTimelineTypeElement {
  Note = "Note",
  VieScolaire = "VieScolaire",
  ReunionPP = "ReunionPP",
  ReunionPPFamille = "ReunionPPFamille",
  Actualite = "Actualite",
  Messagerie = "Messagerie",
  DocumentFamille = "DocumentFamille",
  Document = "Document"
}

export interface EdApiStudentTimelineItem {
  contenu: string
  /**
   * Format: "YYYY-MM-DD"
   * @example "2023-10-03"
   */
  date: string
  idElement: number
  soustitre: string
  titre: string
  typeElement: EdApiStudentTimelineTypeElement
}
