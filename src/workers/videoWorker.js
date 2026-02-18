import { Worker } from "bullmq";
// import { connectRedis } from "../config/redis.config.js";
import fs from "fs";
import { exec } from "child_process";
import path from "path";
const redisConnection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),
};

const worker = new Worker(
  "video-processisg",
  async (job) => {
    const { file } = job.data;
    const uploadDir = path.resolve("src", "uploads", "videos", file);
    const outputDir = path.resolve("src", "uploads", "hls", file);

    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`worker started job ${job.id} file ${file}`);
    const cmd = `
    ffmpeg -i ${uploadDir} \
    -filter_complex \
    [0:v]scale=1280:720[v1out]\
    -map "[v1out]" -map 0:a? -f hls -hls_time 6 -hls_playlist_type vod ${outputDir}/720p.m3u8 
    `;

    await new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr || error.message));
          return;
        }
        console.log("HLS conversion done");
        resolve(stdout);
      });
    });
    console.log(`worker completed job ${job.id}`);
  },
  {
    connection: redisConnection,
  },
);

worker.on("completed", (job) => {
  console.log(`worker job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`worker failed job ${job?.id}`, err.message);
});
