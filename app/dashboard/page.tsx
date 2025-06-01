export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";
import Link from 'next/link';
import { fetchPosts } from '@/app/lib/data';

export default async function DashboardPage() {
  const posts = await fetchPosts();
  const latestPosts = posts
    .sort((a, b) => {
      const dateA = new Date(a.createdAt ?? 0).getTime();
      const dateB = new Date(b.createdAt ?? 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 3)
    .map((post: any) => ({
      _id: post._id.toString(),
      title: post.title,
    }));

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
        </div>
      </div>
    </main>
  );
}