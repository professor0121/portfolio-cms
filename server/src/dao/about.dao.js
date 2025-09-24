import About from "../models/about.model.js";

// Fetch the single About document
export const getAboutDAO = async () => {
  return About.findOne();
};

// Create or update the About document
export const setAboutDAO = async (data) => {
  const existing = await About.findOne();
  if (existing) {
    return About.findByIdAndUpdate(existing._id, data, { new: true });
  } else {
    const about = new About(data);
    return about.save();
  }
};
