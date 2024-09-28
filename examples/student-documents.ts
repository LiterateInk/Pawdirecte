import {FileKind, getFile, studentDocuments } from "../src";
import { ExampleCredentialsError, credentials } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";

void async function main () {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  const { session, account } = await loginUsingCredentials(credentials.student_username, credentials.student_password);
  const documents = await studentDocuments(session);
  for (const document of documents) {
    console.log(`[${documents.indexOf(document)}] ${document.name}, ${document.date} (${document.kind})`);
  }
  let documentId = Number.parseInt(prompt("Which document to dl:")?? "0");
  const file = await getFile(session, FileKind.Other, documentId);
  console.log(file);
}();
