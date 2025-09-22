import React, { useEffect } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import { fetchTags } from "../redux/slices/tagSlice";

const PostSidebar = ({ className }) => {
  const dispatch = useDispatch();
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );
  const { tags, loading: tagsLoading } = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <Card className={`p-6 ${className}`}>
      {/* Search */}
      <div className="mb-6">
        <Input placeholder="Search posts..." className="w-full" />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <Label className="font-bold mb-2 block">Categories</Label>
        {categoriesLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : categories.length > 0 ? (
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <div key={cat._id} className="flex items-center gap-2">
                <Checkbox id={cat._id} />
                <Label htmlFor={cat._id}>{cat.name}</Label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No categories found</p>
        )}
      </div>

      {/* Tags */}
      <div>
        <Label className="font-bold mb-2 block">Tags</Label>
        {tagsLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag._id} className="flex items-center gap-2">
                <Checkbox id={tag._id} />
                <Label htmlFor={tag._id}>{tag.name}</Label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tags found</p>
        )}
      </div>
    </Card>
  );
};

export default PostSidebar;
