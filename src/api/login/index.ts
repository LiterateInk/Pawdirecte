import type { EdApiLogin, EdLogin } from "./types";

import { makeApiHandler } from "~/utils/api";
import { makeApiRequest } from "~/utils/request";

export const callApiLogin = makeApiHandler<EdLogin>(async (fetcher, input) => {
  const base = {
    identifiant: input.username,
    uuid: input.deviceUUID
  } as const;

  const json = await makeApiRequest<EdApiLogin>(fetcher, {
    path: "/login.awp",
    token: input.recovery ? input.managerToken : void 0,
    data: input.recovery ? {
      ...base,
      isReLogin: true,
      accesstoken: input.accessToken,
      motdepasse: "???",
      typeCompte: input.accountType
    } : {
      ...base,
      isReLogin: false,
      identifiant: input.username,
      motdepasse: input.password,
      sesouvenirdemoi: true
    }
  });

  if (json.code !== 200) throw new Error(json.message);
  return json;
});
