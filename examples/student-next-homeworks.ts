import {setHomeworkState, studentComingHomeworks } from "../src";

import { ExampleCredentialsError, credentials } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";

void async function main () {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  const { session, account } = await loginUsingCredentials(credentials.student_username, credentials.student_password);
  const nextAssignments = await studentComingHomeworks(session, account);
  for (const dayAssignements of nextAssignments) {
    console.log(`Devoirs du ${dayAssignements.date}`);
    for (const homework of dayAssignements.homeworks) {
      console.log(`[${homework.id}] ${homework.subject} (${homework.done ? "Done": "Todo"})`);
    }
  }
  const homeworkId = Number.parseInt(prompt("Enter homework id to toggle done state:")?? "0");
  await setHomeworkState(session, account, homeworkId, true);
  // Two long lines to get updated homework object (search the day of the homework, then find the homework object itself)
  const freshNextAssignements = (await studentComingHomeworks(session, account)).find((v) => {
    return v.homeworks.find((h) => h.id == homeworkId);
  });
  const homework = freshNextAssignements?.homeworks.find((h) => h.id == homeworkId);
  if (homework) {
    console.log(`--> [${homework.id}] ${homework.subject} (${homework.done ? "Done": "Todo"})`);
  }
  else {
    console.log("Error");
  }
}();
