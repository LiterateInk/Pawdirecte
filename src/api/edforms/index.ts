import type { EdApiEdforms, EdEdforms } from "./types";

import { makeApiHandler } from "~/utils/api";
import { makeApiRequest } from "~/utils/request";

export const callApiEdforms = makeApiHandler<EdEdforms>(async (fetcher, input) => {
  const json = await makeApiRequest<EdApiEdforms>(fetcher, {
    path: "/edforms.awp",
    token: input.token,
    additionalSearchParams: {
      verbe: "list"
    },
    data: {
      idEntity: parseInt(input.id),
      typeEntity: "E"
    }
  });

  if (json.code !== 200) throw new Error(json.message);
  return json;
});
