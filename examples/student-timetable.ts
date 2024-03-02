import { initWithCredentials, EDStudent } from "../src";
import { ExampleCredentialsError, credentials } from "./_credentials";

(async () => {
  // Check the credentials.
  if (!credentials.student_username || !credentials.student_password) throw new ExampleCredentialsError("student");

  const session = await initWithCredentials(credentials.student_username, credentials.student_password);
  const student = session.clients[0]; // We get the first account registered.

  // We can check the instance of the returned client to be sure we have a student account.
  if (!(student instanceof EDStudent)) throw new Error("Credentials given are not for a student.");

  const startDate = new Date("2024-01-12");

  const timetable = await student.getTimetable(startDate);
  timetable.forEach((item) => {
    console.log("---");
    console.log(item.id);
  });
})();
