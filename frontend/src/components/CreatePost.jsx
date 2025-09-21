import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { useToast } from '../hooks/use-toast';
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/slices/postSlice";
import { Card } from "../components/ui/card";

const CreatePost = ({ categories = [], tags = [] }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { loading, error } = useSelector((state) => state.post); 

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        tags: [],
        publishStatus: "draft",
        featuredImage: "", // URL string
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagChange = (tagId) => {
        setFormData((prev) => {
            const exists = prev.tags.includes(tagId);
            return {
                ...prev,
                tags: exists ? prev.tags.filter((t) => t !== tagId) : [...prev.tags, tagId],
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // send as JSON
        const postData = {
            ...formData
        };

        const resultAction = await dispatch(createPost(postData));

        if (createPost.fulfilled.match(resultAction)) {
            toast({ title: "Success", description: "Post created successfully" });
            setFormData({ title: "", content: "", category: "", tags: [], publishStatus: "draft", featuredImage: "" });
        } else {
            toast({ title: "Error", description: resultAction.payload || "Failed to create post", variant: "destructive" });
        }
    };

    return (
        <Card className="bg-gray-800 text-white p-6 mx-10 my-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                {/* Content */}
                <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" name="content" value={formData.content} onChange={handleChange} required rows={6} />
                </div>

                {/* Category */}
                <div>
                    <Label>Category</Label>
                    <Select value={formData.category} onValueChange={(val) => setFormData((prev) => ({ ...prev, category: val }))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Tags */}
                <div>
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                            <div key={tag._id} className="flex items-center gap-2">
                                <Checkbox
                                    id={tag._id}
                                    checked={formData.tags.includes(tag._id)}
                                    onCheckedChange={() => handleTagChange(tag._id)}
                                />
                                <Label htmlFor={tag._id}>{tag.name}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Publish Status */}
                <div>
                    <Label>Publish Status</Label>
                    <Select
                        value={formData.publishStatus}
                        onValueChange={(val) => setFormData((prev) => ({ ...prev, publishStatus: val }))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Featured Image URL */}
                <div>
                    <Label>Featured Image URL</Label>
                    <Input
                        type="text"
                        placeholder="Enter image URL"
                        name="featuredImage"
                        value={formData.featuredImage}
                        onChange={handleChange}
                    />
                    {formData.featuredImage && (
                        <img
                            src={formData.featuredImage}
                            alt="Preview"
                            className="mt-2 w-48 h-48 object-cover rounded-md"
                        />
                    )}
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                    {loading ? "Creating..." : "Create Post"}
                </Button>

                {/* Error */}
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </Card>
    );
};

export default CreatePost;
