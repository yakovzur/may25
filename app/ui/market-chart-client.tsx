'use client';

import dynamic from 'next/dynamic';

const MarketChart = dynamic(() => import('./market-chart'), { ssr: false });

export default function MarketChartClient({ nasdaq, sp500 }: { nasdaq: any[]; sp500: any[] }) {
  return <MarketChart nasdaq={nasdaq} sp500={sp500} />;
}