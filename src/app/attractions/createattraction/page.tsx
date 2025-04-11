'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function CreateAttractionPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    detail: '',
    coverImage: '',
    latitude: '',
    longitude: '',
  })

  const handleSubmit = async () => {
    const res = await fetch('/api/attractions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
      }),
    })

    if (res.ok) {
      router.push('/attractions')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Add New Attraction</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <Input
            placeholder="Attraction Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <Textarea
            placeholder="Detail"
            rows={4}
            value={form.detail}
            onChange={e => setForm({ ...form, detail: e.target.value })}
          />
          <Input
            placeholder="Cover Image URL"
            value={form.coverImage}
            onChange={e => setForm({ ...form, coverImage: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Latitude"
              type="number"
              value={form.latitude}
              onChange={e => setForm({ ...form, latitude: e.target.value })}
            />
            <Input
              placeholder="Longitude"
              type="number"
              value={form.longitude}
              onChange={e => setForm({ ...form, longitude: e.target.value })}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Add Attraction
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
