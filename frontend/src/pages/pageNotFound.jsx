import React from "react";
import { useNavigate } from "react-router-dom";

// shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-5xl font-bold text-red-600">404</CardTitle>
          <CardDescription className="text-lg text-gray-700 mt-2">
            Oops! The page you are looking for does not exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <Button variant="default" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageNotFound;
