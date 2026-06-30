"use client";

import GlobalNav from "@/app/components/navigation/GlobalNav";

export default function MyOrders() {
  return (
    <div className="min-h-screen bg-gray-50">

      <GlobalNav />

      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">My Orders</h1>

        <div className="bg-white p-4 rounded-2xl shadow">
          Order #12345 - Preparing
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          Order #12344 - Delivered
        </div>

      </div>
    </div>
  );
}
