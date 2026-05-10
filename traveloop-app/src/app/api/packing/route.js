// src/app/api/packing/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/packing?uid=xxx&tripId=xxx
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const firebaseUid = searchParams.get("uid");
    const tripId      = searchParams.get("tripId");

    if (!firebaseUid) return NextResponse.json({ error: "uid required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { firebaseUid } });
    if (!user) return NextResponse.json({ items: [] });

    const items = await prisma.packItem.findMany({
      where: { userId: user.id, ...(tripId ? { tripId } : {}) },
      orderBy: [{ category: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json({ items });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST /api/packing — create or bulk-create
export async function POST(request) {
  try {
    const body = await request.json();
    const { firebaseUid, tripId, label, category, items: bulkItems } = body;

    if (!firebaseUid) return NextResponse.json({ error: "uid required" }, { status: 400 });

    const user = await prisma.user.upsert({
      where:  { firebaseUid },
      update: {},
      create: { firebaseUid, email: "" },
    });

    // Bulk create from AI suggestions
    if (bulkItems?.length) {
      await prisma.packItem.createMany({
        data: bulkItems.map((l) => ({
          userId:   user.id,
          tripId:   tripId || null,
          label:    l.label || l,
          category: l.category || "other",
        })),
        skipDuplicates: true,
      });
      const items = await prisma.packItem.findMany({ where: { userId: user.id } });
      return NextResponse.json({ items }, { status: 201 });
    }

    const item = await prisma.packItem.create({
      data: { userId: user.id, tripId: tripId || null, label, category: category || "other" },
    });
    return NextResponse.json({ item }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// PATCH /api/packing  — toggle packed or update label
export async function PATCH(request) {
  try {
    const { id, packed, label } = await request.json();
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const item = await prisma.packItem.update({
      where: { id },
      data:  { ...(packed !== undefined ? { packed } : {}), ...(label ? { label } : {}) },
    });
    return NextResponse.json({ item });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE /api/packing?id=xxx
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await prisma.packItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
