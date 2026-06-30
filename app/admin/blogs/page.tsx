import { fetchBlogsAction } from "@/lib/actions/blog-action";
import BlogTable from "./_components/BlogTable";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;

  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const size = query.size ? parseInt(query.size as string, 10) : 10;
  const search = query.search ? (query.search as string) : undefined;

  const blogsResponse = await fetchBlogsAction({ page, size, search });

  if (!blogsResponse.success) {
    throw new Error(blogsResponse.message || "Failed to fetch blogs");
  }
  if (!blogsResponse.data) {
    throw new Error("No blogs data available");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">All Blogs</h1>
        <a
          href="/admin/blogs/create"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          + New Blog
        </a>
      </div>
      <BlogTable
        blogs={blogsResponse.data}
        pagination={blogsResponse.pagination}
        search={search}
      />
    </div>
  );
}
