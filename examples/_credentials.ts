import { config } from "dotenv";
import { join } from "node:path";
// Load the `.env` file configuration.
config({ path: join(__dirname, ".env") });

// Export the credentials.
export const credentials = {
  student_username: process.env.ED_STUDENT_USERNAME,
  student_password: process.env.ED_STUDENT_PASSWORD,
  parent_username: process.env.ED_PARENT_USERNAME,
  parent_password: process.env.ED_PARENT_PASSWORD
};

export class ExampleCredentialsError extends Error {
  constructor(type: "student" | "parent") {
    super(`You need to provide credentials in the \`.env\` file for the ${type.toUpperCase()} account.`);
  }
}
