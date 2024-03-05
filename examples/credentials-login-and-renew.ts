import { initWithCredentials, EDStudent, defaultEDFetcher, initWithExportedData } from "../src";
import { ExampleCredentialsError, credentials } from "./_credentials";

(async () => {
  // This is a unique identifier that'll be linked to the token generated.
  const uuid = "your-device-uuid";

  // Check the credentials provided in `.env`
  if (!credentials.student_username || !credentials.student_password) throw new ExampleCredentialsError("student");
  console.info("Initializing a session using credentials...");

  let session = await initWithCredentials({
    deviceUUID: uuid,

    username: credentials.student_username,
    password: credentials.student_password,

    // If you want to use a custom fetcher, you can provide it here.
    // It'll use `defaultEDFetcher` by default which uses `fetch` under the hood.
    fetcher: defaultEDFetcher
  });

  // Grab the first account, and show some information.
  let user = session.clients[0];
  console.log("Logged in to", user.firstName, user.lastName, "from", user.schoolName);

  // Create a recovery, used to reconnect !
  const exported = session.createManagerExport();

  // Initialize another session using the exported data.
  session = initWithExportedData({
    data: exported,
    deviceUUID: uuid,

    // You can also provide a custom fetcher here.
    fetcher: defaultEDFetcher
  });

  // Grab the first account again.
  user = session.clients[0];

  // Force a token renewal.
  console.info("Forcing a renewal of the token.");
  await user.renewToken();

  // Show again the information, and the new token.
  console.log("Re-logged in to", user.firstName, user.lastName, "from", user.schoolName);
})();
