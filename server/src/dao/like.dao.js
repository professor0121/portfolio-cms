import Like from "../models/like.model.js";

export const likeDao = {
  async createLike(data) {
    return await Like.create(data);
  },

  async findLike(query) {
    return await Like.findOne(query);
  },

  async deleteLike(query) {
    return await Like.findOneAndDelete(query);
  },

  async countLikes(targetId, targetModel) {
    return await Like.countDocuments({ targetId, targetModel, type: "like" });
  },

  async getLikes(targetId, targetModel) {
    return await Like.find({ targetId, targetModel, type: "like" }).populate("user", "name email");
  },
};
