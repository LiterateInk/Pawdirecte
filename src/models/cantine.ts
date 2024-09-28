export const ReservationWeekdays = {
  monday: "monday",
  tuesday: "tuesday",
  wednesay: "wednesday",
  thursday: "thursday",
  friday: "friday",
  saturday: "saturday",
  sunday: "sunday"
};

export const ReservationMeals = {
  breakfast: "breakfast",
  lunch: "lunch",
  diner: "diner"
};

export type CantineReservations = Readonly<{
  badge: number
  /**
   * @example "Externe"
   */
  diet: string
  meals: {
    [key in keyof typeof ReservationWeekdays]: {
      [key in keyof typeof ReservationMeals]: boolean
    }
  }
}>;


export type CantineBarcode = Readonly<{
  badgeNumber: number
}>;
