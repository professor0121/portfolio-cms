import React, { useState } from "react";
import CreateTag from "../components/CreateTag";
import ShowTags from "../components/ShowTags";

const TagsPage = () => {
  const [editingTag, setEditingTag] = useState(null);

  return (
    <div className="p-4 space-y-6">
      <CreateTag
        editingTag={editingTag}
        onFinish={() => setEditingTag(null)}
      />
      <ShowTags onEdit={(tag) => setEditingTag(tag)} />
    </div>
  );
};

export default TagsPage;
