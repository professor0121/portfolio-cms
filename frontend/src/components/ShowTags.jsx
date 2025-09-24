import React, { useEffect} from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, deleteTag } from "../redux/slices/tagSlice";

const Tags = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { tags, loading, error } = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      dispatch(deleteTag(id));
    }
  };

  if (loading) return <p className="p-4">Loading tags...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
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
                onClick={() => onEdit(tag)}
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
  );
};

export default Tags;
