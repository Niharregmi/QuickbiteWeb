"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "./schema";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/auth";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setServerError("");
    try {
      await registerUser({ fullName: data.fullName, email: data.email, password: data.password });
      router.push("/login");
    } catch (error: unknown) {
      setServerError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
      <h1 className="text-3xl font-bold mb-2">Create Account</h1>
      <p className="text-muted-foreground mb-6">Sign up to continue</p>
      {serverError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {serverError}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input placeholder="Full Name" {...register("fullName")} />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <Input type="email" placeholder="Email Address" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Input type="password" placeholder="Password" {...register("password")} />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>
        <Button type="submit" disabled={isLoading} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
      <p className="text-sm text-center mt-6">
        Already have an account?{" "}
        <Link className="font-semibold text-yellow-600" href="/login">Sign In</Link>
      </p>
    </div>
  );
}
