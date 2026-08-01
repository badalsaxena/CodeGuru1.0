/**
 * repairQuestionTypes.js
 * ───────────────────────────────────────────────────────────────────────────
 * One-time migration script — run manually whenever old questions in the DB
 * are missing or have an incorrect `questionType` field.
 *
 * Usage:
 *   npm run repair-question-types
 *
 * Detection logic (data-shape based, safest approach):
 *   MCQ        → has options[0].text filled, no test cases
 *   True/False → has correctAnswer = "true"/"false", no test cases
 *   Subjective → has answerKey filled, no options, no test cases
 *   Coding     → has sampleTestCases or hiddenTestCases filled
 *
 * ONLY the `questionType` field is written.
 * No other fields (title, description, options, marks, etc.) are touched.
 * ───────────────────────────────────────────────────────────────────────────
 */

require("dotenv").config();

const mongoose = require("mongoose");
const Question = require("../models/Question.model");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set in .env");
  process.exit(1);
}

const noTestCases = [
  {
    $or: [
      { sampleTestCases: { $exists: false } },
      { sampleTestCases: { $size: 0 } },
    ],
  },
  {
    $or: [
      { hiddenTestCases: { $exists: false } },
      { hiddenTestCases: { $size: 0 } },
    ],
  },
];

const needsRepair = {
  $or: [
    { questionType: { $exists: false } },
    { questionType: "coding" },
  ],
};

const repairQuestionTypes = async () => {
  console.log("🔧 Starting questionType repair...\n");

  // ── Step 1: MCQ ──────────────────────────────────────────────────────────
  const mcq = await Question.updateMany(
    {
      ...needsRepair,
      "options.0.text": { $exists: true, $ne: "" },
      $and: noTestCases,
    },
    { $set: { questionType: "mcq" } }
  );

  // ── Step 2: True / False ─────────────────────────────────────────────────
  const tf = await Question.updateMany(
    {
      ...needsRepair,
      correctAnswer: { $in: ["true", "false"] },
      $and: noTestCases,
    },
    { $set: { questionType: "true_false" } }
  );

  // ── Step 3: Subjective ───────────────────────────────────────────────────
  const subj = await Question.updateMany(
    {
      ...needsRepair,
      answerKey: { $exists: true, $ne: "" },
      "options.0": { $exists: false },
      $and: noTestCases,
    },
    { $set: { questionType: "subjective" } }
  );

  // ── Step 4: Coding — fallback for anything still missing the field ────────
  const coding = await Question.updateMany(
    {
      questionType: { $exists: false },
      $or: [
        { sampleTestCases: { $exists: true, $not: { $size: 0 } } },
        { hiddenTestCases:  { $exists: true, $not: { $size: 0 } } },
      ],
    },
    { $set: { questionType: "coding" } }
  );

  // ── Report ────────────────────────────────────────────────────────────────
  const total =
    mcq.modifiedCount + tf.modifiedCount +
    subj.modifiedCount + coding.modifiedCount;

  console.log("📊 Repair Results:");
  console.log(`   mcq        → ${mcq.modifiedCount}  updated`);
  console.log(`   true_false → ${tf.modifiedCount}  updated`);
  console.log(`   subjective → ${subj.modifiedCount}  updated`);
  console.log(`   coding     → ${coding.modifiedCount}  updated`);
  console.log(`   ──────────────────────`);
  console.log(`   total      → ${total}  updated`);

  if (total === 0) {
    console.log("\n✅ All questions already have correct questionType. Nothing to repair.");
  } else {
    console.log(`\n✅ Repair complete — ${total} question(s) fixed.`);
  }
};

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    await repairQuestionTypes();
  } catch (err) {
    console.error("❌ Script failed:", err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB");
    process.exit(0);
  }
})();
