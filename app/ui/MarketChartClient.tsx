'use client';

import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale);

export default function MarketChartClient({ sp500 }: { sp500: any[] }) {
  const labels = sp500.map((point: any) => point.date);

  const data = {
    labels,
    datasets: [
      {
        label: 'S&P 500',
        data: sp500.map((point: any) => point.close),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const, // Use 'minute' as const if your data is intraday
          tooltipFormat: 'MMM d, yyyy',
          displayFormats: {
            day: 'MMM d',
            minute: 'HH:mm',
            hour: 'HH:mm',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 10,
          autoSkip: true,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Close Price',
        },
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          callback: function (tickValue: string | number) {
            // Chart.js may pass string or number, so handle both
            const num = typeof tickValue === 'number' ? tickValue : Number(tickValue);
            return `$${num.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <Line data={data} options={options} height={320} />
    </div>
  );
}