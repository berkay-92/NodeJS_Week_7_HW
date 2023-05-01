import api from "./baseUrl";

const getPosts = async (order = 'asc') => {
  try {
    const response = await api.get(`/posts?order=${order}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



const createPost = async (pNewPost) => {
  try {
    const response = await api.post("/posts", pNewPost);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPostsByUserId = async (userId) => {
  try {
    const response = await api.get(`/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPostById = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const generatePdf = async (postId) => {
  try {
    // Send GET request to /generate-pdf endpoint
    const response = await api.get(`/posts/pdf/${postId}`, {
      responseType: 'blob', // Set the response type to 'blob' to receive binary data
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
    const blob = response.data

    // Create a download link and trigger download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `post_${postId}.pdf`; 
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error('Failed to generate PDF:', error);
  }
}
const postService = {
  getPosts,
  createPost,
  getPostsByUserId,
  getPostById,
  generatePdf
};

export default postService;
