import API from "../utils/api";

// ======================= CREATE SUBMISSION =======================
export const createSubmission = async (data) => {
  // data: { questionId, assessmentId, code, language }
  const res = await API.post("/submissions", data);
  return res.data;
};

// ======================= GET MY SUBMISSIONS =======================
export const getMySubmissions = async () => {
  const res = await API.get("/submissions");
  return res.data;
};

// ======================= GET SUBMISSION BY ID =======================
export const getSubmissionById = async (id) => {
  const res = await API.get(`/submissions/${id}`);
  return res.data;
};
