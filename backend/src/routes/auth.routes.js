const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile,
  getAllUsers,
} = require("../controllers/auth.controller");

const verifyToken = require("../middleware/auth.middleware");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", verifyToken, getProfile);

// Admin: list all users
router.get("/users", verifyToken, getAllUsers);

module.exports = router;