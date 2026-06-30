"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User, PaginationMeta } from "@/lib/actions/user-action";
import { deleteUserAction } from "@/lib/actions/user-action";

interface UserTableProps {
  users: User[];
  meta?: PaginationMeta;
  search?: string;
}

export default function UserTable({ users, meta, search }: UserTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("limit", String(meta?.limit || 10));
    if (searchTerm) params.set("search", searchTerm);
    router.push(`/admin/users?${params.toString()}`);
  };

  const makePaginationLink = (page: number) => {
    let link = `/admin/users?page=${page}&limit=${meta?.limit || 10}`;
    if (searchTerm) {
      link += `&search=${encodeURIComponent(searchTerm)}`;
    }
    return link;
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      const res = await deleteUserAction(deletingId);
      if (res.success) {
        router.refresh();
      } else {
        alert(res.message || "Failed to delete user");
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or email..."
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Search
        </button>
      </form>

      {/* User Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Created Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-[100px] truncate">
                    {user._id}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{user.fullName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/users/${user._id}`}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition">
                          View
                        </button>
                      </Link>
                      <Link href={`/admin/users/${user._id}/edit`}>
                        <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center gap-3">
        <Link
          href={makePaginationLink((meta?.page || 1) - 1)}
          className={
            (meta?.page || 1) > 1 ? "text-blue-600 hover:underline" : "pointer-events-none text-gray-400"
          }
        >
          Previous
        </Link>
        <span className="mx-2 text-sm text-gray-600">
          Page {meta?.page || 1} of {meta?.totalPages || 1}
        </span>
        <Link
          href={makePaginationLink((meta?.page || 1) + 1)}
          className={
            (meta?.page || 1) < (meta?.totalPages || 1)
              ? "text-blue-600 hover:underline"
              : "pointer-events-none text-gray-400"
          }
        >
          Next
        </Link>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
