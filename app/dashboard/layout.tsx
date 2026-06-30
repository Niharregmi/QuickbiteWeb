"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Logo } from "@/app/components/ui/logo";
import { LogOut, User, Lock } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();

  const navItem = (href: string, label: string, icon: React.ReactNode) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
          active
            ? "bg-black text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {icon}
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <Logo size="sm" />
          </Link>

          <div className="flex items-center gap-3">
            {!loading && user && (
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-bold">
                      {user.fullName?.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium">
                  {user.fullName}
                </span>
              </div>
            )}

            <button
              onClick={logout}
              className="text-red-500 flex items-center gap-1 text-sm font-semibold"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="max-w-5xl mx-auto px-6 py-4 flex gap-2">
        {navItem("/dashboard", "Overview", <User size={16} />)}
        {navItem("/dashboard/profile", "Profile", <User size={16} />)}
        {navItem("/dashboard/password", "Password", <Lock size={16} />)}
      </nav>

      <main className="max-w-5xl mx-auto px-6 pb-10">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {children}
        </div>
      </main>

    </div>
  );
}
