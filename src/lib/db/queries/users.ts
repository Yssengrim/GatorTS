// ts
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(name: string) {
  const [row] = await db.select().from(users).where(eq(users.name, name));
  return row;
}

export async function resetUsers() {
  await db.delete(users);
}

export async function getUsers() {
  return db.select().from(users);
}

export async function getUserById(id: string) {
  const [row] = await db.select().from(users).where(eq(users.id, id));
  return row;
}