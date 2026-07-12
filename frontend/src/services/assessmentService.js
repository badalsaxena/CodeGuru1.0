import API from "../utils/api";

// ======================= GET ALL ASSESSMENTS =======================
export const getAssessments = async () => {
  const res = await API.get("/assessments");
  return res.data;
};

// ======================= GET ASSESSMENT BY ID =======================
export const getAssessmentById = async (id) => {
  const res = await API.get(`/assessments/${id}`);
  return res.data;
};

// ======================= CREATE ASSESSMENT =======================
export const createAssessment = async (data) => {
  const res = await API.post("/assessments", data);
  return res.data;
};

// ======================= UPDATE ASSESSMENT =======================
export const updateAssessment = async (id, data) => {
  const res = await API.put(`/assessments/${id}`, data);
  return res.data;
};

// ======================= DELETE ASSESSMENT =======================
export const deleteAssessment = async (id) => {
  const res = await API.delete(`/assessments/${id}`);
  return res.data;
};

// ======================= ADD QUESTIONS TO ASSESSMENT =======================
export const addQuestionsToAssessment = async (id, questionIds) => {
  const res = await API.post(`/assessments/${id}/questions`, { questionIds });
  return res.data;
};

// ======================= PUBLISH ASSESSMENT =======================
export const publishAssessment = async (id) => {
  const res = await API.patch(`/assessments/${id}/publish`);
  return res.data;
};

// ======================= UNPUBLISH ASSESSMENT =======================
export const unpublishAssessment = async (id) => {
  const res = await API.patch(`/assessments/${id}/unpublish`);
  return res.data;
};