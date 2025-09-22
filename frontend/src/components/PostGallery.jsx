import React, { useEffect } from "react";
import { Card } from "./ui/card";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "../redux/slices/postSlice";
import { Link } from "react-router-dom";

const PostGallery = ({ className }) => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <Card className={`p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>

      {loading && <p className="text-center py-4">Loading...</p>}
      {error && <p className="text-center text-red-500 py-4">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.data?.length > 0 ? (
          posts.data.map((post) => (
            <Link
              to={`/posts/${post._id}`}
              key={post._id}
              className="block"
            >
              <Card className="bg-white dark:bg-gray-800 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer">
                {post.featuredImage?.url && (
                  <img
                    src={post.featuredImage.url}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.content}
                </p>
                <p className="text-sm text-gray-500">
                  Category: {post.category?.name || "Uncategorized"}
                </p>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full py-4 text-gray-500">
            No posts available.
          </p>
        )}
      </div>
    </Card>
  );
};

export default PostGallery;
