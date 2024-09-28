import { studentCantine } from "../src";

import { ExampleCredentialsError, credentials } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";

void async function main () {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  const { account } = await loginUsingCredentials(credentials.student_username, credentials.student_password);
  const cantine = await studentCantine(account);
  console.log(cantine);
}();
