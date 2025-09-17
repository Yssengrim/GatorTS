import { pgTable, unique, uuid, timestamp, text, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	name: text().notNull(),
}, (table) => [
	unique("users_name_unique").on(table.name),
]);

export const feeds = pgTable("feeds", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	name: text().notNull(),
	url: text().notNull(),
	userId: uuid("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "feeds_user_id_users_id_fk"
		}).onDelete("cascade"),
	unique("feeds_url_unique").on(table.url),
]);
