const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const assessmentRoutes = require("./routes/assessment.routes");
const questionRoutes = require("./routes/question.routes");
const studentRoutes = require("./routes/student.routes");
const submissionRoutes = require("./routes/submission.routes");
const attemptRoutes = require("./routes/attempt.routes");
const runCodeRoutes = require("./routes/runCode.routes");
const leaderboardRoutes = require("./routes/leaderboard.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const monitoringRoutes = require("./routes/monitoring.routes");

const app = express();

// ======================= Middlewares =======================
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// ======================= Routes =======================

app.use("/api/v1", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/assessments", assessmentRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/submissions", submissionRoutes);
app.use("/api/v1/attempts", attemptRoutes);
app.use("/api/v1/run-code", runCodeRoutes);
app.use("/api/v1/leaderboard", leaderboardRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/monitoring", monitoringRoutes);

// ======================= Test Route =======================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeGuru Backend is Running 🚀",
  });
});

module.exports = app;