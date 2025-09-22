import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../redux/slices/projectSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"; // adjust path based on your setup
import { Button } from "./ui/button";

const ShowProjects = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
 console.log(projects);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Projects</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>GitHub</TableHead>
            <TableHead>Live Demo</TableHead>
            <TableHead>Featured Image</TableHead>
            <TableHead>Gallery</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project) => (
            <TableRow key={project._id}>
              <TableCell>{project.title}</TableCell>
              <TableCell className="max-w-xs truncate">{project.description}</TableCell>
              <TableCell>{project.category?.name || "N/A"}</TableCell>
              <TableCell>
                {project.tags?.map((tag) => (
                  <span
                    key={tag._id}
                    className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded mr-1 mb-1 text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </TableCell>
              <TableCell>{project.published}</TableCell>
              <TableCell>
                {project.githubLink ? (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    GitHub
                  </a>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                {project.liveDemoLink ? (
                  <a
                    href={project.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Live Demo
                  </a>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                {project.featuredImage?.url && (
                  <img
                    src={project.featuredImage.url}
                    alt={project.featuredImage.alt || project.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {project.gallery?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={img.alt || `Gallery ${idx + 1}`}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShowProjects;
