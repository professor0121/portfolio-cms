import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { fetchProjectById } from '../redux/slices/projectSlice';

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { project, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    if (id) dispatch(fetchProjectById(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading project...</div>;

  if (error)
    return (
      <div className="text-red-500">
        {typeof error === 'string' ? error : error.message || JSON.stringify(error)}
      </div>
    );

  if (!project) return <div>Project not found.</div>;

  return (
    <div>
      <PageHero
        heading={project.title || 'Project'}
        subheading={project.description || 'No description available.'}
        image={project.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'}
        cta={{ text: 'Back to Projects', link: '/projects' }}
      />

      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Project Details</h2>
        <p>{project.details || 'No additional details available.'}</p>
        {/* You can add more project fields here, e.g., tech stack, links, screenshots */}
      </div>
    </div>
  );
};

export default ProjectDetails;
