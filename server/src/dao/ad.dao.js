import Ad from "../models/ads.model.js";

// Get all ads (optionally only active)
export const getAdsDAO = async (onlyActive = true) => {
  const query = onlyActive ? { isActive: true } : {};
  return Ad.find(query).sort({ createdAt: -1 });
};

// Get a single ad by ID
export const getAdByIdDAO = async (id) => {
  return Ad.findById(id);
};

// Create a new ad
export const createAdDAO = async (data) => {
  const ad = new Ad(data);
  return ad.save();
};

// Update an ad by ID
export const updateAdDAO = async (id, data) => {
  return Ad.findByIdAndUpdate(id, data, { new: true });
};

// Delete an ad by ID
export const deleteAdDAO = async (id) => {
  return Ad.findByIdAndDelete(id);
};
