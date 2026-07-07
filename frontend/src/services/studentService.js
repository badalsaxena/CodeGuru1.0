import API from "../utils/api";

// ======================= GET PUBLISHED ASSESSMENTS (Student) =======================
// Students see only published assessments via the /student/assessments route
export const getStudentAssessments = async () => {
  const res = await API.get("/student/assessments");
  return res.data;
};

// ======================= GET STUDENT ASSESSMENT BY ID =======================
export const getStudentAssessmentById = async (id) => {
  const res = await API.get(`/student/assessments/${id}`);
  return res.data;
};

// ======================= START ASSESSMENT =======================
export const startAssessment = async (id) => {
  const res = await API.post(`/student/assessments/${id}/start`);
  return res.data;
};
