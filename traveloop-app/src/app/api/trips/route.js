// src/app/api/trips/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// ── GET /api/trips  (list user's trips) ───────────────────────────
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const firebaseUid = searchParams.get("uid");
    if (!firebaseUid) return NextResponse.json({ error: "uid required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { firebaseUid } });
    if (!user) return NextResponse.json({ trips: [] });

    const trips = await prisma.trip.findMany({
      where:   { userId: user.id },
      include: { cities: { include: { activities: true } }, expenses: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ trips });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// ── POST /api/trips  (create trip) ─────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const { firebaseUid, email, name, ...tripData } = body;

    if (!firebaseUid) return NextResponse.json({ error: "firebaseUid required" }, { status: 400 });

    // Upsert user
    const user = await prisma.user.upsert({
      where:  { firebaseUid },
      update: { email: email || undefined, name: name || undefined },
      create: { firebaseUid, email: email || "", name: name || undefined },
    });

    // Generate share slug
    const shareSlug = Math.random().toString(36).slice(2, 10);

    const trip = await prisma.trip.create({
      data: {
        userId:      user.id,
        title:       tripData.title || "My Trip",
        destination: tripData.destination || null,
        coverImage:  tripData.coverImage  || null,
        status:      tripData.status      || "draft",
        startDate:   tripData.startDate   ? new Date(tripData.startDate) : null,
        endDate:     tripData.endDate     ? new Date(tripData.endDate)   : null,
        budget:      tripData.budget      ? parseFloat(tripData.budget)  : null,
        budgetStyle: tripData.budgetStyle || null,
        interests:   tripData.interests   || [],
        shareSlug,
        isPublic:    false,
      },
    });

    return NextResponse.json({ trip }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
