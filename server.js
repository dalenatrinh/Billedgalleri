const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGODB_URI, {
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to the DB.');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from the DB.');
});






