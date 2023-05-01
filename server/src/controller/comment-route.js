import express from "express";
import commentRepository from "../repository/comment-repository.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const postId = req.query.postId;
    let comments = [];
    if (postId) {
      comments = await commentRepository.getCommentsByPostId(postId);
    } else {
      comments = await commentRepository.getAllComments();
    }
    res.status(200).send(comments);
  } catch (error) {
    next({ status: 500, message: `Internal Server Error: ${error}` });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newComment = await commentRepository.addNewComment(req.body);
    res.status(201).send(newComment);
  } catch (error) {
    console.error(error);
    next({ status: 500, message: `Internal Server Error: ${error}` });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const comment = await commentRepository.getCommentById(req.params.id);
    if (!comment) return res.status(404).send({ msg: "Comment not found" });
    res.status(200).send(comment);
  } catch (error) {
    console.error(error);
    next({ status: 500, message: `Internal Server Error: ${error}` });
  }
});

// Update a comment by id
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedComment = req.body;
    const comment = await commentRepository.updateCommentById(
      id,
      updatedComment
    );
    if (!comment) {
      return res.status(404).send({ msg: "Comment not found" });
    }
    res.status(200).send(comment);
  } catch (error) {
    next({ status: 500, message: `Internal Server Error: ${error}` });
  }
});

// Delete a comment by id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await commentRepository.deleteCommentById(id);
    res.status(200).json({ msg: `Comment with id ${id} was deleted` });
  } catch (error) {
    console.error(error);
    next({ status: 500, message: `Internal Server Error: ${error}` });
  }
});

export default router;
