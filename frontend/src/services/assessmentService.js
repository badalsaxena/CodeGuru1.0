import API from "./api";

export const getAssessments = async () => {
  const res = await API.get("/assessments");
  return res.data;
};

export const createAssessment = async (data) => {
  const res = await API.post("/assessments", data);
  return res.data;
};