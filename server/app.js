const express = require('express');
const app = express();
const cors = require('cors');
const api = require('./routes/api');
const sequelize = require('./config/db');

require('dotenv').config();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api', api);

app.listen(PORT, "0.0.0.0", async() => {
    console.log(`Server is running on port localhost:${PORT}`);
});

module.exports = app;