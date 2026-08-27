import api from "../utils/api";

export async function sendMonitoringEvent(payload) {
  try {
    const response = await api.post(
      "/monitoring/event",
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Monitoring API Error:", error);

    throw error.response?.data || error;
  }
}