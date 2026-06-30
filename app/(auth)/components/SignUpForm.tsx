"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Logo } from "@/app/components/ui/logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "./schema";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/auth";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="w-full max-w-sm rounded-3xl bg-card p-8 shadow-[0_8px_30px_rgba(33,26,20,0.08)]">
      <div className="flex justify-center mb-6">
        <Logo size="sm" />
      </div>

      <h1 className="text-2xl font-bold text-center text-foreground">Create account</h1>
      <p className="text-sm text-center text-muted-foreground mt-1 mb-6">Sign up to continue</p>

      {serverError && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-xl text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name</label>
          <Input placeholder="Jane Doe" {...register("fullName")} />
          {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email Address</label>
          <Input type="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Confirm Password</label>
          <Input type="password" placeholder="••••••••" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-destructive text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full mt-2">
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>

      <p className="text-sm text-center mt-6 text-muted-foreground">
        Already have an account?{" "}
        <Link className="font-semibold text-primary-dark hover:underline" href="/login">
          Sign In
        </Link>
      </p>
    </div>
  );
}
