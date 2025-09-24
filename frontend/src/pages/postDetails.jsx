import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostById } from "../redux/slices/postSlice";
import PostGallery from "../components/PostGallery";
import PageHero from "../components/PageHero";
import { fetchComments } from "../redux/slices/commentSlice";
import { CardContent, CardHeader, CardTitle } from "../components/ui/card";
import CreateComment from "../components/CreateComment";
import CreateReview from "../components/CreateReview";
import { fetchReviews } from "../redux/slices/reviewSlice";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, loading, error } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comments);
  const { reviews } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
      dispatch(fetchComments({ type: 'post', typeId: id }));
      dispatch(fetchReviews({ type: 'post', typeId: id }));
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
        <Card>
          <CardHeader>
            <CardTitle>Add a Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateComment type="post" typeId={post._id} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent>
            {comments?.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment._id} className="p-3 border rounded-md">
                    <p className="font-medium">{comment.user?.name || "Anonymous"}</p>
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No comments yet.</p>
            )}
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateReview type="post" typeId={post._id} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {reviews?.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="p-3 border rounded-md space-y-1">
                    <p className="font-medium">{review.user?.name || "Anonymous"}</p>
                    <p className="text-sm text-muted-foreground">
                      Rating: {review.rating}⭐
                    </p>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No reviews yet.</p>
            )}
          </CardContent>
        </Card>


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
