'use server';

import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import { redirect } from 'next/navigation';

export async function fetchTodos() {
  const client = await clientPromise;
  const db = client.db();
  return await db.collection('todos').find({}).toArray();
}

export async function addTodo(formData: FormData) {
  const client = await clientPromise;
  const db = client.db();
  const text = formData.get('text') as string;
  await db.collection('todos').insertOne({ text, completed: false });
  redirect('/dashboard/todo');
}

export async function updateTodo(formData: FormData) {
  const id = formData.get('id') as string;
  const client = await clientPromise;
  const db = client.db();
  const text = formData.get('text') as string;
  await db.collection('todos').updateOne({ _id: new ObjectId(id) }, { $set: { text } });
  redirect('/dashboard/todo');
}

export async function markTodoCompleted(formData: FormData) {
  const id = formData.get('id') as string;
  const client = await clientPromise;
  const db = client.db();
  await db.collection('todos').updateOne(
    { _id: new ObjectId(id) },
    { $set: { completed: true } }
  );
}

export async function deleteTodo(formData: FormData) {
  const id = formData.get('id') as string;
  const client = await clientPromise;
  const db = client.db();
  await db.collection('todos').deleteOne({ _id: new ObjectId(id) });
}