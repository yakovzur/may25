import bcrypt from 'bcrypt';
import clientPromise from '../lib/mongodb';
import { users, customers, invoices, revenue } from '../lib/placeholder-data';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use default DB from URI

    // Seed users
    await db.collection('users').deleteMany({});
    await db.collection('users').insertMany(
      await Promise.all(
        users.map(async (user) => ({
          ...user,
          password: await bcrypt.hash(user.password, 10),
        }))
      )
    );

    // Seed customers
    await db.collection('customers').deleteMany({});
    await db.collection('customers').insertMany(customers);

    // Seed invoices
    await db.collection('invoices').deleteMany({});
    await db.collection('invoices').insertMany(invoices);

    // Seed revenue
    await db.collection('revenue').deleteMany({});
    await db.collection('revenue').insertMany(revenue);

    return Response.json({ message: 'Database seeded successfully (MongoDB)' });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : error }, { status: 500 });
  }
}