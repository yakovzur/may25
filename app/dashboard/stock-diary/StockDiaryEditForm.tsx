"use client";
import { useState } from "react";

export default function StockDiaryEditForm({
  entry,
  id,
  price,
  onUpdate,
  onDelete,
}: {
  entry: any;
  id: string;
  price: number | null;
  onUpdate: (formData: FormData) => void;
  onDelete: (formData: FormData) => void;
}) {
  const [ticker, setTicker] = useState(entry.ticker);

  return (
    <>
      <form action={onUpdate} className="flex flex-col gap-2 mb-2">
        <input type="hidden" name="id" value={id} />
        <input
          name="ticker"
          value={ticker}
          onChange={e => setTicker(e.target.value.toUpperCase())}
          placeholder="Ticker"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          name="price"
          value={price !== null ? `$${price.toFixed(2)}` : ""}
          readOnly
          required
          placeholder="Price"
          className="border p-2 rounded bg-gray-100 text-gray-700 focus:outline-none"
        />
        <textarea
          name="comments"
          defaultValue={entry.comments}
          rows={7}
          className="border p-2 rounded resize-y min-h-[140px] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition"
          >
            Save
          </button>
        </div>
      </form>
      <form action={onDelete} className="flex justify-end mt-0">
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow hover:from-red-600 hover:to-red-800 transition"
        >
          Delete
        </button>
      </form>
    </>
  );
}