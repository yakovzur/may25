'use server';

import { createPost, updatePost, deletePost } from '@/app/lib/data';
import { redirect } from 'next/navigation';

export async function createBlogPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  await createPost(title, content);
  redirect('/dashboard/blog'); // This will reload the page and show the new post
}

export async function editBlogPost(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  await updatePost(id, title, content);
  redirect('/dashboard/blog'); // Redirect after saving
}

export async function deleteBlogPost(id: string) {
  await deletePost(id);
}