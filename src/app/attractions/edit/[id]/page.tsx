'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function EditAttractionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    detail: '',
    coverImage: '',
    latitude: '',
    longitude: '',
  })

  // ดึงข้อมูลสถานที่ท่องเที่ยวจาก API
  useEffect(() => {
    const fetchAttraction = async () => {
      const res = await fetch(`/api/attractions/${params.id}`)
      const data = await res.json()

      if (data.error) {
        router.push('/404') // ถ้าไม่พบข้อมูลให้ไปที่หน้า 404
      }

      setForm(data)
    }

    fetchAttraction()
  }, [params.id])

  // ฟังก์ชันสำหรับส่งข้อมูลที่แก้ไขไปที่ API
  const handleSubmit = async () => {
    const res = await fetch(`/api/attractions/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
      }),
    })

    if (res.ok) {
      router.push('/attractions') // กลับไปที่หน้ารายการสถานที่ท่องเที่ยว
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Edit Attraction</h1>

      <div className='space-y-6'>
        {/* Input for Attraction Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Attraction Name</label>
          <Input
            placeholder="Enter the name of the attraction"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Input for Detail */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Detail</label>
          <Textarea
            placeholder="Enter the details of the attraction"
            rows={4}
            value={form.detail}
            onChange={e => setForm({ ...form, detail: e.target.value })}
          />
        </div>

        {/* Input for Cover Image URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Cover Image URL</label>
          <Input
            placeholder="Enter the URL for the cover image"
            value={form.coverImage}
            onChange={e => setForm({ ...form, coverImage: e.target.value })}
          />
        </div>

        {/* Latitude and Longitude Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Latitude</label>
            <Input
              placeholder="Enter the latitude"
              type="number"
              value={form.latitude}
              onChange={e => setForm({ ...form, latitude: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Longitude</label>
            <Input
              placeholder="Enter the longitude"
              type="number"
              value={form.longitude}
              onChange={e => setForm({ ...form, longitude: e.target.value })}
            />
          </div>
        </div>

        {/* Save Changes Button */}
        <Button onClick={handleSubmit} className="w-full mt-4">
          Save Changes
        </Button>
      </div>
    </div>
  )
}
