import express from "express";
import { createResponseHandler } from "smart-response";
import indexRoute from "./route/index.js";
import "./workers/videoWorker.js";

const app = express();

app.use(express.json());
app.use(createResponseHandler());
app.use("/api", indexRoute);

app.use("/videos", express.static("src/uploads/hls"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
