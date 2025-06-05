"use client";
import { useState } from "react";

export default function StockDiaryAddForm({ onAdd }: { onAdd: (formData: FormData) => void }) {
  const [ticker, setTicker] = useState("");
  const [price, setPrice] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchPrice(ticker: string) {
    if (!ticker) {
      setPrice("");
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/stock-price?ticker=${ticker}`);
    const data = await res.json();
    setPrice(
      data.price !== null && data.price !== undefined
        ? data.price.toString()
        : ""
    );
    setLoading(false);
  }

  function handleTickerChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toUpperCase();
    setTicker(value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ticker", ticker);
    formData.append("price", price); // No $ sign!
    formData.append("comments", comments);
    await onAdd(formData);
    setTicker("");
    setPrice("");
    setComments("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md mb-8">
      <div className="flex gap-2">
        <input
          name="ticker"
          value={ticker}
          onChange={handleTickerChange}
          placeholder="Ticker"
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition flex-1"
        />
        <button
          type="button"
          onClick={() => fetchPrice(ticker)}
          disabled={!ticker || loading}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? "..." : "Get Price"}
        </button>
      </div>
      <input
        name="price"
        value={`$${price}`}
        readOnly
        required
        placeholder="Price"
        className="border p-2 rounded bg-gray-100 text-gray-700 focus:outline-none"
      />
      <textarea
        name="comments"
        value={comments}
        onChange={e => setComments(e.target.value)}
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
  );
}

