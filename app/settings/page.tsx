"use client";

import GlobalNav from "@/app/components/navigation/GlobalNav";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50">

      <GlobalNav />

      <div className="p-6 space-y-4">

        <h1 className="text-2xl font-bold">Settings</h1>

        <div className="bg-white p-4 rounded-2xl shadow">
          Profile settings (uses backend profile API)
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          Theme settings (UI only)
        </div>

      </div>
    </div>
  );
}
