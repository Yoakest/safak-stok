import express from "express";
import cors from "cors";
import api from "./routes/api.js";
import sequelize from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api", api);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/client", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});



app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
