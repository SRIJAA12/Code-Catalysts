import { getTransactions } from "@/lib/walletStore";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);

  const result = getTransactions({ page, limit });
  return NextResponse.json(result);
}
