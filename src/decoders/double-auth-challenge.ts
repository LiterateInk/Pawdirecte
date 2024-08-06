import { DoubleAuthChallenge } from "~/models";
import { atob } from "js-base64";

export function decodeDoubleAuthChallenge (content: Record<string, any>): DoubleAuthChallenge {
  const question = atob(content.question);
  const propositions = content.propositions.map(atob);

  return new DoubleAuthChallenge(question, propositions);
}
