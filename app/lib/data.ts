import clientPromise from './mongodb';

export async function fetchRevenue() {
  const client = await clientPromise;
  const db = client.db();
  const revenue = await db.collection('revenue').find({}).toArray();
  return revenue;
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

export async function fetchLatestInvoices(limit = 5) {
  const client = await clientPromise;
  const db = client.db();

  const invoices = await db.collection('invoices').aggregate([
    { $sort: { date: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: 'customers',
        localField: 'customer_id',
        foreignField: 'id',
        as: 'customer',
      },
    },
    { $unwind: '$customer' },
  ]).toArray();

  return invoices;
}