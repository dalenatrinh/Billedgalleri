// Express importeres
const express = require("express");

// Routes
const createHeartRoute = require("./routes/hearts/createHeartRoute");

const updateHeartRoute = require("./routes/hearts/updateHeartRoute");

// HeartRoutes
const router = express.Router();


router.post("/api/createHeart", createHeartRoute);
router.put("/api/updateHeart", updateHeartRoute);


module.exports = router;
