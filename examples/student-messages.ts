import { ExampleCredentialsError, credentials } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";
import { getFile, readMessage, studentReceivedMessages } from "~/api";

void async function main () {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  const { session, account } = await loginUsingCredentials(credentials.student_username, credentials.student_password);

  const messages = await studentReceivedMessages(session, account);

  for (const message of messages.chats) {
    console.log(`${message.id}: Mail from ${message.sender} at ${message.date.toLocaleDateString("fr-CA")}: ${message.subject} Attachements: ${message.files.length > 0}`);
  }
  const messageId = prompt("Enter message ID:");

  const message = await readMessage(session, account, Number.parseInt(messageId ?? "0"));
  console.log(`\n- ${message.sender}\n${message.subject}\n${message.content}\n\n`);
  for (const index in message.files) {
    console.log(`${index}: ${message.files[index].name}, ${message.files[index].type}, ${message.files[index].id}`);
  }
  let fileId = Number.parseInt(prompt("Which file do you wish to dl:")?? "0");
  await getFile(session, message.files[fileId].type, message.files[fileId].id);
}();
