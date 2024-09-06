/**
 * @param date french date string as "dd/mm/yyyy"
 * @returns Date object
 */
export const decodeFrenchDate = (date: string): Date => {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day);
};
