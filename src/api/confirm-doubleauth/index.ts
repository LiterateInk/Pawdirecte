import type { ApiConfirmDoubleAuth, EdApiConfirmDoubleAuth } from "./types";

import { makeApiHandler } from "~/utils/api";
import { makeApiRequest } from "~/utils/request";

import { btoa } from "js-base64";

export const callApiConfirmDoubleAuth = makeApiHandler<ApiConfirmDoubleAuth>(async (fetcher, input) => {
  const { data: json, token } = await makeApiRequest<EdApiConfirmDoubleAuth>(fetcher, {
    path: "/connexion/doubleauth.awp",
    token: input.token,
    data: {
      choix: btoa(input.choice)
    },
    additionalSearchParams: {
      verbe: "post"
    }
  });

  if (json.code !== 200) throw new Error(json.message);

  return {
    token: json.token,
    values: json.data
  };
});
