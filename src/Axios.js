import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    key: "AIzaSyB_av3P7N7GkbIlDRlE6JhwnBkwPLgpm5s",
  },
});

export default request;
