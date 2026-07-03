const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const assessmentRoutes = require("./routes/assessment.routes");

const app = express();

// ======================= Middlewares =======================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// ======================= Routes =======================

app.use("/api/v1", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/assessments", assessmentRoutes);

// ======================= Test Route =======================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeGuru Backend is Running 🚀",
  });
});

module.exports = app;