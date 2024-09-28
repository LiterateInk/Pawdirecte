import { type Session, login, initDoubleAuth, checkDoubleAuth, DoubleAuthRequired } from "../src";

// This is an identifier that'll be
// linked to the token generated, should be very secure !
export const uuid = "your-device-uuid";

export async function loginUsingCredentials (username: string, password: string) {
  console.info("Initializing a session using credentials...");
  const session: Session = { username, device_uuid: uuid };

  const accounts = await login(session, password).catch(async (error) => {
    // Handle double authentication, if required.
    if (error instanceof DoubleAuthRequired) {
      const qcm = await initDoubleAuth(session);
      console.info("Double authentication required.");
      console.info("Reply to this question:", qcm.question);

      for (const index in qcm.answers) {
        console.info(`[${index}]`, qcm.answers[index]);
      }

      // "prompt" is only available on Bun, you may need
      // something else for Node.js.
      const answerIndex = prompt("Answer the question by providing the index of the answer :");
      if (!answerIndex) throw new Error("No answer provided.");
      const answer = qcm.answers[parseInt(answerIndex)];

      // Answer the question.
      if (await checkDoubleAuth(session, answer))
        console.info("Double authentication confirmed.");

      return login(session, password);
    }

    throw error;
  });

  // Grab the first account, and show some information.
  const account = accounts[0];
  session.accessToken = account.access_token;
  console.log("Logged in to", account.firstName, account.lastName, "from", account.schoolName);

  return { session, account };
}
