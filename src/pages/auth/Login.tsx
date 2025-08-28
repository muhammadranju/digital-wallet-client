/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { Eye, EyeOff, Lock, Mail, Wallet } from "lucide-react";
import { toast } from "sonner";
import HelmetTitle from "@/components/layout/HelmetTitle";

import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Proceed only if both email and password are filled
    if (!email || !password) return; // Return early if validation fails

    try {
      const result = await login({ email, password }).unwrap();

      // Dispatch credentials to Redux store
      dispatch(
        setCredentials({ user: result.data.user, token: result.data.token })
      );

      const userData = {
        id: result?.data?.id,
        email: result?.data.email,
        name: result?.data.name,
        contact: result?.data.contact,
        location: result?.data.location,
        role: result?.data.role,
        token: result?.data.token,
      };
      // Store in localStorage for persistence
      Cookies.set("token", userData.token);
      Cookies.set("isAuthenticated", "true");

      localStorage.setItem("token", result?.data.token);
      localStorage.setItem("userRole", result?.data.role);
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");

      // Redirect based on role
      switch (result.data.role) {
        case "USER":
          navigate("/dashboard/user");
          toast.success(`Welcome Back! ${result.data.name}`);
          break;
        case "AGENT":
          navigate("/dashboard/agent");
          toast.success(`Welcome Back! ${result.data.name}`);
          break;
        case "ADMIN":
          navigate("/dashboard/admin");
          toast.success(`Welcome Back! ${result.data.name}`);
          break;
        default:
          navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      console.error("Login failed:", error?.data?.message || error.message);
      toast.error(error?.data?.message || "Login failed");
    }
  };

  const demoCredentials = [
    { role: "user", email: "user@gmail.com", password: "demo1234" },
    { role: "agent", email: "agent@gmail.com", password: "demo1234" },
    { role: "admin", email: "admin@gmail.com", password: "demo1234" },
  ];

  const fillDemoCredentials = (demoRole: string) => {
    const creds = demoCredentials.find((c) => c.role === demoRole);
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.password);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("isAuthenticated") === "true" ||
      Cookies.get("isAuthenticated") === "true"
    ) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <HelmetTitle title="Login" />
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Brand */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4">
            <Wallet className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">PayWallet</h1>
          <p className="text-muted-foreground">Financial Dashboard System</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email || !password} // Button disabled if email or password is empty
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="text-center text-sm">
              <Link
                to="/auth/forgot-password"
                className="text-primary hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Demo Credentials */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Demo Credentials</CardTitle>
            <CardDescription className="text-xs">
              Click to auto-fill login credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoCredentials.map((cred) => (
              <Button
                key={cred.role}
                variant="outline"
                size="sm"
                className="w-full justify-between bg-transparent"
                onClick={() => fillDemoCredentials(cred.role)}
              >
                <span className="capitalize">{cred.role} Demo</span>
                <Badge variant="secondary" className="text-xs">
                  {cred.email}
                </Badge>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
