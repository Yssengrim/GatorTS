import {
  createFeedFollow,
  getFeedFollowsForUser,
} from "../lib/db/queries/feed-follows";
import { User } from "src/lib/db/schema";
import { deleteFeedFollow } from "../lib/db/queries/feed-follows";
import { getFeedByURL } from "src/lib/db/queries/feeds";

export async function handlerFollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <feed_url>`);
  }

  const feedURL = args[0];
  const feed = await getFeedByURL(feedURL);
  if (!feed) {
    throw new Error(`Feed not found: ${feedURL}`);
  }

  const ffRow = await createFeedFollow(user.id, feed.id);

  console.log(`Feed follow created:`);
  printFeedFollow(ffRow.userName, ffRow.feedName);
}

export async function handlerListFeedFollows(_: string, user: User) {
  const feedFollows = await getFeedFollowsForUser(user.id);
  if (feedFollows.length === 0) {
    console.log(`No feed follows found for this user.`);
    return;
  }

  console.log(`Feed follows for user %s:`, user.id);
  for (let ff of feedFollows) {
    console.log(`* %s`, ff.feedName);
  }
}

export function printFeedFollow(username: string, feedname: string) {
  console.log(`* User:          ${username}`);
  console.log(`* Feed:          ${feedname}`);
}

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <feed_url>`);
  }

  const feedURL = args[0];
  const feed = await getFeedByURL(feedURL);
  if (!feed) {
    throw new Error(`Feed not found: ${feedURL}`);
  }

  const deleted = await deleteFeedFollow(user.id, feed.id);
  if (!deleted) {
    console.log(`You aren't following that feed.`);
    return;
  }

  console.log(`Unfollowed feed:`);
  printFeedFollow(user.name, feed.name);
}
