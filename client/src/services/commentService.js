import api from "./baseUrl"



const getCommentsByPostId = async (postId) => {
    try {
      const response = await api.get(`/comments?postId=${postId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  



const commentService = {
    getCommentsByPostId
}
export default commentService;