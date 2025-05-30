import { fetchAllCustomers } from '@/app/lib/data';
import CustomerTable from '@/app/ui/customers/customer-table';

export default async function CustomersPage() {
  const customers = await fetchAllCustomers();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registered Customers</h1>
      <CustomerTable customers={customers} />
    </main>
  );
}