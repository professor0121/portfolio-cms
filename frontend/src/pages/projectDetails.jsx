import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchProjectById } from "../redux/slices/projectSlice";
import CreateComment from "../components/CreateComment";
// shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { fetchComments } from "../redux/slices/commentSlice";
import CreateReview from "../components/CreateReview";
import { fetchReviews } from "../redux/slices/reviewSlice";
import LikeButton from "../components/Like";
import Loader from "../components/Loader"
const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { project, loading, error } = useSelector((state) => state.project);
  const { comments } = useSelector((state) => state.comments);
  const { reviews } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (id) dispatch(fetchProjectById(id));
    dispatch(fetchComments({ type: 'project', typeId: id }));
    dispatch(fetchReviews({ type: 'project', typeId: id }));
  }, [dispatch, id]);

  if (loading) return <div className="text-center p-8"><Loader /></div>;

  if (error)
    return (
      <div className="text-red-500 text-center p-8">
        {typeof error === "string" ? error : error.message || JSON.stringify(error)}
      </div>
    );

  if (!project) return <div className="text-center p-8">Project not found.</div>;
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Project Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{project.title}</CardTitle>
          <p className="text-muted-foreground">{project.description}</p>
        </CardHeader>
        <CardContent>
          <img
            src={
              project.featuredImage?.url ||
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            }
            alt={project.featuredImage?.alt || "Project featured"}
            className="w-full h-72 object-cover rounded-lg shadow"
          />
        </CardContent>
      </Card>

            <LikeButton targetId={project._id} targetModel="Project" />
      {/* Meta Info */}
      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Author */}
          {project.author && (
            <div className="flex flex-col">
              <p className="font-medium">{project.author.name}</p>
              <p className="text-sm text-muted-foreground">{project.author.email}</p>
            </div>
          )}

          {/* Category & Tags */}
          <div className="flex flex-wrap gap-2">
            {project.category && <Badge>{project.category.name}</Badge>}
            {project.tags?.map((tag) => (
              <Badge key={tag._id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.githubLink && (
              <Button variant="outline" asChild>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  GitHub Repo
                </a>
              </Button>
            )}
            {project.liveDemoLink && (
              <Button asChild>
                <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gallery */}
      {project.gallery?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={img.alt || `Gallery ${idx + 1}`}
                  className="rounded-md shadow hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Add a Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateComment type="project" typeId={project._id} />
        </CardContent>
      </Card>

      {/* Comments */}
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

      {/* Reviews */}
      <CreateReview type="project" typeId={project._id} />
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {reviews?.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review._id} className="p-3 border rounded-md">
                  <p className="font-medium">{review.user?.name || "User"}</p>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                  <p className="text-yellow-500">⭐ {review.rating}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No reviews available.</p>
          )}
        </CardContent>
      </Card>

      {/* Back Button */}
      <div className="flex justify-center">
        <Button asChild variant="secondary">
          <Link to="/projects">← Back to Projects</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetails;
