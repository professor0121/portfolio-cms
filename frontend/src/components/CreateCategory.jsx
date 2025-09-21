import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, fetchCategories } from "../redux/slices/categoriesSlice";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent: "",
  });

  useEffect(() => {
    // Fetch categories to populate parent dropdown
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Category Data:", formData);
    dispatch(createCategory(formData));
    setFormData({ name: "", description: "", parent: "" }); // reset form
  };

  if (loading) return <p className="p-4">Creating category...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <Card className="bg-transparent text-white p-6 space-y-4">
      <h2 className="text-xl font-semibold">Create Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter category name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Parent */}
        <div className="space-y-2">
          <Label htmlFor="parent">Parent</Label>
          <select
            id="parent"
            name="parent"
            value={formData.parent}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-transparent p-2 text-black"
          >
            <option value="">None</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full">
          Create
        </Button>
      </form>
    </Card>
  );
};

export default CreateCategory;
