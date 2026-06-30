import { fetchBlogByIdAction } from "@/lib/actions/blog-action";
import EditBlogForm from "../../../_components/EditBlogForm";

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

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Edit Blog</h1>
      <EditBlogForm blog={blogResponse.data} />
    </div>
  );
}
