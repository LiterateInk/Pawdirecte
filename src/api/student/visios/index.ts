import type { EdApiStudentVisios, EdStudentVisios } from "./types";

import { makeApiHandler } from "~/utils/api";
import { makeApiRequest } from "~/utils/request";

export const callApiStudentVisios = makeApiHandler<EdStudentVisios>(async (fetcher, input) => {
  const { data: json } = await makeApiRequest<EdApiStudentVisios>(fetcher, {
    path: `/eleves/${input.studentID}/visios.awp`,
    token: input.token,
    additionalSearchParams: {
      verbe: "get"
    },
    data: {}
  });

  if (json.code !== 200) throw new Error(json.message);
  return json;
});
