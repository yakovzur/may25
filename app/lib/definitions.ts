// Invoice type for lists and tables
export type LatestInvoice = {
  _id: string; // MongoDB ObjectId as string
  amount: number;
  date: string;
  status: 'pending' | 'paid' | string; // allow string for flexibility
  customer: {
    name: string;
    email: string;
    image_url?: string;
  };
};

// User type for authentication
export type User = {
  _id?: string; // MongoDB ObjectId as string (optional for compatibility)
  id?: string;  // for legacy/compatibility
  name: string;
  email: string;
  password: string;
};

// Customer type
export type Customer = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  image_url?: string;
};

// Invoice type for full invoice documents
export type Invoice = {
  _id?: string;
  id?: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

// Revenue type for charts
export type Revenue = {
  month: string;
  revenue: number;
};

// Table and form types (optional, for UI)
export type InvoicesTable = {
  _id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url?: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  _id: string;
  name: string;
  email: string;
  image_url?: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  _id: string;
  name: string;
  email: string;
  image_url?: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  _id: string;
  name: string;
  email: string;
  image_url?: string;
};

export type InvoiceForm = {
  _id?: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

// MongoDB aggregation pipeline stages for invoices
export const invoicePipeline = [
  {
    $match: {
      // Match invoices with a specific customer_id
      customer_id: 'some_customer_id',
    },
  },
  {
    $lookup: {
      from: 'customers', // Join with the customers collection
      let: { customer_id: '$customer_id' },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$_id', '$$customer_id'] }, // Match by customer_id
                // Add more conditions if needed
              ],
            },
          },
        },
      ],
      as: 'customer_info',
    },
  },
  {
    $unwind: {
      path: '$customer_info',
      preserveNullAndEmptyArrays: true, // Keep invoices even if no matching customer
    },
  },
  {
    $project: {
      // Include fields for the invoice and customer
      _id: 1,
      amount: 1,
      date: 1,
      status: 1,
      'customer_info.name': 1,
      'customer_info.email': 1,
      'customer_info.image_url': 1,
    },
  },
];