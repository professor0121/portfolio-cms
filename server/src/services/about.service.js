import * as aboutDAO from "../dao/about.dao.js";

// Fetch About info
export const getAboutInfo = async () => {
  return aboutDAO.getAboutDAO();
};

// Update About info
export const setAboutInfo = async (data) => {
  return aboutDAO.setAboutDAO(data);
};
