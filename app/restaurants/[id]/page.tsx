"use client";

import GlobalNav from "@/app/components/navigation/GlobalNav";
import Link from "next/link";

export default function RestaurantDetails() {
  return (
    <div className="min-h-screen bg-gray-50">

      <GlobalNav />

      <div className="p-6 space-y-4">

        <h1 className="text-2xl font-bold">Restaurant Details</h1>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold">Menu</h2>

          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span>Item 1</span>
              <span>$5</span>
            </div>

            <div className="flex justify-between">
              <span>Item 2</span>
              <span>$7</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="block mt-4 bg-black text-white text-center py-2 rounded-xl"
          >
            Go to Checkout
          </Link>
        </div>

      </div>
    </div>
  );
}
