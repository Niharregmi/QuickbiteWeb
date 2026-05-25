"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "./schema";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      console.log("Login data:", data);
      // TODO: Add your login API call here
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg grid md:grid-cols-2">
      
      {/* LEFT IMAGE SECTION */}
      <div className="relative hidden md:block">
        <img
          src="https://thf.bing.com/th/id/OIP.i8pYJ1HS4L4IApvof7OR6gHaHa?w=121&h=180&c=7&r=0&o=7&cb=thfc1falcon&dpr=1.3&pid=1.7&rm=3"
          alt="food"
          className="h-full w-full object-cover"
        />

        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-2xl font-bold">QuickBite</h2>
          <p className="text-sm opacity-90">
            Food delivery made easier
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="p-10 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-2">Sign In</h1>

        <p className="text-muted-foreground mb-6">
          Welcome back! Please sign in.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email address"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" {...register("remember")} />
              <label htmlFor="remember">
                Remember me
              </label>
            </div>

            <button type="button" className="text-yellow-600 hover:underline">
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link className="font-semibold text-yellow" href="/signup">
                    Signup
                </Link>
        </p>
      </div>
    </div>
  );
}