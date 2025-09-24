import {
  createCommentService,
  getCommentsService,
  likeCommentService,
  unlikeCommentService,
} from "../services/comment.service.js";

export const createComment = async (req, res) => {
  try {
    const { content, parent, type, typeId } = req.body;
    const userId = req.user._id;

    if (!["post", "course", "project", "note"].includes(type)) {
      return res.status(400).json({ message: "Invalid comment type" });
    }

    const data = {
      user: userId,
      content,
      parent: parent || null,
      [type]: typeId,
    };

    const comment = await createCommentService(data);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { type, typeId } = req.params;

    if (!["post", "course", "project", "note"].includes(type)) {
      return res.status(400).json({ message: "Invalid comment type" });
    }

    const comments = await getCommentsService(type, typeId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await likeCommentService(commentId, userId);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const unlikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await unlikeCommentService(commentId, userId);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
