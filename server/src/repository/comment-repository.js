import Comment from "../model/comment-model.js";
import User from "../model/user-model.js";

const updateCommentById = async (pId, newContent) => {
  return await Comment.update(
    { content: newContent.content, isEdited: true },
    { where: { id: pId } }
  );
};

const getCommentById = async (pId) => {
  return await Comment.findOne({
    where: {
      id: pId,
    },
  });
};
const deleteCommentById = async (pId) => {
  return await Comment.destroy({
    where: {
      id: pId,
    },
  });
};
const getAllComments = async () => {
  return Comment.findAll({
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
    attributes: {
      exclude: ["userId"],
    },
  });
};
const addNewComment = async (pComment) => {
  return await Comment.create(pComment);
};

const getCommentsByPostId = async (postId) => {
  const comments = await Comment.findAll({
    where: { postId: postId },
  });
  return comments;
};

export default {
  getCommentsByPostId,
  updateCommentById,
  getCommentById,
  deleteCommentById,
  addNewComment,
  getAllComments,
};
