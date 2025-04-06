import express from 'express';
import cors from "cors";
import api from "./routes/api.js";
import sequelize from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api', api);

app.listen(PORT, "0.0.0.0", async () => {
    console.log(`Server is running on port localhost:${PORT}`);
});

export default app;