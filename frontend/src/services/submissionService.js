import API from "../utils/api";

// ======================= CREATE SUBMISSION =======================
export const createSubmission = async (data) => {
  const { questionId, assessmentId, ...rest } = data;
  const payload = {
    ...rest,
    question: data.question || questionId,
    assessment: data.assessment || assessmentId,
  };

  const res = await API.post("/submissions", payload);
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
