import { addFunds } from "@/lib/walletStore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { amount } = body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const result = await addFunds(amount);
  return NextResponse.json(result, { status: result.success ? 200 : 402 });
}
