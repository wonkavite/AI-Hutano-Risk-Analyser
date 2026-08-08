import api from "./api";

// Create a new assessment
export const createAssessment = async (assessmentData) => {
  try {
    const response = await api.post("/assessment/", assessmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get assessment history
export const getAssessmentHistory = async () => {
  try {
    const response = await api.get("/assessment/history");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get a single assessment by ID
export const getAssessmentDetails = async (id) => {
  try {
    const response = await api.get(`/assessment/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};