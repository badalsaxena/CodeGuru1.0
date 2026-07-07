import API from "../utils/api";

// ======================= GET ALL QUESTIONS =======================
export const getQuestions = async () => {
  const res = await API.get("/questions");
  return res.data;
};

// ======================= GET QUESTION BY ID =======================
export const getQuestionById = async (id) => {
  const res = await API.get(`/questions/${id}`);
  return res.data;
};

// ======================= CREATE QUESTION =======================
export const createQuestion = async (data) => {
  const res = await API.post("/questions", data);
  return res.data;
};

// ======================= UPDATE QUESTION =======================
export const updateQuestion = async (id, data) => {
  const res = await API.put(`/questions/${id}`, data);
  return res.data;
};

// ======================= DELETE QUESTION =======================
export const deleteQuestion = async (id) => {
  const res = await API.delete(`/questions/${id}`);
  return res.data;
};