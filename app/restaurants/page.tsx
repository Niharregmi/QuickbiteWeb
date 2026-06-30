"use client";

import Link from "next/link";
import GlobalNav from "@/app/components/navigation/GlobalNav";

const restaurants = [
  { id: "1", name: "Burger House", rating: 4.5 },
  { id: "2", name: "Pizza Hub", rating: 4.2 },
  { id: "3", name: "Momo Palace", rating: 4.7 }
];

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      <GlobalNav />

      <div className="p-6 grid gap-4">
        <h1 className="text-2xl font-bold">Restaurants</h1>

        {restaurants.map((r) => (
          <Link
            key={r.id}
            href={`/restaurants/${r.id}`}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
          >
            <h2 className="font-bold text-lg">{r.name}</h2>
            <p className="text-sm text-gray-500">Rating: {r.rating}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
