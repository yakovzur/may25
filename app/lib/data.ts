import clientPromise from './mongodb';

import { LatestInvoice } from './definitions';

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

export async function fetchDashboardStats() {
  const client = await clientPromise;
  const db = client.db();

  const invoices = db.collection('invoices');
  const customers = db.collection('customers');

  const numberOfInvoices = await invoices.countDocuments();
  const numberOfCustomers = await customers.countDocuments();

  // Sum the amount of all paid invoices
  const collectedResult = await invoices.aggregate([
    { $match: { status: 'paid' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]).toArray();
  const collectedAmount = collectedResult[0]?.total || 0;

  // Sum the amount of all pending invoices
  const pendingResult = await invoices.aggregate([
    { $match: { status: 'pending' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]).toArray();
  const pendingAmount = pendingResult[0]?.total || 0;

  return {
    collectedAmount,
    pendingAmount,
    numberOfInvoices,
    numberOfCustomers,
  };
}

export async function fetchLatestInvoices(limit = 5): Promise<LatestInvoice[]> {
  const client = await clientPromise;
  const db = client.db();

  const invoices = await db.collection('invoices').aggregate([
    { $sort: { date: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: 'customers',
        localField: 'customer_id',
        foreignField: 'id', // or '_id' if that's your schema
        as: 'customer',
      },
    },
    { $unwind: '$customer' },
  ]).toArray();

  // Transform to LatestInvoice[]
  return invoices.map((doc) => ({
    _id: doc._id.toString(),
    amount: doc.amount,
    date: doc.date,
    status: doc.status, // <-- Add this line
    customer: {
      name: doc.customer.name,
      email: doc.customer.email,
      image_url: doc.customer.image_url,
    },
  }));
}

export async function fetchCustomers() {
  const client = await clientPromise;
  const db = client.db();
  const customers = await db.collection('users').find({}).toArray();

  return customers.map((customer) => ({
    _id: customer._id?.toString() ?? '',
    id: customer._id?.toString() ?? '', // <-- add this line
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
    id: customer._id?.toString() ?? '', // <-- add this line
    email: customer.email,
    // Add more fields if needed
  }));
}

