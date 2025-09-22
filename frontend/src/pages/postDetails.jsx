import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostById } from "../redux/slices/postSlice";
import PostGallery from "../components/PostGallery";
import PageHero from "../components/PageHero";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-10">
        {typeof error === "string" ? error : "Failed to load post"}
      </p>
    );
  }

  if (!post) {
    return <p className="text-center py-10">Post not found</p>;
  }

  return (
    <div>
      <PageHero
        heading="Posts"
        subheading="A showcase of my projects, highlighting my skills and expertise in web development."
        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        cta={{ text: "Read More", link: "/post" }}
      />
      <Card className="max-w-4xl mx-auto my-10 p-6 shadow-lg rounded-xl">
        {/* Featured Image */}
        {post.featuredImage?.url && (
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            className="w-full h-80 object-cover rounded-md mb-6"
          />
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6 text-sm">
          <span>By: {post.author?.name || "Unknown"}</span>
          <span>• Category: {post.category?.name || "Uncategorized"}</span>
          <span>• Published: {new Date(post.createdAt).toLocaleDateString()}</span>
          <span>• Views: {post.views}</span>
          <span>• Likes: {post.likes?.length || 0}</span>
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag._id}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <p className="text-gray-800 leading-relaxed mb-8">{post.content}</p>

        {/* Review */}
        {post.review && (
          <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mb-8 rounded">
            <h2 className="text-lg font-semibold mb-2">Review</h2>
            <p>{post.review?.text || "No review text"}</p>
          </div>
        )}

        {/* Comments */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          {post.comments?.length > 0 ? (
            post.comments.map((c) => (
              <div
                key={c._id}
                className="border-b py-3 flex flex-col gap-1 text-gray-700"
              >
                <p className="font-semibold">{c.author?.name || "Anonymous"}</p>
                <p>{c.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet</p>
          )}
        </div>

        {/* Go Back Button */}
        <div className="mt-8">
          <Button
            className="bg-black text-white hover:bg-gray-900 transition-colors"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </Card>
    </div>

  );
};

export default PostDetails;
