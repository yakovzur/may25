import Link from 'next/link';
import { fetchPosts } from '@/app/lib/data';

export default async function DashboardPage() {
  // Fetch latest 3 blog posts
  const posts = await fetchPosts();
  const latestPosts = posts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)
    .map((post: any) => ({
      _id: post._id.toString(),
      title: post.title,
    }));

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Blog box - half width */}
        <div className="bg-white rounded shadow p-3 flex flex-col items-start max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-2">Blog</h2>
          <p className="mb-2 text-gray-600 text-sm">Create, edit, and manage your blog posts.</p>
          <ul className="mb-4 text-gray-700 text-base w-full">
            {latestPosts.map((post) => (
              <li key={post._id} className="mb-1">
                <Link
                  href={`/dashboard/blog/${post._id}`}
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={post.title}
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/dashboard/blog"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
          >
            Go to Blog
          </Link>
        </div>
        {/* Customers box - half width */}
        <div className="bg-white rounded shadow p-3 flex flex-col items-start">
          <h2 className="text-xl font-semibold mb-2">Customers</h2>
          <p className="mb-4 text-gray-600">View and manage your registered customers.</p>
          <Link
            href="/dashboard/customers"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Go to Customers
          </Link>
        </div>
      </div>
      <div className="bg-gray-50 rounded p-6 text-gray-700">
        <h3 className="text-lg font-semibold mb-2">Welcome!</h3>
        <p>
          This is your dashboard. Use the cards above to quickly access your blog and management tools.
          You can customize this page to show stats, recent activity, or anything else you need.
        </p>
      </div>
    </main>
  );
}