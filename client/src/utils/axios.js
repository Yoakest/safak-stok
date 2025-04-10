import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/api", // <- senin API'nin ana adresi
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
