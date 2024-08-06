import { studentTimetable } from "../src";

import { ExampleCredentialsError, credentials } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";

void async function main () {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  const { session, account } = await loginUsingCredentials(credentials.student_username, credentials.student_password);
  const startDate = new Date("2024-01-12");

  const timetable = await studentTimetable(session, account, startDate);

  timetable.forEach((item) => {
    console.log("---");
    console.log(item.id);
  });
}();
