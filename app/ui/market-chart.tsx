'use client';

import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

const API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Replace with your key

async function fetchIndex(symbol: string) {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`
  );
  const data = await res.json();
  return data['Time Series (Daily)'];
}

export default function MarketChart({ sp500 }: { sp500: any[] }) {
  const labels = sp500.map((item) => item.date.toISOString().slice(0, 10));
  const chartData = {
    labels,
    datasets: [
      {
        label: 'S&P 500',
        data: sp500.map((item) => item.close),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-lg font-semibold mb-2 text-center">S&amp;P 500 </h2>
      <Line data={chartData} />
    </div>
  );
}