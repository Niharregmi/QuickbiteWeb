"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { updateProfileSchema, type UpdateProfileFormData } from "./schema";
import { updateProfile, type UserProfile } from "@/lib/api/auth";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Camera, User, KeyRound, ChevronRight } from "lucide-react";

export default function UpdateProfileForm({ user }: { user: UserProfile }) {
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(user.profilePicture);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: user.fullName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
    },
  });

  const watchedName = watch("fullName");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError("");
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setImageError("Only JPEG and PNG images are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image must be smaller than 5MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: UpdateProfileFormData) => {
    setServerError("");
    setSuccessMsg("");
    setIsLoading(true);
    try {
      // multipart/form-data so the optional image rides along with the text fields
      const formData = new FormData();
      formData.append("fullName", data.fullName || "");
      formData.append("email", data.email || "");
      formData.append("phoneNumber", data.phoneNumber || "");
      if (imageFile) {
        formData.append("profilePicture", imageFile); // must match multer's upload.single("profilePicture")
      }

      const result = await updateProfile(formData);
      setUser(result.data); // keep AuthContext in sync everywhere (e.g. dashboard header)
      setImageFile(null);
      setSuccessMsg("Profile updated successfully");
    } catch (error: unknown) {
      setServerError(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-3xl shadow-[0_8px_30px_rgba(33,26,20,0.06)] p-8 max-w-xl">
      <h1 className="text-xl font-bold text-foreground mb-6">Profile</h1>

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-muted overflow-hidden flex items-center justify-center border-4 border-card shadow-md">
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imagePreview} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <User size={36} className="text-muted-foreground" />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-dark text-primary-foreground flex items-center justify-center shadow-md hover:brightness-105"
              aria-label="Change photo"
            >
              <Camera size={15} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <p className="text-base font-semibold text-foreground mt-3">{watchedName || user.fullName}</p>
          {imageError && <p className="text-destructive text-xs mt-1">{imageError}</p>}
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name</label>
            <Input {...register("fullName")} placeholder="Jane Doe" />
            {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
            <Input type="email" {...register("email")} placeholder="you@example.com" />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Phone Number</label>
            <Input {...register("phoneNumber")} placeholder="98XXXXXXXX" />
            {errors.phoneNumber && <p className="text-destructive text-xs mt-1">{errors.phoneNumber.message}</p>}
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>

      {/* Account section, mirrors the Payment Methods / Order History rows in the app design */}
      <div className="mt-8">
        <h2 className="text-sm font-bold text-foreground mb-3">Account</h2>
        <Link
          href="/dashboard/password"
          className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3.5 hover:bg-muted/40 transition-colors"
        >
          <span className="flex items-center gap-3 text-sm font-medium text-foreground">
            <KeyRound size={18} className="text-primary-dark" />
            Change Password
          </span>
          <ChevronRight size={18} className="text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
