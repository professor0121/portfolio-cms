import React, { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useDispatch } from "react-redux";
import { createTag, updateTag } from "../redux/slices/tagSlice";

const CreateTag = ({ editingTag, onFinish }) => {
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (editingTag) {
      setEditingId(editingTag.id);
      setTagName(editingTag.name);
    }
  }, [editingTag]);

  const handleCreateOrUpdate = () => {
    if (!tagName.trim()) return;

    if (editingId) {
      dispatch(updateTag({ id: editingId, tagData: { name: tagName } }));
    } else {
      dispatch(createTag({ name: tagName }));
    }

    setEditingId(null);
    setTagName("");
    onFinish && onFinish(); // callback to parent to reset editing state
  };

  return (
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
  );
};

export default CreateTag;
