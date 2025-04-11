'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Attraction {
  id: number
  name: string
  detail: string
  coverImage: string
  latitude: number
  longitude: number
}

export default function AttractionPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([])

  const fetchAttractions = async () => {
    const res = await fetch('/api/attractions')
    const data = await res.json()
    setAttractions(data)
  }

  useEffect(() => {
    fetchAttractions()
  }, [])

  const handleDelete = async (id: number) => {
    await fetch(`/api/attractions/${id}`, { method: 'DELETE' })
    fetchAttractions()
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary">PondThana Journeys</h1>

      <div className="flex justify-end">
        {/* ลิงก์ไปหน้า Add New Attraction */}
        <Link href="/attractions/createattraction">
          <Button>
            Add New Attraction
          </Button>
        </Link>
      </div>

      {/* รายการสถานที่ท่องเที่ยว */}
      <div className="space-y-6">
        {attractions.map(attr => (
          <Card
            key={attr.id}
            className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={attr.coverImage}
              alt={attr.name}
              className="w-full md:w-60 h-40 object-cover object-center rounded-lg"
            />
            <CardContent className="flex-1 space-y-2 p-0">
              <h2 className="text-xl font-semibold">{attr.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-3">{attr.detail}</p>
              <div className="text-xs text-gray-400">
                Lat: {attr.latitude}, Lng: {attr.longitude}
              </div>
              <div className="flex gap-2 mt-2">
                {/* ลิงก์ไปยังหน้า Edit สำหรับสถานที่ท่องเที่ยวแต่ละอัน */}
                <Link href={`/attractions/edit/${attr.id}`}>
                  <Button size="sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(attr.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
