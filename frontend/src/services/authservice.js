import api from "../utils/api";

// ======================= REGISTER =======================

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      success: false,
      message: "Something went wrong",
    };
  }
};

// ======================= LOGIN =======================

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      success: false,
      message: "Something went wrong",
    };
  }
};

// ======================= LOGOUT =======================

export const logoutUser = () => {
  localStorage.removeItem("token");
};

// ======================= GET TOKEN =======================

export const getToken = () => {
  return localStorage.getItem("token");
};

// ======================= CHECK LOGIN =======================

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};