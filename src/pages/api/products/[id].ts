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
  const { id } = req.query;

  const API_URL = process.env.API_URL; // e.g., 'https://api.example.com'
  const token = process.env.API_TOKEN; // optional, if needed

  if (req.method === 'PUT') {
    try {
      const body = productSchema.parse(req.body)

      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // if needed
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ error: data })
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Proxy update failed:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  res.setHeader('Allow', ['PUT'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
