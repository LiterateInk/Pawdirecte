import type { EdApiLogin, EdLogin } from "./types";

import { makeApiHandler } from "~/utils/api";
import { makeApiRequest } from "~/utils/request";

export const edApiLogin = makeApiHandler<EdLogin>(async (fetcher, input) => {
  const json = await makeApiRequest<EdApiLogin>(fetcher, {
    path: "/login.awp",
    token: undefined,
    data: {
      identifiant: input.username,
      motdepasse: input.password,
      isReLogin: false,
      uuid: ""
    }
  });

  if (json.code !== 200) throw new Error(json.message);
  return json;
});
