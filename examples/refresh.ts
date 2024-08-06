import { Session, refresh } from "../src";

import { credentials, ExampleCredentialsError } from "./_credentials";
import { loginUsingCredentials, uuid } from "./_login-using-crendentials";

void async function main () {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  let { session, account } = await loginUsingCredentials(credentials.student_username, credentials.student_password);

  // Initialize another session using previous data.
  // We could've used the previous session instance as well.
  session = new Session(session.username, uuid, session.token, session.double_auth);

  // Refresh the session token and get the accounts for the given session.
  const accounts = await refresh(session, account.token, account.kind);

  // Grab the first account, and show some information.
  account = accounts[0];
  console.log("Re-logged in to", account.first_name, account.last_name, "from", account.school_name);
}();
