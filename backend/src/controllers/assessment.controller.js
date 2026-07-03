const Assessment = require("../models/Assessment.model");

// ====================== CREATE ASSESSMENT ======================

const createAssessment = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      totalMarks,
      startTime,
      endTime,
    } = req.body;

    // Validation
    if (!title || !duration) {
      return res.status(400).json({
        success: false,
        message: "Title and Duration are required",
      });
    }

    const assessment = await Assessment.create({
      title,
      description,
      teacher: req.user.id,
      duration,
      totalMarks,
      startTime,
      endTime,
    });

    res.status(201).json({
      success: true,
      message: "Assessment Created Successfully",
      assessment,
    });

  } catch (error) {
    console.error("❌ Create Assessment Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ====================== GET ALL ASSESSMENTS ======================

const getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({
      teacher: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assessments.length,
      assessments,
    });

  } catch (error) {
    console.error("❌ Get Assessments Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ====================== GET ASSESSMENT BY ID ======================

const getAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const assessment = await Assessment.findById(id);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      assessment,
    });

  } catch (error) {
    console.error("❌ Get Assessment By ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ====================== UPDATE ASSESSMENT ======================

const updateAssessment = async (req, res) => {
  try {
    const { id } = req.params;

    const assessment = await Assessment.findById(id);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    // Ownership Check
    if (assessment.teacher.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this assessment",
      });
    }

    const updatedAssessment = await Assessment.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Assessment Updated Successfully",
      assessment: updatedAssessment,
    });

  } catch (error) {
    console.error("❌ Update Assessment Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ====================== DELETE ASSESSMENT ======================

const deleteAssessment = async (req, res) => {
  try {
    const { id } = req.params;

    const assessment = await Assessment.findById(id);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    // Ownership Check
    if (assessment.teacher.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this assessment",
      });
    }

    await Assessment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Assessment Deleted Successfully",
    });

  } catch (error) {
    console.error("❌ Delete Assessment Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ====================== EXPORTS ======================

module.exports = {
  createAssessment,
  getAllAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
};
