"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { changePasswordSchema, type ChangePasswordFormData } from "./schema";
import { updateProfile } from "@/lib/api/auth";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setServerError("");
    setSuccessMsg("");
    setIsLoading(true);
    try {
      // Same /api/v1/auth/update endpoint and updateProfile() action as the profile form -
      // the backend only hashes + saves a new password when one is actually sent.
      const formData = new FormData();
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);

      await updateProfile(formData);
      setSuccessMsg("Password updated successfully");
      reset();
    } catch (error: unknown) {
      setServerError(error instanceof Error ? error.message : "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-3xl shadow-[0_8px_30px_rgba(33,26,20,0.06)] p-8 max-w-md">
      <Link
        href="/dashboard/profile"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft size={14} />
        Back to Profile
      </Link>

      <h1 className="text-xl font-bold text-foreground mb-1">Change Password</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Choose a new password for your account.
      </p>

      {serverError && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-xl text-sm">
          {serverError}
        </div>
      )}
      {successMsg && (
        <div className="mb-4 p-3 bg-primary/10 border border-primary/30 text-primary-dark rounded-xl text-sm">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">New Password</label>
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
          {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Confirm Password</label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
