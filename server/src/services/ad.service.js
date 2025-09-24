import * as adDAO from "../dao/ad.dao.js";

// Fetch ads (optionally only active)
export const getAdsService = async (onlyActive = true) => {
  return adDAO.getAdsDAO(onlyActive);
};

// Fetch single ad
export const getAdService = async (id) => {
  return adDAO.getAdByIdDAO(id);
};

// Create ad
export const createAdService = async (data) => {
  return adDAO.createAdDAO(data);
};

// Update ad
export const updateAdService = async (id, data) => {
  return adDAO.updateAdDAO(id, data);
};

// Delete ad
export const deleteAdService = async (id) => {
  return adDAO.deleteAdDAO(id);
};
