import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const address = searchParams.get("address");

    const apiKey = process.env.COVALENT_API_KEY;

    const response = await fetch(
      `https://api.covalenthq.com/v1/eth-mainnet/address/${address}/balances_v2/?key=${apiKey}`
    );

    const data = await response.json();

    const items = data.data.items || [];

    let totalValue = 0;

    items.forEach((token: any) => {
      totalValue += token.quote || 0;
    });

    return NextResponse.json({
      address,
      score: Math.min(100, Math.floor(totalValue / 1000)),
      portfolioValue: totalValue.toFixed(2),
      nfts: 100,
      transactions: items.length,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      error: "Failed to fetch wallet",
    });
  }
}