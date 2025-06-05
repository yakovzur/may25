import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import StockDiaryAddForm from "./StockDiaryAddForm";
import { addStockDiaryEntry, getStockDiaryEntries, deleteStockDiaryEntry } from "./actions";
import { headers } from "next/headers";

export default async function StockDiaryPage() {
  const entries = await getStockDiaryEntries();

  // Fetch latest prices for all tickers in parallel
  const prices = await Promise.all(
    entries.map((entry: any) => fetchLatestPrice(entry.ticker))
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Stock Diary</h1>
      <StockDiaryAddForm onAdd={addStockDiaryEntry} />
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
            {entries.map((entry: any, idx: number) => (
              <tr key={entry._id}>
                <td className="p-2 border-b">
                  <Link
                    href={`/dashboard/stock-diary/${entry._id}`}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {entry.ticker}
                  </Link>
                </td>
                <td className="p-2 border-b">
                  {prices[idx] !== null && !isNaN(Number(prices[idx]))
                    ? `$${Number(prices[idx]).toFixed(2)}`
                    : "N/A"}
                </td>
                <td className="p-2 border-b">
                  {entry.createdAt
                    ? new Date(entry.createdAt).toLocaleString()
                    : ""}
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

// Helper to fetch the latest price from your API for a given ticker
async function fetchLatestPrice(ticker: string): Promise<number | null> {
  try {
    const headersList = await headers(); // <-- await here!
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const url = `${protocol}://${host}/api/stock-price?ticker=${ticker}`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return data.price !== undefined && data.price !== null ? Number(data.price) : null;
  } catch {
    return null;
  }
}