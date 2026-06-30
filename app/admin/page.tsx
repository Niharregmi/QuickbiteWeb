import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/blogs"
          className="flex items-center gap-4 p-5 border border-gray-200 rounded-xl hover:border-black hover:shadow-sm transition"
        >
          <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="font-semibold text-lg">Blogs</p>
            <p className="text-sm text-gray-500">Manage all blog posts</p>
          </div>
        </Link>
        <Link
          href="/admin/users"
          className="flex items-center gap-4 p-5 border border-gray-200 rounded-xl hover:border-black hover:shadow-sm transition"
        >
          <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <p className="font-semibold text-lg">Users</p>
            <p className="text-sm text-gray-500">Manage all users</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
