import { initWithCredentials, EDStudent } from "../src";
import { ExampleCredentialsError, credentials } from "./_credentials";

(async () => {
  // Check the credentials.
  if (!credentials.student_username || !credentials.student_password) throw new ExampleCredentialsError("student");

  const student = await initWithCredentials(credentials.student_username, credentials.student_password);
  // We can check the instance of the returned client to be sure we have a student account.
  if (!(student instanceof EDStudent)) throw new Error("Credentials given are not for a student.");

  console.log("OK ! We are logged in.");
})();
