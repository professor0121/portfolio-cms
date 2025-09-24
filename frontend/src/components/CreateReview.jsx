import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../redux/slices/reviewSlice";

// shadcn/ui components
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const CreateReview = ({ type, typeId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    dispatch(
      createReview({
        type,
        typeId,
        rating,
        comment,
      })
    );

    setRating(5);
    setComment("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Rating */}
          <div className="flex flex-col gap-1">
            <Label>Rating</Label>
            <Select value={rating} onValueChange={(value) => setRating(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}⭐
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Comment */}
          <div className="flex flex-col gap-1">
            <Label>Comment</Label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              rows={3}
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="self-start">
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateReview;
