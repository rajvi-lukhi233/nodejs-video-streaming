import { Queue } from "bullmq";
// import { connectRedis } from "../config/redis.config.js";
const redisConnection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),
};

export const videoQueue = new Queue("video-processisg", {
  connection: redisConnection,
});
