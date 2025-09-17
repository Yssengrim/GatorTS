import { relations } from "drizzle-orm/relations";
import { users, feeds } from "./schema";

export const feedsRelations = relations(feeds, ({one}) => ({
	user: one(users, {
		fields: [feeds.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	feeds: many(feeds),
}));