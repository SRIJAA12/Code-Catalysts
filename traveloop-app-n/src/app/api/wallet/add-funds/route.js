import { addFunds } from "@/lib/walletStore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { amount } = body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const result = await addFunds(amount);

  if (result.success) {
    return NextResponse.json(result, { status: 200 });
  } else {
    return NextResponse.json(result, { status: 402 });
  }
}
