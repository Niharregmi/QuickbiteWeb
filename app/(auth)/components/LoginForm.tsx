"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Logo } from "@/app/components/ui/logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "./schema";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginUser } from "@/lib/api/auth";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { checkAuth } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError("");
    try {
      const response = await loginUser({ email: data.email, password: data.password });
      Cookies.set("token", response.token, { expires: 7 });
      await checkAuth();
      router.push("/dashboard");
    } catch (error: unknown) {
      setServerError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-3xl bg-card p-8 shadow-[0_8px_30px_rgba(33,26,20,0.08)]">
      <div className="flex justify-center mb-6">
        <Logo size="sm" />
      </div>

      <h1 className="text-2xl font-bold text-center text-foreground">Sign in</h1>
      <p className="text-sm text-center text-muted-foreground mt-1 mb-6">Welcome back!</p>

      {serverError && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-xl text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Email Address
          </label>
          <Input type="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-muted-foreground">Password</label>
            <Link href="#" className="text-xs font-semibold text-primary-dark hover:underline">
              Forgot password?
            </Link>
          </div>
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

        <Button type="submit" disabled={isLoading} className="w-full mt-2">
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button variant="secondary" type="button" disabled className="w-full" title="Coming soon">
        Continue with Google
      </Button>

      <p className="text-sm text-center mt-6 text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link className="font-semibold text-primary-dark hover:underline" href="/signup">
          Create account
        </Link>
      </p>
    </div>
  );
}
