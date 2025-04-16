import axios from "axios";

const instance = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:5001/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
