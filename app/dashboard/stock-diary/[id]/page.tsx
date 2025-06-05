import { getStockDiaryEntryById, updateStockDiaryEntry, deleteStockDiaryEntry } from '../actions';
import StockDiaryEditForm from '../StockDiaryEditForm';
import { redirect } from 'next/navigation';
import { headers } from "next/headers";

// Helper to fetch the latest price from your API
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

export default async function TickerDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const entry = await getStockDiaryEntryById(id);
  

  if (!entry) {
    return <div className="p-8">Entry not found.</div>;
  }

  // Convert to plain object:
  const plainEntry = {
    ...entry,
    _id: entry._id.toString(),
    createdAt: entry.createdAt?.toISOString?.() ?? "",
    ticker: entry.ticker,
  };

  // Fetch latest price from API
  const latestPrice = await fetchLatestPrice(plainEntry.ticker);

  async function handleDelete(formData: FormData) {
    'use server';
    await deleteStockDiaryEntry(formData);
    redirect('/dashboard/stock-diary');
  }

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateStockDiaryEntry(formData);
    redirect('/dashboard/stock-diary');
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{entry.ticker}</h1>
      <StockDiaryEditForm entry={plainEntry} id={id} price={latestPrice} onUpdate={handleUpdate} onDelete={handleDelete} />
      <div className="mt-4 text-gray-600 text-sm">
        Created: {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : ''}
      </div>
    </main>
  );
}