import {decodeBarcode, decodeReservation } from "~/decoders/cantine";
import {Account, CantineBarcode, CantineReservations } from "~/models";

type CantineResponse = Readonly<{
  reservation?: CantineReservations
  barcode?: CantineBarcode
}>;

/**
 * Returns the modules "RESERVATIONS" and "CANTINE_BARCODE"
 */
export const studentCantine = async (
  account: Account
): Promise<CantineResponse> => {

  const reservations = account.modules.find((m: any) => m.code === "RESERVATIONS");
  const barcode = account.modules.find((m: any) => m.code === "CANTINE_BARCODE");

  return {
    reservation: reservations.enable ?? decodeReservation(reservations),
    barcode: barcode.enable ?? decodeBarcode(barcode)
  };
};
