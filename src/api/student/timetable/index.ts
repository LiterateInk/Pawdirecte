import type { EdApiStudentTimetable, EdStudentTimetable } from "./types";

import { makeApiHandler } from "~/utils/api";
import { makeApiRequest } from "~/utils/request";

export const callApiStudentTimetable = makeApiHandler<EdStudentTimetable>(async (fetcher, input) => {
  const json = await makeApiRequest<EdApiStudentTimetable>(fetcher, {
    path: `/E/${input.studentID}/emploidutemps.awp`,
    token: input.token,
    additionalSearchParams: {
      verbe: "get"
    },
    data: {
      dateDebut: input.startDate.toLocaleDateString("fr-CA"),
      dateFin: input.endDate.toLocaleDateString("fr-CA"),
      avecTrous: false
    }
  });

  if (json.code !== 200) throw new Error(json.message);
  return json;
});
