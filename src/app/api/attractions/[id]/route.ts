import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
<<<<<<< HEAD
 _req: Request,
 { params }: { params: { id: string } }
=======
  _req: Request,
{ params }: { params: { id: string } }
>>>>>>> 5814d24a406fd89b64e9c42c79f82ac4f9c6b0b0
) {
 const attractionId = parseInt(params.id);

 if (isNaN(attractionId)) {
  return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
 }

 const attraction = await prisma.attraction.findUnique({
<<<<<<< HEAD
  where: { id: attractionId },
=======
 where: { id: attractionId },
>>>>>>> 5814d24a406fd89b64e9c42c79f82ac4f9c6b0b0
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
<<<<<<< HEAD
 _req: Request,  { params }: { params: { id: string } }
=======
 _req: Request,
 { params }: { params: { id: string } }
>>>>>>> 5814d24a406fd89b64e9c42c79f82ac4f9c6b0b0
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