/* eslint-disable @typescript-eslint/no-explicit-any */
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { gettAllAns } from "../services/api/apiData";

export const logout = () => {
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = "/";
};

export const getDescription = (score: number) => {
  if (score >= 0 && score <= 20) {
    return "Sangat Beresiko";
  } else if (score > 20 && score <= 40) {
    return "Kurang Baik";
  } else if (score > 40 && score <= 60) {
    return "Cukup";
  } else if (score > 60 && score <= 80) {
    return "Baik";
  } else if (score > 80 && score <= 100) {
    return "Sangat Baik";
  } else {
    return "Nilai tidak valid";
  }
};

export const downloadExcel = async (surveyType: number) => {
  try {
    // Fetch the answers
    const response = await gettAllAns(surveyType);

    // Log the response to inspect its structure
    console.log("API Response:", response);

    // If response.data is an array, handle each answer separately
    const answers = Array.isArray(response) ? response : [response];

    // Extract the data and format it
    const formattedData = answers.map((answer: any) => {
      // Ensure that answer is valid before accessing its properties
      if (!answer || typeof answer !== "object") {
        return {
          Name: "N/A",
          "Child Name": "N/A",
          Score: "N/A",
          "Created At": "N/A",
        };
      }

      // Check if the user exists and has the required properties
      const user = answer.user || {}; // Default to an empty object if user is missing

      // Format the row for Excel
      return {
        Name: user.name || "N/A", // Use default value if name is missing
        "Child Name": user.childname || "N/A", // Use default value if childname is missing
        Score: answer.score ?? "N/A", // Use default value if score is missing or invalid
        // "Survey Type": answer.surveyType ?? "N/A", // Ensure survey type is valid
        "Created At": answer.createdAt || "N/A", // Add timestamp if needed
      };
    });

    // Log the formatted data to see if it's correct
    console.log("Formatted Data:", formattedData);

    // Create a worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Answers");

    // Convert the workbook to a Blob and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `answers_surveyType_${surveyType}.xlsx`);

    console.log("Excel file downloaded successfully.");
  } catch (error) {
    console.error("Error fetching or downloading data:", error.message);
    throw error;
  }
};
