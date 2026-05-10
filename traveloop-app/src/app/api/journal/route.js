// src/app/api/journal/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const firebaseUid = searchParams.get("uid");
    const tripId      = searchParams.get("tripId");

    if (!firebaseUid) return NextResponse.json({ error: "uid required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { firebaseUid } });
    if (!user) return NextResponse.json({ notes: [] });

    const notes = await prisma.note.findMany({
      where:   { userId: user.id, ...(tripId ? { tripId } : {}) },
      include: { trip: { select: { title: true } } },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({ notes });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { firebaseUid, tripId, title, content } = await request.json();
    if (!firebaseUid || !title || !content)
      return NextResponse.json({ error: "uid, title, content required" }, { status: 400 });

    const user = await prisma.user.upsert({
      where:  { firebaseUid },
      update: {},
      create: { firebaseUid, email: "" },
    });
    const note = await prisma.note.create({
      data: { userId: user.id, tripId: tripId || null, title, content },
    });
    return NextResponse.json({ note }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, title, content, tripId } = await request.json();
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const note = await prisma.note.update({
      where: { id },
      data:  { ...(title ? { title } : {}), ...(content ? { content } : {}), ...(tripId !== undefined ? { tripId } : {}) },
    });
    return NextResponse.json({ note });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await prisma.note.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
