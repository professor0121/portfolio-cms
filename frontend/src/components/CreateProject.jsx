import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "../redux/slices/projectSlice";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import { fetchTags } from "../redux/slices/tagSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"; // adjust path
import { Input } from "../components/ui/input"; // adjust path
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

const CreateProject = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { tags } = useSelector((state) => state.tags);
  const { loading, error, successMessage } = useSelector(
    (state) => state.project
  );

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    category: "",
    selectedTags: [],
    featuredImage: { url: "", alt: "" }, // updated to object
    gallery: [{ url: "", alt: "" }, { url: "", alt: "" }], // array of objects
    githubLink: "",
    liveDemoLink: "",
    published: "draft",
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTags());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  // Featured image handler
  const handleFeaturedImageChange = (e) => {
    const value = e.target.value;
    setProjectData((prev) => ({
      ...prev,
      featuredImage: { ...prev.featuredImage, url: value },
    }));
  };

  // Gallery handler
  const handleGalleryChange = (e, index) => {
    const value = e.target.value;
    setProjectData((prev) => {
      const updatedGallery = [...prev.gallery];
      updatedGallery[index] = { ...updatedGallery[index], url: value };
      return { ...prev, gallery: updatedGallery };
    });
  };

  const handleTagSelect = (tagId) => {
    setProjectData((prev) => {
      const selectedTags = prev.selectedTags.includes(tagId)
        ? prev.selectedTags.filter((id) => id !== tagId)
        : [...prev.selectedTags, tagId];
      return { ...prev, selectedTags };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Remove gallery items with empty URLs
    const cleanedGallery = projectData.gallery.filter((img) => img.url);

    const payload = {
      ...projectData,
      gallery: cleanedGallery,
    };

    dispatch(createProject(payload));
  };

  const getErrorMessage = (err) => {
    if (!err) return "";
    if (typeof err === "string") return err;
    if (err.message) return err.message;
    return JSON.stringify(err);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white text-[#000] rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Project</h2>

      {error && <p className="text-red-500 mb-2">{getErrorMessage(error)}</p>}
      {successMessage && (
        <p className="text-green-500 mb-2">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Project Title"
          value={projectData.title}
          onChange={handleChange}
          required
        />

        <Textarea
          name="description"
          placeholder="Project Description"
          value={projectData.description}
          onChange={handleChange}
          required
        />

        <Select
          onValueChange={(value) =>
            setProjectData((prev) => ({ ...prev, category: value }))
          }
          value={projectData.category}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <button
              type="button"
              key={tag._id}
              className={`px-3 py-1 rounded-full border ${
                projectData.selectedTags.includes(tag._id)
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleTagSelect(tag._id)}
            >
              {tag.name}
            </button>
          ))}
        </div>

        <Input
          type="url"
          name="githubLink"
          placeholder="GitHub Repository Link"
          value={projectData.githubLink}
          onChange={handleChange}
        />

        <Input
          type="url"
          name="liveDemoLink"
          placeholder="Live Demo Link"
          value={projectData.liveDemoLink}
          onChange={handleChange}
        />

        {/* Featured Image */}
        <div>
          <label className="block mb-1">Featured Image URL</label>
          <Input
            type="url"
            name="featuredImage"
            value={projectData.featuredImage.url}
            onChange={handleFeaturedImageChange}
          />
          {projectData.featuredImage.url && (
            <img
              src={projectData.featuredImage.url}
              alt="Featured Preview"
              className="w-32 h-32 object-cover mt-2 rounded"
            />
          )}
        </div>

        {/* Gallery */}
        <div className="space-y-2">
          <label className="block mb-1">Gallery Image URLs</label>
          {projectData.gallery.map((img, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                type="url"
                placeholder={`Gallery URL ${index + 1}`}
                value={img.url}
                onChange={(e) => handleGalleryChange(e, index)}
              />
              {img.url && (
                <img
                  src={img.url}
                  alt={`Gallery ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>

        {/* Publish status */}
        <Select
          onValueChange={(value) =>
            setProjectData((prev) => ({ ...prev, published: value }))
          }
          value={projectData.published}
        >
          <SelectTrigger>
            <SelectValue placeholder="Publish Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" className="w-full mt-4">
          {loading ? "Creating..." : "Create Project"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProject;
