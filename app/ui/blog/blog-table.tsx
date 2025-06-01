"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteBlogPost } from "@/app/dashboard/blog/actions";

export default function BlogTable({ posts }: { posts: any[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this post?")) {
      await deleteBlogPost(id);
      router.refresh();
    }
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 bg-white rounded shadow">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Created
          </th>
          <th className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {posts.map((post) => (
          <tr key={post._id}>
            <td className="px-6 py-4">
              <Link
                href={`/dashboard/blog/${post._id}`}
                className="text-black hover:underline"
                target="_blank" // Optional: open in new tab
                rel="noopener noreferrer"
              >
                {post.title}
              </Link>
            </td>
            <td className="px-6 py-4">{post.createdAt}</td>
            <td className="px-6 py-4 flex gap-2">
              <Link
                href={`/dashboard/blog/${post._id}/edit`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                type="button"
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(post._id.toString())}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}