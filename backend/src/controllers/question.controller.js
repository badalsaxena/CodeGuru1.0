const Question = require("../models/Question.model");

// ====================== CREATE QUESTION ======================

const createQuestion = async (req, res) => {
  try {
    const {
  questionType = "coding",
  subject = "",
  topic = "",

  title,
  description,

  difficulty = "Easy",
  marks = 10,

  tags = [],

  constraints = "",

  sampleTestCases = [],
  hiddenTestCases = [],

  boilerplate = {},

  supportedLanguages = [],

 options = [],
answerKey = "",
maxWords = 0,
correctAnswer = "",

timeLimit = 1,
memoryLimit = 256,

  status = "draft",
} = req.body;

    // Basic Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and Description are required",
      });
    }
    // ✅ Question Type Validation
const allowedTypes = [
  "coding",
  "mcq",
  "subjective",
  "true_false",
];

if (!allowedTypes.includes(questionType)) {
  return res.status(400).json({
    success: false,
    message: "Invalid question type",
  });
}
   // ================= Coding =================

if (questionType === "coding") {

  if (sampleTestCases.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one sample test case is required",
    });
  }

  if (hiddenTestCases.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one hidden test case is required",
    });
  }

}

// ================= MCQ =================

if (questionType === "mcq") {

  if (options.length < 4) {
    return res.status(400).json({
      success: false,
      message: "Minimum 4 options are required",
    });
  }

  const correctOptions = options.filter(
    (option) => option.isCorrect
  );

  if (correctOptions.length !== 1) {
    return res.status(400).json({
      success: false,
      message: "Exactly one correct option is required",
    });
  }

}

// ================= Subjective =================

if (questionType === "subjective") {

  if (!answerKey) {
    return res.status(400).json({
      success: false,
      message: "Answer Key is required",
    });
  }

}

// ================= True False =================

if (questionType === "true_false") {

  if (!correctAnswer) {
    return res.status(400).json({
      success: false,
      message: "Correct Answer is required",
    });
  }

}
    const question = await Question.create({
      title,
      description,
      difficulty,
      marks,
      tags,
      constraints,
      sampleTestCases,
      hiddenTestCases,
      boilerplate,
      supportedLanguages,
      options,
      answerKey,
      maxWords,
      correctAnswer,
      timeLimit,
      memoryLimit,
      status,
      questionType,
      subject,
      topic,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Question Created Successfully",
      question,
    });

  } catch (error) {
    console.error("❌ Create Question Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ====================== GET ALL QUESTIONS ======================

const getAllQuestions = async (req, res) => {
  try {
    const {
  questionType,
  subject,
  difficulty,
  status,
} = req.query;
    const query = {
  createdBy: req.user.id,
};

// Filter by Question Type
if (questionType) {
  query.questionType = questionType;
}

// Filter by Subject
if (subject) {
  query.subject = subject;
}

// Filter by Difficulty
if (difficulty) {
  query.difficulty = difficulty;
}

// Filter by Status
if (status) {
  query.status = status;
}

const questions = await Question.find(query).sort({
  createdAt: -1,
});

    return res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });

  } catch (error) {
    console.error("❌ Get Questions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ====================== GET QUESTION BY ID ======================

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      question,
    });

  } catch (error) {
    console.error("❌ Get Question By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ====================== UPDATE QUESTION ======================

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Ownership Check
    if (question.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this question",
      });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Question Updated Successfully",
      question: updatedQuestion,
    });

  } catch (error) {
    console.error("❌ Update Question Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ====================== DELETE QUESTION ======================

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Ownership Check
    if (question.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this question",
      });
    }

    await Question.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Question Deleted Successfully",
    });

  } catch (error) {
    console.error("❌ Delete Question Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};