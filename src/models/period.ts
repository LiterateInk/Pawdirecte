// TODO: add "ensembleMatieres" to period object
// ensembleMatieres: {
//   /**
//    * @example "" "2020-10-29 18:00"
//    */
//   dateCalcul: string;
//   /**
//    * @example "15,89"
//    */
//   moyenneGenerale?: string;
//   /**
//    * @example "15,89"
//    */
//   moyenneClasse?: string;
//   /**
//    * @example "9,89"
//    */
//   moyenneMin?: string;
//   /**
//    * @example "15,89"
//    */
//   moyenneMax?: string;
//   nomPP: string;
//   appreciationPP?: string;
//   nomCE: string;
//   appreciationCE?: string;
//   appreciationVS?: string;
//   decisionDuConseil: string;
//   /**
//    * @example "1"
//    */
//   rang?: string;
//   /**
//    * @example "19"
//    */
//   effectif?: string;
//   appreciationGeneraleClasse?: string;
//   disciplines: Array<subject>;
//   disciplinesSimulation: Array<unknown>;

export type Period = Readonly<{
  id: string
  name: string
  yearly: boolean
  isMockExam: boolean
  isEnded: boolean
  startDate: Date
  endDate: Date
  councilDate?: Date
  councilStartHour?: string
  councilEndHour?: string
  councilClassroom?: string
}>;
