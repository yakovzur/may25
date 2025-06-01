import { fetchPostById } from '@/app/lib/data';
import { editBlogPost } from '../../actions';
import Link from 'next/link';

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const post = await fetchPostById(params.id);

  return
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
      <form action={editBlogPost.bind(null, post._id.toString())} className="flex flex-col gap-2 max-w-xl">
        <input
          name="title"
          defaultValue={post.title}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="content"
          defaultValue={post.content}
          className="border p-2 rounded"
          rows={8}
          required
        />
        <div className="flex gap-2 mt-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <Link href="/dashboard/blog" className="bg-gray-200 px-4 py-2 rounded">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}