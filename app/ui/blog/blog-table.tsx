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
    <table className="min-w-full border text-left">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border-b">Title</th>
          <th className="p-2 border-b">Content</th>
          <th className="p-2 border-b">Date</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post._id}>
            <td className="p-2 border-b">
              <Link
                href={`/dashboard/blog/${post._id}`}
                className="text-black hover:underline"
                target="_blank" // Optional: open in new tab
                rel="noopener noreferrer"
              >
                {post.title}
              </Link>
            </td>
            <td
              className={`p-2 border-b ${
                /[\u0590-\u05FF]/.test(post.content) ? "text-right" : ""
              }`}
              dir={/[\u0590-\u05FF]/.test(post.content) ? "rtl" : "ltr"}
            >
              {post.content}
            </td>
            <td className="p-2 border-b">{post.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}