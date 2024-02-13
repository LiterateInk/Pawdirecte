import { initWithCredentials, initWithExportedData, EDStudent } from "../src";
import { ExampleCredentialsError, credentials } from "./_credentials";

(async () => {
  // Check the credentials.
  if (!credentials.student_username || !credentials.student_password) throw new ExampleCredentialsError("student");

  const session = await initWithCredentials(credentials.student_username, credentials.student_password);
  const student = session.clients[0]; // We get the first account registered.

  // We can check the instance of the returned client to be sure we have a student account.
  if (!(student instanceof EDStudent)) throw new Error("Credentials given are not for a student.");

  console.log("Logged in to", student.firstName, student.lastName, "from", student.schoolName);
  console.log("Token currently used:", student.token);

  // Gives raw data to be used for reconnection purposes.
  // It can be fully serialized and deserialized to be used later.
  const exportedData = session.createDataExport();

  // Whenever you want to reconnect to the same account, you can use the exported data.
  const sessionFromExportedData = initWithExportedData(exportedData);
  const studentFromExportedData = sessionFromExportedData.clients[0];

  console.log("Re-logged in to", studentFromExportedData.firstName, studentFromExportedData.lastName, "from", studentFromExportedData.schoolName);
  console.log("Token currently used:", studentFromExportedData.token);

  // NOTE: If the session got expired, you will need to re-login.
  // You'll know when the session because Pawdirecte will throw an error to tell you, whenever you make a request.
})();
