type Customer = {
  id: string;
  email: string;
  // Add more fields if needed
};

export default function CustomerTable({ customers }: { customers: Customer[] }) {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          <th className="px-4 py-2 border">ID</th>
          <th className="px-4 py-2 border">Email</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer._id}>
            <td className="px-4 py-2 border">{customer.id}</td>
            <td className="px-4 py-2 border">{customer.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}