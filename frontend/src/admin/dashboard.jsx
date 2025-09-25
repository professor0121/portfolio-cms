import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServerInfo } from "../redux/slices/serverSlice";

// shadcn/ui components
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table";

const ServerInfo = () => {
  const dispatch = useDispatch();
  const { serverInfo, loading, error } = useSelector((state) => state.server);

  useEffect(() => {
    dispatch(fetchServerInfo());
  }, [dispatch]);

  if (loading) return <p className="p-4">Loading server info...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <Card className="max-w-4xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Server Information</CardTitle>
      </CardHeader>
      <CardContent>
        {serverInfo ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(serverInfo).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">{key}</TableCell>
                  <TableCell>{typeof value === "object" ? JSON.stringify(value, null, 2) : value.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No server information available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ServerInfo;
