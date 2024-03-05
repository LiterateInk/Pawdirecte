import { initWithCredentials } from "../src";
import { ExampleCredentialsError, credentials } from "./_credentials";

(async () => {
  // Check the credentials.
  if (!credentials.student_username || !credentials.student_password) throw new ExampleCredentialsError("student");

  const session = await initWithCredentials({
    deviceUUID: "your-device-uuid",

    username: credentials.student_username,
    password: credentials.student_password
  });

  // We can run it on every sessions, apparently it's a global endpoint.
  for (const client of session.clients) {
    const response = await client.getEdforms();
    // NOTE: Not sure what the response looks like.
    // I get an empty array on the account I got...
    console.log(response);
  }
})();
