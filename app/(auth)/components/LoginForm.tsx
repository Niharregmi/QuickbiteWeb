"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "./schema";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginUser } from "@/lib/api/auth";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError("");
    try {
      const response = await loginUser({ email: data.email, password: data.password });
      Cookies.set("token", response.token, { expires: 7 });
      router.push("/dashboard");
    } catch (error: unknown) {
      setServerError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg grid md:grid-cols-2">
      <div className="relative hidden md:flex md:flex-col md:justify-end bg-yellow-400 p-8">
        <h2 className="text-2xl font-bold text-white">QuickBite</h2>
        <p className="text-sm text-white opacity-90">Food delivery made easier</p>
      </div>
      <div className="p-10 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-2">Sign In</h1>
        <p className="text-muted-foreground mb-6">Welcome back! Please sign in.</p>
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {serverError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input type="email" placeholder="Email address" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Input type="password" placeholder="Password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <p className="text-sm text-center mt-6">
          Do not have an account?{" "}
          <Link className="font-semibold text-yellow-600" href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
