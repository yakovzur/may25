'use client';

import dynamic from 'next/dynamic';

const MarketChart = dynamic(() => import('./market-chart'), { ssr: false });

export default function MarketChartClient({sp500 }: {sp500: any[] }) {
  return <MarketChart sp500={sp500} />;
}