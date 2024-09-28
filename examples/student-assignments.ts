import { getAssignments } from "~/api/student/assignment";
import { studentGrades } from "../src";

import { ExampleCredentialsError, credentials } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";

void async function main () {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  const { session, account } = await loginUsingCredentials(credentials.student_username, credentials.student_password);
  const assignments = await getAssignments(session, account, "2024-09-30"); // sensitive NOT ALL ACCOUNTS CAN GO BACK
  console.log(JSON.stringify(assignments));
}();
