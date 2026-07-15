const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const {
  getLeaderboard,
} = require("../controllers/leaderboard.controller");

// Get Leaderboard
router.get("/:assessmentId", verifyToken, getLeaderboard);

module.exports = router;