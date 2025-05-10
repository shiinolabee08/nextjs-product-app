'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ImageSelectorProps {
  onSelect: (url: string) => void;
  selectedUrl?: string;
  apiUrl: string;
}

interface FetchedImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export default function ImageSelector({ onSelect, selectedUrl, apiUrl }: ImageSelectorProps) {
  const [images, setImages] = useState<FetchedImage[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(apiUrl)
        const data = await res.json()

        setImages(data.images || data || [])
      } catch (error) {
        console.error('Failed to fetch images:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [apiUrl])

  if (loading) return <p className="text-gray-500">Loading images...</p>

  if (images.length === 0)
    return <p className="text-gray-500">No images available from API.</p>

  return (
    <div className="max-h-40 overscroll-auto overflow-auto mt-2">
      <div className="grid grid-cols-2 gap-2">
        {images.map(({id, download_url}: FetchedImage) => (
          <div
            key={id}
            onClick={() => onSelect(download_url)}
            className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
              selectedUrl === download_url
                ? 'border-blue-500 ring-2 ring-blue-300'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={download_url}
              width={200}
              height={200}
              alt="Product preview"
              className="object-cover w-full h-32 sm:h-36 md:h-40"
            />
          </div>
        ))}
      </div>
    </div>
  )
}