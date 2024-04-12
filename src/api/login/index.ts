import type { EdApiLogin, EdLogin } from "./types";

import { makeApiHandler } from "~/utils/api";
import { makeApiRequest } from "~/utils/request";

export const callApiLogin = makeApiHandler<EdLogin>(async (fetcher, input) => {
  const base = {
    ...input.doubleAuth,
    identifiant: input.username,
    uuid: input.deviceUUID
  } as const;

  const { data: json } = await makeApiRequest<EdApiLogin>(fetcher, {
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

  if (json.code === 517) { // = "Veuillez mettre l'application à jour vers sa dernière version"
    throw new Error("La constante concernant la version de l'application n'est plus à jour. Veuillez ouvrir une issue sur le GitHub de Pawdirecte pour effectuer une demande de mise à jour.");
  }

  if (json.code !== 200 && json.code !== 250) throw new Error(json.message);
  return json;
});
