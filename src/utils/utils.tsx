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
