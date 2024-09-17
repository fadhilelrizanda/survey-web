export const logout = () => {
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = "/";
};
