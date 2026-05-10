import { getWallet } from "@/lib/walletStore";
import { NextResponse } from "next/server";

export async function GET() {
  const wallet = getWallet();
  return NextResponse.json({ balance: wallet.balance, wallet_id: wallet.wallet_id });
}
