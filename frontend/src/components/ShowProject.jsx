import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../redux/slices/projectSlice";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge"; // optional for published status

const ShowProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <Card
            key={project._id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/projects/${project._id}`)}
          >
            {project.featuredImage?.url && (
              <img
                src={project.featuredImage.url}
                alt={project.featuredImage.alt || project.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
            )}

            <CardContent>
              <CardTitle className="text-lg font-semibold truncate">
                {project.title}
              </CardTitle>
              <p className="text-sm text-gray-600 line-clamp-3">
                {project.description}
              </p>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              <Badge variant={project.published === "published" ? "default" : "secondary"}>
                {project.published}
              </Badge>
              <span className="text-sm text-gray-500">{project.tags?.length} Tags</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShowProject;
