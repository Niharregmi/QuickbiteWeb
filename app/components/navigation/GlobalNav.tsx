"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalNav() {
  const path = usePathname();

  const item = (href: string, label: string) => (
    <Link
      href={href}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
        path === href
          ? "bg-black text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex gap-2 p-4 bg-white border-b">
      {item("/dashboard", "Dashboard")}
      {item("/my-orders", "My Orders")}
      {item("/settings", "Settings")}
      {item("/restaurants", "Restaurants")}
    </div>
  );
}
