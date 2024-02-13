import type { EdApiStudentTimeline, EdStudentTimeline } from "./types";

import { makeApiHandler } from "~/utils/api";
import { makeApiRequest } from "~/utils/request";

export const callApiStudentTimeline = makeApiHandler<EdStudentTimeline>(async (fetcher, input) => {
  const json = await makeApiRequest<EdApiStudentTimeline>(fetcher, {
    path: `/eleves/${input.studentID}/timeline.awp`,
    token: input.token,
    additionalSearchParams: {
      verbe: "get"
    },
    data: {}
  });

  if (json.code !== 200) throw new Error(json.message);
  return json;
});
