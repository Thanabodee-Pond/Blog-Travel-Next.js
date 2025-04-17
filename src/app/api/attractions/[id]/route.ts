// app/api/attractions/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: Request,
{ params }: { params: { id: string } }
) {
 const attractionId = parseInt(params.id);

 if (isNaN(attractionId)) {
  return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
 }

 const attraction = await prisma.attraction.findUnique({
 where: { id: attractionId },
 })

 if (!attraction) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
 }

 return NextResponse.json(attraction)
}

export async function PUT(
 req: Request,
 { params }: { params: { id: string } }
) {
 const attractionId = parseInt(params.id);

 if (isNaN(attractionId)) {
  return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
 }

 const data = await req.json()

 const updated = await prisma.attraction.update({
  where: { id: attractionId },
  data,
 })

 return NextResponse.json(updated)
}

export async function DELETE(
 _req: Request,
 { params }: { params: { id: string } }
) {
 const attractionId = parseInt(params.id);

 if (isNaN(attractionId)) {
  return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
 }

 await prisma.attraction.delete({
  where: { id: attractionId },
 })

 return NextResponse.json({ message: 'Deleted' })
}