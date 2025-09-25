import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  likePost,
  unlikePost,
  fetchLikeCount,
  fetchLikes,
} from "../redux/slices/likeSlice"; // adjust path

import { Button } from "../components/ui/button";
import { Heart } from "lucide-react";

const LikeButton = ({ targetId, targetModel }) => {
  const dispatch = useDispatch();
  const { likeCount, likes, loading } = useSelector((state) => state.likes);

  // Check if current user already liked (backend must populate user in likes)
  const userLiked = likes.some((like) => like.user?._id); 

  useEffect(() => {
    if (targetId && targetModel) {
      dispatch(fetchLikes({ targetId, targetModel }));
      dispatch(fetchLikeCount({ targetId, targetModel }));
    }
  }, [dispatch, targetId, targetModel]);

  const handleLike = () => {
    if (userLiked) {
      dispatch(unlikePost({ targetId, targetModel }));
    } else {
      dispatch(likePost({ targetId, targetModel }));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleLike}
        disabled={loading}
        className={`flex items-center gap-2 rounded-full px-4 py-2 shadow-md transition ${
          userLiked ? "bg-red-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        <Heart
          className={`h-5 w-5 ${userLiked ? "fill-current" : "stroke-current"}`}
        />
        {userLiked ? "Unlike" : "Like"}
      </Button>

      <span className="text-sm font-medium text-gray-600">
        {likeCount} {likeCount === 1 ? "like" : "likes"}
      </span>
    </div>
  );
};

export default LikeButton;
