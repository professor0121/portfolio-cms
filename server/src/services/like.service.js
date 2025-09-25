import { likeDao } from "../dao/like.dao.js";

export const likeService = {
  async addLike(userId, targetId, targetModel) {
    const existingLike = await likeDao.findLike({ user: userId, targetId, targetModel });

    if (existingLike) {
      throw new Error("Already liked");
    }

    return await likeDao.createLike({ user: userId, targetId, targetModel });
  },

  async removeLike(userId, targetId, targetModel) {
    const deleted = await likeDao.deleteLike({ user: userId, targetId, targetModel });
    if (!deleted) throw new Error("Like not found");
    return deleted;
  },

  async getLikesCount(targetId, targetModel) {
    return await likeDao.countLikes(targetId, targetModel);
  },

  async getAllLikes(targetId, targetModel) {
    return await likeDao.getLikes(targetId, targetModel);
  },
};
