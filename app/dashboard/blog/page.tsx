export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";


import { fetchPosts } from '@/app/lib/data';
import BlogTable from '@/app/ui/blog/blog-table';
import { createBlogPost } from './actions';
import { format } from 'date-fns';

export default async function BlogPage() {
  const posts = await fetchPosts();

  // Convert _id and createdAt to strings and format date
  const plainPosts = posts.map((post: any) => ({
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt instanceof Date
      ? format(post.createdAt, 'yyyy-MM-dd HH:mm')
      : String(post.createdAt),
  }));

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <form action={createBlogPost} className="mb-8 flex flex-col gap-2 max-w-2xl">
        <input
          name="title"
          placeholder="Title"
          className="border p-2 rounded w-full"
          required
        />
        <div className="h-4" /> {/* Bigger gap between Title and Content */}
        <textarea
          name="content"
          placeholder="Content"
          className="border p-2 rounded w-full"
          rows={6}
          required
        />
        <div className="h-4" /> {/* Bigger gap between Content and New Post button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded self-start"
        >
          New Post
        </button>
      </form>
      <BlogTable posts={plainPosts} />
    </main>
  );
}
