import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginUser({ email, password }));
  };

  // Redirect if admin is logged in
  useEffect(() => {
    if (user && user.role === "admin") {
      localStorage.setItem("adminToken", user.token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("name",user.name);
      localStorage.setItem("email",user.email);
      localStorage.setItem("admin_refresh_token",user.refreshToken)
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Admin Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-600 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* Button */}
            <CardFooter className="px-0">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="animate-pulse">Logging in...</span>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
