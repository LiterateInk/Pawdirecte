import type { EdApiDoubleAuth, ApiDoubleAuth } from "./types";

import { makeApiHandler } from "~/utils/api";
import { makeApiRequest } from "~/utils/request";

import { atob } from "js-base64";

export const callApiDoubleAuth = makeApiHandler<ApiDoubleAuth>(async (fetcher, input) => {
  const { data: json, token } = await makeApiRequest<EdApiDoubleAuth>(fetcher, {
    path: "/connexion/doubleauth.awp",
    token: input.token,
    data: {},
    additionalSearchParams: {
      verbe: "get"
    }
  });

  if (json.code !== 200) throw new Error(json.message);

  return {
    question: atob(json.data.question),
    answers: json.data.propositions.map((value) => atob(value)),
    token
  };
});
