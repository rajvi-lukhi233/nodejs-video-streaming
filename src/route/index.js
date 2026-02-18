import express from "express";
import videoRoute from "./video.route.js";
const route = express.Router();

route.use("/video", videoRoute);

export default route;
