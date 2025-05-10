// pages/api/product/add.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  sku: z.string().min(1, 'Product SKU is required and it should be unique.'),
  price: z.number().positive('Price must be greater than zero.'),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  category: z.string().min(1, 'Category must be selected.'),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { name, sku, price, description, imageUrl, category } = req.body
  const API_URL = process.env.API_URL; // e.g., 'https://api.example.com'
  const token = process.env.API_TOKEN; // optional, if needed

  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid input' })
  }

  try {
    const body = productSchema.parse(req.body)
    console.log('Proxying product to external API:', body)

    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, sku, price, description, imageUrl, category }),
    });

    if (!response.ok) {
      const error = await response.text()
      console.error('External API error:', error)

      return res.status(response.status).json({ error })
    }

    const data = await response.json()
    return res.status(201).json(data)
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Input validation error
      return res.status(400).json({
        error: 'Validation failed',
        details: err.errors,
      })
    }

    console.error('Proxy error:', err)
    return res.status(500).json({ error: 'Server error while proxying request' })
  }
}
