"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import UpdateProfileForm from "./_components/UpdateProfileForm";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!user) {
    return <p className="text-red-500">Failed to load user details.</p>;
  }

  return <UpdateProfileForm user={user} />;
}
