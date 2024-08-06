import { credentials, ExampleCredentialsError } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";

void async function main () {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  // If you want to see the code to login, please
  // take a look in the code of this function,
  // this file is only here to be ran.
  await loginUsingCredentials(credentials.student_username, credentials.student_password);
}();
