import * as aboutService from "../services/about.service.js";

// GET About info
export const fetchAbout = async (req, res) => {
  try {
    const about = await aboutService.getAboutInfo();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST/PUT - Update About info
export const updateAbout = async (req, res) => {
  try {
    const data = req.body; // title, description, skills, teamMembers, timeline, profileImage
    const about = await aboutService.setAboutInfo(data);
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
