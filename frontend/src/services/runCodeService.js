import API from "../utils/api";

// ======================= RUN CODE =======================
// Sends code to the backend judge service
export const runCode = async ({ questionId, code, language }) => {
  const res = await API.post("/run-code", { questionId, code, language });
  return res.data;
};
