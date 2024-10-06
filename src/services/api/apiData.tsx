import axios from "axios";

// Define the base URL for your API
const API_BASE_URL = "https://survey-web-api.vercel.app"; // Adjust as needed

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
  score: number;
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

export const postUser = async (data: {
  uniqueId: string;
  name: string;
  currentDate: string;
  childname: string;
  childDate: string;
  age: number;
  gender: number;
}) => {
  try {
    const response = await api.post("/users/post", data); // Ensure the endpoint matches your API route
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
    score: number;
  }
) => {
  try {
    const response = await api.patch(`/question/update/${id}`, data); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};
export const updateUserSurvey = async (
  id: string,
  idSurvey: number,
  data: {
    surveyA?: boolean; // Optional fields for each survey
    surveyB?: boolean;
    surveyC?: boolean;
  }
) => {
  let urlSurvey: string;

  try {
    switch (idSurvey) {
      case 1:
        urlSurvey = "surveyA";
        break;
      case 2:
        urlSurvey = "surveyB";
        break;
      case 3:
        urlSurvey = "surveyC";
        break;
      default:
        throw new Error("Invalid ID");
    }

    const response = await api.patch(`/${urlSurvey}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating survey:", error);
    throw error;
  }
};
// Function for POST request
export const postPersonalQuestion = async (data: {
  question: string;
  questionType: number;
  surveyType: number;
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
  // pq: { [key: string]: string };
  ans: number[];
  score: number;
  surveyType: number;
  userId: string;
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
    const response = await api.get(`/answer/getAllAns`, {
      params: { surveyType }, // This will be appended to the URL as a query string
    });
    console.log(response.data);
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

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/users/delete/${id}`); // Ensure the endpoint matches your API route
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
