"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Blog, PaginationMeta } from "@/lib/actions/blog-action";
import { deleteBlogAction } from "@/lib/actions/blog-action";

interface BlogTableProps {
  blogs: Blog[];
  pagination?: PaginationMeta;
  search?: string;
}

export default function BlogTable({
  blogs,
  pagination,
  search,
}: BlogTableProps) {
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
    params.set("size", String(pagination?.size || 10));
    if (searchTerm) params.set("search", searchTerm);
    router.push(`/admin/blogs?${params.toString()}`);
  };

  const makePaginationLink = (page: number) => {
    let link = `/admin/blogs?page=${page}&size=${pagination?.size || 10}`;
    if (searchTerm) {
      link += `&search=${encodeURIComponent(searchTerm)}`;
    }
    return link;
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setDeletingId(id);
    try {
      const res = await deleteBlogAction(id);
      if (res.success) {
        router.refresh();
      } else {
        alert(res.message || "Failed to delete blog");
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
          placeholder="Search blogs..."
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Search
        </button>
      </form>

      {/* Blog Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                Author
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                Published Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="border border-gray-300 px-4 py-8 text-center text-gray-500"
                >
                  No blogs found.
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-xs text-gray-500 max-w-[100px] truncate">
                    {blog._id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    {blog.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                    {blog.authorId?.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex gap-2 flex-wrap">
                      <Link href={`/admin/blogs/${blog._id}`}>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 text-sm hover:bg-blue-600 transition">
                          View
                        </button>
                      </Link>
                      <Link href={`/admin/blogs/${blog._id}/edit`}>
                        <button className="bg-green-500 text-white px-2 py-1 rounded mr-2 text-sm hover:bg-green-600 transition">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id, blog.title)}
                        disabled={deletingId === blog._id}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition disabled:opacity-50"
                      >
                        {deletingId === blog._id ? "Deleting..." : "Delete"}
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
          href={makePaginationLink((pagination?.page || 1) - 1)}
          className={
            (pagination?.page || 1) > 1
              ? ""
              : "pointer-events-none text-gray-400"
          }
        >
          Previous
        </Link>
        <span className="mx-2 text-sm">
          Page {pagination?.page || 1} of {pagination?.totalPages || 1}
        </span>
        <Link
          href={makePaginationLink((pagination?.page || 1) + 1)}
          className={
            (pagination?.page || 1) < (pagination?.totalPages || 1)
              ? ""
              : "pointer-events-none text-gray-400"
          }
        >
          Next
        </Link>
      </div>
    </div>
  );
}
