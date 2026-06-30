import { fetchUserByIdAction } from "@/lib/actions/user-action";
import EditUserForm from "../../_components/EditUserForm";
import Link from "next/link";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userResponse = await fetchUserByIdAction(id);

  if (!userResponse.success) {
    throw new Error(userResponse.message || "Failed to fetch user");
  }

  if (!userResponse.data) {
    throw new Error("No user data available");
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Edit User</h1>
        <Link
          href={`/admin/users/${id}`}
          className="text-gray-600 hover:text-gray-900 transition"
        >
          Cancel
        </Link>
      </div>

      <EditUserForm user={userResponse.data} />
    </div>
  );
}
