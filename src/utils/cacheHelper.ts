import { redis } from "./redisClient";

export async function getOrSetCache<T>(key: string, cb: () => Promise<T>, expireSeconds = 3600): Promise<T> {
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  const freshData = await cb();
  await redis.set(key, JSON.stringify(freshData), "EX", expireSeconds);
  return freshData;
}