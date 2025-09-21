import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "../redux/slices/postSlice";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const ShowAllPosts = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);
console.log("Posts:", posts);
  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-6">Error: {error}</div>;
  }

  if (!posts?.data || posts.data.length === 0) {
    return <div className="text-center py-6">No posts available</div>;
  }

  return (
    <Card className="p-6 mx-10 my-10">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {posts.data.map((post) => (
            <TableRow key={post._id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post?.category?.name || "-"}</TableCell>
              <TableCell>{post?.tags?.map(tag => tag.name).join(", ") || "-"}</TableCell>
              <TableCell>{post?.author?.email || "Unknown"}</TableCell>
              <TableCell>{post.publishStatus}</TableCell>
              <TableCell>
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage?.url}
                    alt={post.featuredImage?.alt}
                    className="h-12 w-12 rounded object-cover"
                  />
                ) : (
                  "-"
                )}  
              </TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log("Edit", post._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => console.log("Delete", post._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ShowAllPosts;
