import express from "express";
import { upload } from "../util/multer.js";
import { getJob, uploadVideo } from "../controller/video.controller.js";
const route = express.Router();

route.post("/upload", upload.single("video"), uploadVideo);
route.get("/job/:id", getJob);

export default route;
