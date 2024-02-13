import { initWithCredentials, initWithExportedData, EDStudent } from "../src";
import { ExampleCredentialsError, credentials } from "./_credentials";

(async () => {
  // Check the credentials.
  if (!credentials.student_username || !credentials.student_password) throw new ExampleCredentialsError("student");

  const session = await initWithCredentials(credentials.student_username, credentials.student_password);
  const student = session.clients[0]; // We get the first account registered.

  // We can check the instance of the returned client to be sure we have a student account.
  if (!(student instanceof EDStudent)) throw new Error("Credentials given are not for a student.");

  const timeline = await student.getTimeline();
  timeline.forEach((item) => {
    console.log("---");

    console.log(item.title || "(no title)", `(${item.element.type} @ ${item.element.id})`);
    console.log("Publish date:", item.date.toLocaleString());
    console.log("Description:", item.description || "(no description)");

    console.log("Contenu:\n"); // Line break.
    console.log(item.content || "(no content)");
  });
})();
