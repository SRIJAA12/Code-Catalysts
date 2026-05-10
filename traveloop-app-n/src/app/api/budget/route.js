// src/app/api/budget/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// ── GET /api/budget?uid=xxx&tripId=xxx ──────────────────────────────
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const firebaseUid = searchParams.get("uid");
    const tripId      = searchParams.get("tripId");

    if (!firebaseUid) return NextResponse.json({ error: "uid required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { firebaseUid } });
    if (!user) return NextResponse.json({ expenses: [], analytics: {} });

    const where = { userId: user.id, ...(tripId ? { tripId } : {}) };
    const expenses = await prisma.expense.findMany({
      where,
      orderBy: { date: "desc" },
      include: { trip: { select: { title: true } } },
    });

    // Compute analytics
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    const byCategory = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});

    return NextResponse.json({ expenses, analytics: { total, byCategory } });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// ── POST /api/budget ────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const { firebaseUid, tripId, amount, category, description, date } = body;

    if (!firebaseUid || !amount || !category)
      return NextResponse.json({ error: "uid, amount, category required" }, { status: 400 });

    const user = await prisma.user.upsert({
      where:  { firebaseUid },
      update: {},
      create: { firebaseUid, email: "" },
    });

    const expense = await prisma.expense.create({
      data: {
        userId:      user.id,
        tripId:      tripId || null,
        amount:      parseFloat(amount),
        category,
        description: description || null,
        date:        date ? new Date(date) : new Date(),
      },
    });
    return NextResponse.json({ expense }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// ── DELETE /api/budget?id=xxx ───────────────────────────────────────
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await prisma.expense.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
