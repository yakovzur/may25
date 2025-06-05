import { getStockDiaryEntryById, updateStockDiaryEntry, deleteStockDiaryEntry } from '../actions';
import { redirect } from 'next/navigation';

export default async function TickerDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const entry = await getStockDiaryEntryById(id);

  if (!entry) {
    return <div className="p-8">Entry not found.</div>;
  }

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
      <form action={handleUpdate} className="flex flex-col gap-2 mb-2">
        <input type="hidden" name="id" value={id} />
        <input
          name="ticker"
          defaultValue={entry.ticker}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          name="price"
          defaultValue={entry.price}
          type="number"
          step="0.01"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <textarea
          name="comments"
          defaultValue={entry.comments}
          rows={7}
          className="border p-2 rounded resize-y min-h-[140px] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {/* Button row */}
        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition"
          >
            Save
          </button>
        </div>
      </form>
      {/* Delete form OUTSIDE the update form, but visually aligned */}
      <div className="flex justify-end mt-2">
        <form action={handleDelete}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow hover:from-red-600 hover:to-red-800 transition"
          >
            Delete
          </button>
        </form>
      </div>
      <div className="mt-4 text-gray-600 text-sm">
        Created: {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : ''}
      </div>
    </main>
  );
}