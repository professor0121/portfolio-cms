// About Controller

export const createAbout = (req, res) => {  
  res.send("About information created");
};

export const getAbout = (req, res) => {
  res.send("About information");
};

export const getAboutById = (req, res) => {
  res.send(`About information with ID: ${req.params.id}`);
};

export const updateAboutById = (req, res) => {
  res.send(`About information with ID: ${req.params.id} updated`);
};

export const deleteAboutById = (req, res) => {
  res.send(`About information with ID: ${req.params.id} deleted`);
};

// Skills
export const addSkill = (req, res) => res.send("Skill added");
export const removeSkill = (req, res) => res.send("Skill removed");
export const updateSkill = (req, res) => res.send("Skill updated");

// Team Members
export const addTeamMember = (req, res) => res.send("Team member added");
export const removeTeamMember = (req, res) => res.send(`Team member ${req.params.id} removed`);
export const updateTeamMember = (req, res) => res.send(`Team member ${req.params.id} updated`);
export const getAllTeamMembers = (req, res) => res.send("All team members");

// Timeline / Sections
export const getAboutSection = (req, res) => res.send(`About section: ${req.params.section}`);
export const updateAboutSection = (req, res) => res.send(`About section: ${req.params.section} updated`);
export const uploadAboutImage = (req, res) => res.send("About image uploaded");
export const deleteAboutImage = (req, res) => res.send("About image deleted");
export const getAboutTimeline = (req, res) => res.send("About timeline");
export const addAboutTimelineEntry = (req, res) => res.send("About timeline entry added");
export const updateAboutTimelineEntry = (req, res) => res.send(`About timeline entry ${req.params.id} updated`);
