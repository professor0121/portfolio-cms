import React, { useEffect } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "../components/ui/table";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories } from "../redux/slices/categoriesSlice";

const ShowCategories = () => {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDelete = (category) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            dispatch(deleteCategory(category._id));
        }
    };

    if (loading) return <p className="p-4">Loading categories...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <Card className="bg-transparent text-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Parent</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category._id}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.slug}</TableCell>
                            <TableCell>
                                {category.parent
                                    ? category.parent.name || category.parent._id
                                    : "None"}
                            </TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleDelete(category)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </Card>
    );
};

export default ShowCategories;
