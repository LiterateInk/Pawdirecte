export interface EdApiStudentTimetableItem {
  /**
   * Full name of the class attributed to the item.
   */
  classe: string

  /**
   * Short name of the class attributed to the item.
   * @example "1CIEL"
   */
  classeCode: string
  classeId: number

  /**
   * Short name for the subject name.
   * @example "SCPHY"
   */
  codeMatiere: string

  /**
   * HEX color of the item in the timetable.
   * @example "#dec9d5"
   */
  color: string

  contenuDeSeance: boolean
  devoirAFaire: boolean
  dispensable: boolean
  dispense: number

  /**
   * @example "2024-02-14 12:15"
   */
  end_date: string

  // NOTE: Not sure what those are.
  groupe: string
  groupeCode: string
  groupeId: number

  // NOTE: Not sure what that is for now.
  icone: string

  id: number

  isAnnule: boolean
  isFlexible: boolean
  isModifie: boolean

  /**
   * Full name of the subject.
   * @example "SCIENCES PHYSIQUES"
   */
  matiere: string

  /**
   * Name of the teacher for the lesson.
   * @example "JOHN D."
   */
  prof: string

  /**
   * Classroom attributed for the lesson.
   * @example "SA - A21"
   */
  salle: string

  /**
   * @example "2024-02-14 08:15"
   */
  start_date: string

  /**
   * Text contained inside of the timetable item.
   */
  text: string

  // TODO: Find more types !
  typeCours: "COURS" | "PERMANENCE" | "CONGE"
}
