import { DoubleAuthChallenge } from "~/models";
import { atob } from "js-base64";

export function decodeDoubleAuthChallenge (challenge: any): DoubleAuthChallenge {
  const question = atob(challenge.question);
  const propositions = challenge.propositions.map(atob);

  return new DoubleAuthChallenge(question, propositions);
}
