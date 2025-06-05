import { NextRequest } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ticker = searchParams.get("ticker")?.toUpperCase();

  if (!ticker) {
    return Response.json({ error: "No ticker provided" }, { status: 400 });
  }

  try {
    const quote = await yahooFinance.quote(ticker);
    // Return price as a number with 1 decimal
    const price =
      quote.regularMarketPrice !== undefined
        ? Math.round(Number(quote.regularMarketPrice) * 10) / 10
        : null;
    return Response.json({ price });
  } catch (e) {
    return Response.json({ error: "Ticker not found" }, { status: 404 });
  }
}