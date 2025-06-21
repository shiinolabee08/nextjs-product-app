// pages/api/product/add.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const productCategorySchema = z.object({
  name: z.string().min(1, 'Product category name is required'),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { name, description } = req.body
  const API_URL = process.env.API_URL; // e.g., 'https://api.example.com'
  const token = process.env.API_TOKEN; // optional, if needed

  if (!name) {
    return res.status(400).json({ error: 'Invalid input' })
  }

  try {
    const body = productCategorySchema.parse(req.body)
    console.log('Proxying product to external API:', body)

    const response = await fetch(`${API_URL}/product-categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description }),
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
