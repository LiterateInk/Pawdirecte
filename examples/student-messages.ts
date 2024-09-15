import { readMessage, studentReceivedMessages } from "~/api/student/messages";

import { ExampleCredentialsError, credentials } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";

void async function main () {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  const { session, account } = await loginUsingCredentials(credentials.student_username, credentials.student_password);

  const messages = await studentReceivedMessages(session, account);

  for (const message of messages) {
    console.log(`${message.id}: Mail from ${message.sender} at ${message.date.toLocaleDateString("fr-CA")}: ${message.subject} Attachements: ${message.files.length > 0}`);
  }

  const messageId = prompt("Enter message ID:");

  const message = await readMessage(session, account, Number.parseInt(messageId ?? "0"));

  console.log(`\n- ${message.sender}\n${message.subject}\n${message.content}\n\n`);
}();
