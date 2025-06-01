import { fetchPostById } from '@/app/lib/data';
import Link from 'next/link';

export default async function BlogViewPage(props: { params: { id: string } }) {
  const { params } = props; // <-- Remove 'await' here
  const post = await fetchPostById(params.id);

  if (!post) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <Link href="/dashboard/blog" className="text-blue-600 underline">Back to Blog</Link>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="mb-6 text-gray-500 text-sm">
        {post.createdAt instanceof Date
          ? post.createdAt.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })
          : String(post.createdAt)}
      </div>
      <div className="prose whitespace-pre-line">{post.content}</div>
      <Link href="/dashboard/blog" className="mt-8 inline-block text-blue-600 underline">Back to Blog</Link>
    </main>
  );
}