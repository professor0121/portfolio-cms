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
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, updateTag, deleteTag } from "../redux/slices/tagSlice";

const Tags = () => {
  const dispatch = useDispatch();
  const { tags, loading, error } = useSelector((state) => state.tags);

  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handleEdit = (id, name) => {
    setEditingId(id);
    setNewName(name);
  };

  const handleUpdate = (id) => {
    dispatch(updateTag({ id, tagData: { name: newName } }));
    setEditingId(null);
    setNewName("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      dispatch(deleteTag(id));
    }
  };

  if (loading) return <p className="p-4">Loading tags...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  console.log(tags);
  return (
    <div className="p-4">
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
              <TableCell>
                {editingId === tag.id ? (
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full"
                  />
                ) : (
                  tag.name
                )}
              </TableCell>
              <TableCell>{tag.slug}</TableCell>
              <TableCell>{tag.createdBy}</TableCell>
              <TableCell className="flex gap-2">
                {editingId === tag.id ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdate(tag.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleEdit(tag.id, tag.name)}
                  >
                    Edit
                  </Button>
                )}
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
