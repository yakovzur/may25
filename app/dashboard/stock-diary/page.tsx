import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  addStockDiaryEntry,
  getStockDiaryEntries,
  deleteStockDiaryEntry,
} from './actions';

export default async function StockDiaryPage() {
  const entries = await getStockDiaryEntries();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Stock Diary</h1>
      <form action={addStockDiaryEntry} className="flex flex-col gap-2 max-w-md mb-8">
        <input
          name="ticker"
          placeholder="Ticker"
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          name="price"
          placeholder="Price (USD)"
          type="number"
          step="0.01"
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <textarea
          name="comments"
          placeholder="Comments"
          rows={5}
          className="border p-2 rounded resize-y min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          type="submit"
          className="self-end bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition"
        >
          Add
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b">Ticker</th>
              <th className="p-2 border-b">Price (USD)</th>
              <th className="p-2 border-b">Date</th>
              <th className="p-2 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry: any) => (
              <tr key={entry._id}>
                <td className="p-2 border-b">
                  <Link
                    href={`/dashboard/stock-diary/${entry._id}`}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {entry.ticker}
                  </Link>
                </td>
                <td className="p-2 border-b">${entry.price}</td>
                <td className="p-2 border-b">
                  {entry.createdAt
                    ? new Date(entry.createdAt).toLocaleString()
                    : ''}
                </td>
                <td className="p-2 border-b text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Link
                      href={`/dashboard/stock-diary/${entry._id}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </Link>
                    <form action={deleteStockDiaryEntry}>
                      <input type="hidden" name="id" value={entry._id.toString()} />
                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}