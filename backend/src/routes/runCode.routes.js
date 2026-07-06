const express = require("express");

const { executeCode } = require("../controllers/runCode.controller");
const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

// Run Code
router.post("/", verifyToken, executeCode);

module.exports = router;