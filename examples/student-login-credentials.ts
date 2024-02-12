import { initWithCredentials, EDStudent } from "../src";
import { ExampleCredentialsError, credentials } from "./_credentials";

(async () => {
  // Check the credentials.
  if (!credentials.student_username || !credentials.student_password) throw new ExampleCredentialsError("student");

  const accounts = await initWithCredentials(credentials.student_username, credentials.student_password);
  const student = accounts[0]; // We get the first account retrieved.

  // We can check the instance of the returned client to be sure we have a student account.
  if (!(student instanceof EDStudent)) throw new Error("Credentials given are not for a student.");

  console.log("Logged in to", student.firstName, student.lastName, "from", student.schoolName);
  console.log("Token currently used:", student.token);
})();
