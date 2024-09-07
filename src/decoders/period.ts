import { Period } from "~/models";

export const decodePeriod = (item: any): Period => {
  return {
    id: item.idPeriode,
    startDate: new Date(item.dateDebut),
    endDate: new Date(item.dateFin),
    isEnded: item.cloture,
    councilDate: new Date(item.dateConseil),
    councilClassroom: item.salleConseil,
    councilStartHour: item.heureConseil,
    councilEndHour: item.heureFinConseil,
    isMockExam: item.examenBlanc,
    yearly: item.annuel,
    name: item.periode
  };
};
