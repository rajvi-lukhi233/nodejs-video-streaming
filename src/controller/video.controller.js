import { videoQueue } from "../queue/vedioQueue.js";

export const uploadVideo = async (req, res) => {
  try {
    const fileName = req.file?.filename;
    await videoQueue.add("transcode-video", {
      file: fileName,
    });
    return res.success(200, "Processing started,video uploaded.", {
      file: fileName,
    });
  } catch (error) {
    console.log("UploadVideo API Error:", error);
    return res.fail(500, "Internal server error");
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await videoQueue.getJob(req.params.id);
    if (!job) {
      res.fail(404, "Job not found.");
    }
    const state = await job.getState();
    res.success(200, "Job get successfully.", {
      id: job.id,
      name: job.name,
      state,
      progress: job.progress,
      video: `${process.env.BASE_URL}/videos/${job.data.file}/720p.m3u8`,
    });
  } catch (error) {
    console.log("GetJob API Error:", error);
    return res.fail(500, "Internal server error");
  }
};
