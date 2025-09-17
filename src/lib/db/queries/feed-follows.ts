import { db } from "..";
import { feeds, feedFollows, users } from "../schema";
import { and, eq } from "drizzle-orm";

export async function createFeedFollow(userId: string, feedId: string) {
  const [row] = await db.insert(feedFollows).values({ userId, feedId }).returning();

  const [result] = await db
    .select({
      id: feedFollows.id,
      createdAt: feedFollows.createdAt,
      updatedAt: feedFollows.updatedAt,
      userId: feedFollows.userId,
      feedId: feedFollows.feedId,
      feedName: feeds.name,
      userName: users.name,
    })
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.id, row.id));

  return result;
}

export async function getFeedFollowsForUser(userId: string) {
  return db
    .select({
      id: feedFollows.id,
      createdAt: feedFollows.createdAt,
      updatedAt: feedFollows.updatedAt,
      userId: feedFollows.userId,
      feedId: feedFollows.feedId,
      feedName: feeds.name,
      userName: users.name,
    })
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.userId, userId));
}

export async function deleteFeedFollow(userId: string, feedId: string) {
  const res = await db
    .delete(feedFollows)
    .where(and(eq(feedFollows.userId, userId), eq(feedFollows.feedId, feedId)))
    .returning({
      id: feedFollows.id,
      userId: feedFollows.userId,
      feedId: feedFollows.feedId,
    });

    return res[0] ?? null;
}