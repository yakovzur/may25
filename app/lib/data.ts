import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';


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


