import API from "../utils/api";

export const getLeaderboard = async (assessmentId) => {
  const res = await API.get(`/leaderboard/${assessmentId}`);
  return res.data;
};
