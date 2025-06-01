import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';


export async function fetchRevenue() {
  const client = await clientPromise;
  const db = client.db();
  const revenueDocs = await db.collection('revenue').find({}).toArray();

  // Transform documents to match Revenue[] type
  return revenueDocs.map((doc) => ({
    month: doc.month,      // or doc._id if you use aggregation
    revenue: doc.revenue,  // or doc.amount if that's your field
  }));
}


export async function fetchCustomers() {
  const client = await clientPromise;
  const db = client.db();
  const customers = await db.collection('users').find({}).toArray();

  return customers.map((customer) => ({
    _id: customer._id?.toString() ?? '',
    name: customer.name,
    email: customer.email,
    image_url: customer.image_url,
  }));
}

export async function fetchAllCustomers() {
  const client = await clientPromise;
  const db = client.db();
  const customers = await db.collection('users').find({}).toArray();

  return customers.map((customer) => ({
    _id: customer._id?.toString() ?? '',
    email: customer.email,
    // Add more fields if needed
  }));
}




export async function fetchPosts() {
  const client = await clientPromise;
  const db = client.db();
  return db.collection('posts').find({}).sort({ createdAt: -1 }).toArray();
}

export async function fetchPostById(id: string) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection('posts').findOne({ _id: new ObjectId(id) });
}

export async function createPost(title: string, content: string) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection('posts').insertOne({
    title,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function updatePost(id: string, title: string, content: string) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection('posts').updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, content, updatedAt: new Date() } }
  );
}

export async function deletePost(id: string) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection('posts').deleteOne({ _id: new ObjectId(id) });
}