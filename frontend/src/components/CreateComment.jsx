import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../redux/slices/commentSlice";

const CreateComment = ({ type, typeId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return; // prevent empty comments

    // Dispatch the thunk with type, typeId, and content
    dispatch(
      createComment({
        content,
        type,    // post/project/course/note
        typeId,  // the specific id
        parent: null, // top-level comment
      })
    );

    setContent(""); // clear input
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        className="border rounded p-2"
        rows={3}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateComment;
