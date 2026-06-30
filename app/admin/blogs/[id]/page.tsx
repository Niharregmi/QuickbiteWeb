import { fetchBlogByIdAction } from "@/lib/actions/blog-action";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogResponse = await fetchBlogByIdAction(id);

  if (!blogResponse.success) {
    throw new Error(blogResponse.message || "Failed to fetch blog");
  }
  if (!blogResponse.data) {
    throw new Error("No blog data available");
  }

  const blog = blogResponse.data;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Blog Details</h1>
        <div className="flex gap-2">
          <Link href={`/admin/blogs/${id}/edit`}>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition">
              Edit
            </button>
          </Link>
          <Link href="/admin/blogs">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition">
              Back
            </button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <div className="mb-4">
          <span className="text-sm text-gray-500 font-medium">Author:</span>
          <p className="mt-1 text-gray-800">{blog.authorId?.email}</p>
        </div>

        <div className="mb-4 text-xl font-bold">
          Blog Title: {blog.title}
        </div>

        <div className="mb-4">
          <span className="text-sm text-gray-500 font-medium">Published:</span>
          <p className="mt-1 text-gray-600 text-sm">
            {new Date(blog.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mb-4">
          <span className="text-sm text-gray-500 font-medium">Content:</span>
          <div className="mt-2 p-4 bg-gray-50 rounded-lg border text-gray-800 whitespace-pre-wrap leading-relaxed">
            {blog.content}
          </div>
        </div>
      </div>
    </div>
  );
}
