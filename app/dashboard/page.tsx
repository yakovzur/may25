export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";
import Link from 'next/link';


export default async function DashboardPage() {

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded shadow p-3 flex flex-col items-start max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-2">Blog</h2>
          <p className="mb-2 text-gray-600 text-sm">Create, edit, and manage your blog posts.</p>
        </div>
      </div>
    </main>
  );
}