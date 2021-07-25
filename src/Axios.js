import axios from "axios";
import * as functions from "firebase-functions";
let config = require("./env.json");

if (Object.keys(functions.config()).length) {
  config = functions.config();
}

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    key: config.yt_clone.api_key,
  },
});

export default request;
