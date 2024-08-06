import type { DoubleAuthChallenge } from "~/models";
import { atob } from "js-base64";

export function decodeDoubleAuthChallenge (challenge: any): DoubleAuthChallenge {
  return {
    question: atob(challenge.question),
    answers: challenge.propositions.map(atob)
  };
}
