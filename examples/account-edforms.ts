import { accountEdforms } from "../src";

import { ExampleCredentialsError, credentials } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";

void async function main () {
  // Check the credentials.
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  // Retrieve the credentials.
  const username = credentials.student_username;
  const password = credentials.student_password;

  const { session, account } = await loginUsingCredentials(username, password);
  const forms = await accountEdforms(session, account);

  console.log(forms);
}();
