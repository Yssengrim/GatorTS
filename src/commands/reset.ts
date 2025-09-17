import { resetUsers } from "../lib/db/queries/users";

export async function handlerReset(_: string) {
  await resetUsers();
  console.log("Database reset successfully!");
}
