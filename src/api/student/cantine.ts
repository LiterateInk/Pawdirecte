import {decodeBarcode, decodeReservation } from "~/decoders/cantine";
import {Account, CantineBarcode, CantineReservations } from "~/models";

type CantineResponse = {
  reservation: CantineReservations | undefined
  barcode: CantineBarcode | undefined
};

/**
 * Returns the modules "RESERVATIONS" and "CANTINE_BARCODE"
 */
export const studentCantine = async (
  account: Account
): Promise<CantineResponse> => {

  const reservations = account.modules.find((v: any) => {
    v.code == "RESERVATIONS";
  });
  const barcode = account.modules.find((v: any) => {
    v.code == "CANTINE_BARCODE";
  });

  return {
    reservation: reservations.enable ?? decodeReservation(reservations),
    barcode: barcode.enable ?? decodeBarcode(barcode)
  };
};
