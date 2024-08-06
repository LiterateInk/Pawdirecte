import { Session, login, initDoubleAuth, checkDoubleAuth, DoubleAuthRequired } from "../src";
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
  const session = new Session(username, uuid);

  const accounts = await login(session, password).catch(async (error) => {
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
  });

  console.log(accounts);

  // Grab the first account, and show some information.
  // let user = session.clients[0];
  // console.log("Logged in to", user.firstName, user.lastName, "from", user.schoolName);

  // Create a recovery, used to reconnect !
  // const exported = session.createManagerExport();

  // Initialize another session using the exported data.
  // session = initWithExportedData({
  //   data: exported,
  //   deviceUUID: uuid,

  //   // You can also provide a custom fetcher here.
  //   fetcher: defaultEDFetcher
  // });

  // Grab the first account again.
  // user = session.clients[0];

  // Force a token renewal.
  // console.info("Forcing a renewal of the token.");
  // await user.renewToken();

  // Show again the information, and the new token.
  // console.log("Re-logged in to", user.firstName, user.lastName, "from", user.schoolName);
})();
