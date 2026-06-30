import { fetchUsersAction } from "@/lib/actions/user-action";
import UserTable from "./_components/UserTable";
import Link from "next/link";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;

  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const limit = query.limit ? parseInt(query.limit as string, 10) : 10;
  const search = query.search ? (query.search as string) : undefined;

  const usersResponse = await fetchUsersAction({ page, limit, search });

  if (!usersResponse.success) {
    throw new Error(usersResponse.message || "Failed to fetch users");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
        <Link
          href="/admin/users/create"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition shadow-sm"
        >
          + Add User
        </Link>
      </div>

      <UserTable
        users={usersResponse.data || []}
        meta={usersResponse.meta}
        search={search}
      />
    </div>
  );
}
