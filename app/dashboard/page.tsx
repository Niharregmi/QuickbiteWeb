"use client";

import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="bg-card rounded-3xl shadow-[0_8px_30px_rgba(33,26,20,0.06)] p-10">
      <h1 className="text-3xl font-bold mb-2 text-foreground">Welcome to QuickBite!</h1>
      <p className="text-muted-foreground mb-6">
        {user ? `You are logged in as ${user.email}.` : "You are logged in successfully."}
      </p>
      <div className="flex gap-3">
        <Link
          href="/dashboard/profile"
          className="inline-flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold bg-gradient-to-br from-primary to-primary-dark text-primary-foreground shadow-sm hover:brightness-105"
        >
          Edit Profile
        </Link>
        <Link
          href="/dashboard/password"
          className="inline-flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold border border-border hover:bg-muted/60"
        >
          Change Password
        </Link>
      </div>
    </div>
  );
}
