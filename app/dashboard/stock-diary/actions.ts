"use server";
import { ObjectId } from 'mongodb';
import clientPromise from '@/app/lib/mongodb';
import { revalidatePath } from 'next/cache';

export async function addStockDiaryEntry(formData: FormData) {
  const client = await clientPromise;
  const db = client.db();
  await db.collection('stock_diary').insertOne({
    ticker: formData.get('ticker'),
    price: parseFloat(formData.get('price') as string),
    comments: formData.get('comments'),
    createdAt: new Date(),
  });
  revalidatePath('/dashboard/stock-diary');
}

export async function getStockDiaryEntries() {
  const client = await clientPromise;
  const db = client.db();
  return await db.collection('stock_diary').find({}).sort({ createdAt: -1 }).toArray();
}

export async function getStockDiaryEntryById(id: string) {
  const client = await clientPromise;
  const db = client.db();
  return await db.collection('stock_diary').findOne({ _id: new ObjectId(id) });
}

export async function updateStockDiaryEntry(formData: FormData) {
  const id = formData.get('id') as string;
  const client = await clientPromise;
  const db = client.db();
  await db.collection('stock_diary').updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ticker: formData.get('ticker'),
        price: parseFloat(formData.get('price') as string),
        comments: formData.get('comments'),
      },
    }
  );
  revalidatePath('/dashboard/stock-diary');
}

export async function deleteStockDiaryEntry(formData: FormData) {
  const id = formData.get('id') as string;
  const client = await clientPromise;
  const db = client.db();
  await db.collection('stock_diary').deleteOne({ _id: new ObjectId(id) });
  revalidatePath('/dashboard/stock-diary');
}