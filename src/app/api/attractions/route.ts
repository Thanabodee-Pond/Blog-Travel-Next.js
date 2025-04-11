// app/api/attractions/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const attractions = await prisma.attraction.findMany()
  return NextResponse.json(attractions)
}

export async function POST(req: Request) {
  const data = await req.json()

  const newAttraction = await prisma.attraction.create({
    data: {
      name: data.name,
      detail: data.detail,
      coverImage: data.coverImage,
      latitude: data.latitude,
      longitude: data.longitude,
    },
  })

  return NextResponse.json(newAttraction)
}
