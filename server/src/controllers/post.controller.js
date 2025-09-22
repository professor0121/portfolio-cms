import { 
    createPostService,
    getAllPostsService,
    getPostByIdService,
    updatePostByIdService,
    deletePostByIdService
} from "../services/post.service.js";


export const createPost = async (req, res) => {
  try {
    const { title, content, category, tags, publishStatus, featuredImage } = req.body;
    const userId = req.user.id; 

    console.log("Creating post with data:", {
      title,
      content,
      category,
      tags,
      publishStatus,
      featuredImage,
      userId,
    });

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!title || !content || !category || !publishStatus) {
      return res.status(400).json({
        success: false,
        message: "Title, content, category, and status are required",
      });
    }

    // Ensure featuredImage is mapped correctly
    const formattedFeaturedImage = {
      url:
        typeof featuredImage === "string"
          ? featuredImage
          : featuredImage?.url || "",
      alt: featuredImage?.alt || "",
    };

    const postdata = await createPostService({
      title,
      content,
      category,
      tags,
      publishStatus,
      featuredImage: formattedFeaturedImage,
      author: userId,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: postdata,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const { getAllPosts } = await getAllPostsService();

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: getAllPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch posts",
    });
  }
};


export const getPostById = async (req, res) => {
  try {
    console.log("Fetching post with ID:", req.params.id);
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Post ID is required" });
    }

    const post = await getPostByIdService(id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const updatePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Post ID is required" });
    }

    const updatedPost = await updatePostByIdService(id, updateData);

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Post ID is required" });
    }

    const deletedPost = await deletePostByIdService(id);

    if (!deletedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getPostsByUserId = (req, res) => {
    // Logic for getting posts by user ID
    res.send(`Posts by User ID: ${req.params.userId}`);
}
export const getPostsByCategory = (req, res) => {
    // Logic for getting posts by category
    res.send(`Posts in Category: ${req.params.category}`);
}

export const searchPosts = (req, res) => {
    // Logic for searching posts
    res.send('Search results');
}
export const getRecentPosts = (req, res) => {
    // Logic for getting recent posts
    res.send('Recent posts');
}
export const getPopularPosts = (req, res) => {
    // Logic for getting popular posts
    res.send('Popular posts');
}
export const getPostsByPagination = (req, res) => {
    // Logic for getting posts with pagination
    res.send('Paginated posts');
}
