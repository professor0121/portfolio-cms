import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, createTag, updateTag, deleteTag } from "../redux/slices/tagSlice";

const Tags = () => {
  const dispatch = useDispatch();
  const { tags, loading, error } = useSelector((state) => state.tags);

  const [editingId, setEditingId] = useState(null);
  const [tagName, setTagName] = useState("");

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handleCreateOrUpdate = () => {
    if (!tagName.trim()) return;

    if (editingId) {
      dispatch(updateTag({ id: editingId, tagData: { name: tagName } }));
    } else {
      dispatch(createTag({ name: tagName }));
    }

    setEditingId(null);
    setTagName("");
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setTagName(name);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      dispatch(deleteTag(id));
    }
  };

  if (loading) return <p className="p-4">Loading tags...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  return (
    <div className="p-4 space-y-6">
      {/* Card for Create/Update */}
      <Card className="p-6 shadow-md bg-transparent text-white">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Update Tag" : "Create Tag"}
        </h2>
        <div className="flex gap-2">
          <Input
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="Enter tag name"
            className="w-full"
          />
          <Button onClick={handleCreateOrUpdate}>
            {editingId ? "Update" : "Create"}
          </Button>
          {editingId && (
            <Button
              variant="outline"
              onClick={() => {
                setEditingId(null);
                setTagName("");
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </Card>

      {/* Tags Table */}
      <Table>
        <TableHeader>
          <TableRow className="text-white">
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.slug}>
              <TableCell>{tag.id}</TableCell>
              <TableCell>{tag.name}</TableCell>
              <TableCell>{tag.slug}</TableCell>
              <TableCell>{tag.createdBy}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleEdit(tag.id, tag.name)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(tag.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tags;
