import type { EdApiLogin, EdLogin } from "./types";

import { makeApiHandler } from "~/utils/api";
import encoder from "~/utils/encoder";

import { API_URL, API_VERSION } from "~/utils/constants";

export const edApiLogin = makeApiHandler<EdLogin>(async (fetcher, input) => {
  const data = encoder<EdApiLogin["request"]>({
    identifiant: input.username,
    motdepasse: input.password,
    isReLogin: false,
    uuid: ""
  });

  const response = await fetcher(`${API_URL}/login.awp?v=${API_VERSION}`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    body: data
  });

  const json = await response.json<EdApiLogin["response"]>();
  if (json.code !== 200) throw new Error(json.message);
  return json;
});
