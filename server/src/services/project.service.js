// services/project.service.js
import * as projectDao from "../dao/project.dao.js";

export const createProject = async (data) => {
  return await projectDao.create(data);
};

export const getAllProjects = async () => {
  return await projectDao.findAll();
};

export const getProjectById = async (id) => {
  return await projectDao.findById(id);
};

export const updateProjectById = async (id, data) => {
  return await projectDao.updateById(id, data);
};

export const deleteProjectById = async (id) => {
  return await projectDao.deleteById(id);
};

export const getProjectsByUserId = async (userId) => {
  return await projectDao.findByUserId(userId);
};

export const getProjectsByCategory = async (categoryId) => {
  return await projectDao.findByCategory(categoryId);
};

export const searchProjects = async (query) => {
  return await projectDao.search(query);
};

export const getRecentProjects = async (limit) => {
  return await projectDao.findRecent(limit);
};

export const getPopularProjects = async (limit) => {
  return await projectDao.findPopular(limit);
};

export const getProjectsByPagination = async (page, limit) => {
  return await projectDao.paginate(page, limit);
};
