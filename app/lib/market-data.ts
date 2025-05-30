import yahooFinance from 'yahoo-finance2';

export async function fetchMarketData() {
  const now = new Date();
  const period2 = now;
  const period1 = new Date();
  period1.setDate(now.getDate() - 30);

  const [nasdaq, sp500] = await Promise.all([
    yahooFinance.historical('^IXIC', { period1, period2, interval: '1d' }),
    yahooFinance.historical('^GSPC', { period1, period2, interval: '1d' }),
  ]);
  return { nasdaq, sp500 };
}