import { Session, login, initDoubleAuth, checkDoubleAuth, DoubleAuthRequired, refresh } from "../src";
import { ExampleCredentialsError, credentials } from "./_credentials";

(async () => {
  // This is an identifier that'll be
  // linked to the token generated, should be very secure !
  const uuid = "your-device-uuid";

  // Check the credentials provided in `.env`
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  // Retrieve the credentials.
  const username = credentials.student_username;
  const password = credentials.student_password;

  console.info("Initializing a session using credentials...");
  let session = new Session(username, uuid);

  let accounts = await login(session, password).catch(async (error) => {
    if (error instanceof DoubleAuthRequired) {
      const qcm = await initDoubleAuth(session);
      console.info("Double authentication required.");
      console.info("Reply to this question:", qcm.question);

      for (const index in qcm.answers) {
        console.info(`[${index}]`, qcm.answers[index]);
      }

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
  let user = accounts[0];
  console.log("Logged in to", user.first_name, user.last_name, "from", user.school_name);

  // Initialize another session using previous data.
  session = new Session(user.username, uuid, session.token, session.double_auth);
  // Refresh the token.
  accounts = await refresh(session, user.token, user.account_kind);

  // Regrab the first account, and show some information.
  user = accounts[0];

  // Show again the information, and the new token.
  console.log("Re-logged in to", user.first_name, user.last_name, "from", user.school_name);
})();
