import mongoose from "mongoose";
// controllers/project.controller.js
import * as projectService from "../services/project.service.js";

export const createProject = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user's ID
    const projectData = { ...req.body, author: userId }; // attach author
    const project = await projectService.createProject(projectData);
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating project", error: error.message });
  }
};


export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};


export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching project with ID:", id);

    // Validate ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await projectService.getProjectById(id);
    console.log("Fetched project:", project);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error in getProjectById:", error.message);
    res.status(500).json({ message: "Error fetching project" });
  }
};


export const updateProjectById = async (req, res) => {
  try {
    const project = await projectService.updateProjectById(
      req.params.id,
      req.body
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: "Error updating project", error });
  }
};

export const deleteProjectById = async (req, res) => {
  try {
    const project = await projectService.deleteProjectById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};

export const getProjectsByUserId = async (req, res) => {
  try {
    const projects = await projectService.getProjectsByUserId(req.params.userId);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

export const getProjectsByCategory = async (req, res) => {
  try {
    const projects = await projectService.getProjectsByCategory(req.params.category);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

export const searchProjects = async (req, res) => {
  try {
    const projects = await projectService.searchProjects(req.query.q || "");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error searching projects", error });
  }
};

export const getRecentProjects = async (req, res) => {
  try {
    const projects = await projectService.getRecentProjects(req.query.limit || 5);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent projects", error });
  }
};

export const getPopularProjects = async (req, res) => {
  try {
    const projects = await projectService.getPopularProjects(req.query.limit || 5);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular projects", error });
  }
};

export const getProjectsByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const data = await projectService.getProjectsByPagination(Number(page), Number(limit));
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching paginated projects", error });
  }
};
