// app/api/attractions/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const attraction = await prisma.attraction.findUnique({
    where: { id: parseInt(params.id) },
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
  const data = await req.json()

  const updated = await prisma.attraction.update({
    where: { id: parseInt(params.id) },
    data,
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.attraction.delete({
    where: { id: parseInt(params.id) },
  })

  return NextResponse.json({ message: 'Deleted' })
}
