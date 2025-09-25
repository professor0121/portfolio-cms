import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllContacts,
  updateContactStatus,
  deleteContact,
  resetContactState,
} from "../redux/slices/contactSlice";

// shadcn/ui components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../components/ui/alert-dialog";
import Loader from "../components/Loader";

const ContactAdmin = () => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(getAllContacts());
    return () => dispatch(resetContactState());
  }, [dispatch]);

  const handleStatusUpdate = (id, newStatus) => {
    dispatch(updateContactStatus({ id, status: newStatus }));
  };

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  if (loading) return <Loader />;

  if (error) return <p className="text-red-500">{error}</p>;
  console.log(contacts.data);
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Contact Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.data?.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.subject || "-"}</TableCell>
                  <TableCell>{contact.message}</TableCell>
                  <TableCell>
                    <Badge
                      variant={contact.status === "read" ? "secondary" : "default"}
                    >
                      {contact.status || "pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleStatusUpdate(
                          contact._id,
                          contact.status === "read" ? "pending" : "read"
                        )
                      }
                    >
                      {contact.status === "read" ? "Mark Pending" : "Mark Read"}
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Contact?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this contact? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(contact._id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactAdmin;
