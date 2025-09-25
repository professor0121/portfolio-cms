import { likeService } from "../services/like.service.js";

export const likeController = {
  async like(req, res) {
    try {
      const { targetId, targetModel } = req.body;
      const userId = req.user._id; // assuming JWT middleware adds req.user

      const like = await likeService.addLike(userId, targetId, targetModel);
      res.status(201).json({ success: true, message: "Liked successfully", data: like });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async unlike(req, res) {
    try {
      const { targetId, targetModel } = req.body;
      const userId = req.user._id;

      const like = await likeService.removeLike(userId, targetId, targetModel);
      res.status(200).json({ success: true, message: "Unliked successfully", data: like });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getLikes(req, res) {
    try {
      const { targetId, targetModel } = req.params;
      const likes = await likeService.getAllLikes(targetId, targetModel);
      res.status(200).json({ success: true, data: likes });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getLikesCount(req, res) {
    try {
      const { targetId, targetModel } = req.params;
      const count = await likeService.getLikesCount(targetId, targetModel);
      res.status(200).json({ success: true, count });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
