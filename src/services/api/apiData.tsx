import axios from "axios";

// Define the base URL for your API
const API_BASE_URL = "http://localhost:5000"; // Adjust as needed

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function for POST request
export const postQuestion = async (data: {
  question: string;
  questionType: string;
  keyAnswer: string;
}) => {
  try {
    const response = await api.post("/surveyasuh/post", data); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

// Function for GET request with dynamic endpoint
export const getAllQuestion = async (survey: string) => {
  try {
    const response = await api.get(`/${survey}/getAll`); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function for DELETE request
export const deleteQuestion = async (id: string) => {
  try {
    const response = await api.delete(`/surveyasuh/delete/${id}`); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
