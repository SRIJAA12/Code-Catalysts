// src/app/api/trips/[id]/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// ── GET /api/trips/:id ──────────────────────────────────────────────
export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const trip = await prisma.trip.findUnique({
      where:   { id },
      include: {
        cities: { orderBy: { order: "asc" }, include: { activities: { orderBy: { order: "asc" } } } },
        expenses: { orderBy: { date: "desc" } },
        packItems: true,
        notes: { orderBy: { updatedAt: "desc" } },
      },
    });
    if (!trip) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ trip });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// ── PUT /api/trips/:id ──────────────────────────────────────────────
export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const trip = await prisma.trip.update({
      where: { id },
      data: {
        title:       body.title,
        destination: body.destination,
        coverImage:  body.coverImage,
        status:      body.status,
        startDate:   body.startDate ? new Date(body.startDate) : undefined,
        endDate:     body.endDate   ? new Date(body.endDate)   : undefined,
        budget:      body.budget    ? parseFloat(body.budget)  : undefined,
        budgetStyle: body.budgetStyle,
        interests:   body.interests,
        isPublic:    body.isPublic,
      },
    });
    return NextResponse.json({ trip });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// ── DELETE /api/trips/:id ───────────────────────────────────────────
export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    await prisma.trip.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
