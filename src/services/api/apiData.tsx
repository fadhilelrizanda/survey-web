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
  questionType: number;
  keyAnswer: number;
  surveyType: number;
}) => {
  try {
    const response = await api.post("/question/post", data); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const getAllPersonalQuestion = async (surveyType: number) => {
  try {
    const response = await api.get(`/personalQuest/getAll`, {
      params: { surveyType }, // This will be appended to the URL as a query string
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function for DELETE request
export const deleteQuestion = async (id: string) => {
  try {
    const response = await api.delete(`/question/delete/${id}`); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

// Function for PATCH request
export const updateQuestion = async (
  id: string,
  data: {
    question: string;
    questionType: string;
    keyAnswer: string;
  }
) => {
  try {
    const response = await api.patch(`/surveyasuh/update/${id}`, data); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

// Function for POST request
export const postPersonalQuestion = async (data: {
  question: string;
  questionType: Number;
  surveyType: Number;
}) => {
  try {
    const response = await api.post(`/personalQuest/post`, data); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const postAns = async (data: {
  pq: { [key: string]: string };
  ans: number[];
  score: number;
  surveyType: number;
}) => {
  try {
    const response = await api.post(`/answer/post`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const gettAllAns = async (surveyType: number) => {
  try {
    // Pass surveyType as a query parameter
    const response = await api.get(`/answer/getAll`, {
      params: { surveyType }, // This will be appended to the URL as a query string
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllQuestion = async (surveyType: number) => {
  try {
    // Pass surveyType as a query parameter
    const response = await api.get(`/question/getAll`, {
      params: { surveyType }, // This will be appended to the URL as a query string
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function for DELETE request
export const deleteAns = async (id: string) => {
  try {
    const response = await api.delete(`/answer/delete/${id}`); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

// Function for DELETE request
export const deletePersonalQuestion = async (id: string) => {
  try {
    const response = await api.delete(`/personalQuest/delete/${id}`); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
