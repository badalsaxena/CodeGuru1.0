import axios from "axios";

const API_BASE = "http://localhost:5000/api/v1";

export async function sendMonitoringEvent(payload) {
  try {
    const response = await axios.post(
      `${API_BASE}/monitoring/event`,
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Monitoring API Error:", error);

    throw error.response?.data || error;
  }
}