"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
    <main className="min-h-screen bg-[#f7f3ed] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to QuickBite!</h1>
        <p className="text-gray-500 mb-6">You are logged in successfully.</p>
        <button onClick={handleLogout} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg">
          Logout
        </button>
      </div>
    </main>
  );
}
