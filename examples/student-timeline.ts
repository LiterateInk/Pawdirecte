import { ExampleCredentialsError, credentials } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";
import { studentTimeline } from "../src";

void async function main () {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  const { session, account } = await loginUsingCredentials(credentials.student_username, credentials.student_password);
  const timeline = await studentTimeline(session, account);

  if (timeline.length > 0) {
    timeline.forEach((item) => {
      console.log("---");

      console.log(item.title || "(no title)", `(${item.element.type} @ ${item.element.id})`);
      console.log("Publish date:", item.date.toLocaleString());
      console.log("Description:", item.description || "(no description)");

      console.log("Content:\n");
      console.log(item.content || "(no content)");
    });
  }
  else {
    console.log("No timeline items found.");
  }
}();
