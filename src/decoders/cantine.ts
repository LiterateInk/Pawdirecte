import {CantineBarcode, CantineReservations, ReservationMeals, ReservationWeekdays } from "~/models";

export const decodeReservation = (item: any): CantineReservations => {
  const meals: CantineReservations["meals"] = {
    monday: {
      breakfast: false,
      lunch: item.params.repasmidi_1 == "1",
      diner: item.params.repassoir_1 == "1"
    },
    tuesday: {
      breakfast: false,
      lunch: item.params.repasmidi_2 == "1",
      diner: item.params.repassoir_2 == "1"
    },
    wednesay: {
      breakfast: false,
      lunch: item.params.repasmidi_3 == "1",
      diner: item.params.repassoir_3 == "1"
    },
    thursday: {
      breakfast: false,
      lunch: item.params.repasmidi_4 == "1",
      diner: item.params.repassoir_4 == "1"
    },
    friday: {
      breakfast: false,
      lunch: item.params.repasmidi_5 == "1",
      diner: item.params.repassoir_5 == "1"
    },
    saturday: {
      breakfast: false,
      lunch: item.params.repasmidi_6 == "1",
      diner: item.params.repassoir_6 == "1"
    },
    sunday: {
      breakfast: false,
      lunch: item.params.repasmidi_7 == "1",
      diner: item.params.repassoir_7 == "1"
    }
  };
  return {
    badge: item.badge,
    diet: item.params.regime,
    meals
  };
};

export const decodeBarcode = (item: any): CantineBarcode => {
  return {
    badgeNumber: item.params.numeroBadge
  };
};
