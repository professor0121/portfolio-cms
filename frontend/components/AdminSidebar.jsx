import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen p-6">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <ul className="space-y-4">
        <li>
          <Link href="/admin" className="hover:text-yellow-300">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/users" className="hover:text-yellow-300">Users</Link>
        </li>
        <li>
          <Link href="/admin/categories" className="hover:text-yellow-300">Categories</Link>
        </li>
      </ul>
    </aside>
  );
}
