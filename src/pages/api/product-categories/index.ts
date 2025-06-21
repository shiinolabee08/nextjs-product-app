// pages/api/product/add.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const API_URL = process.env.API_URL; // e.g., 'https://api.example.com'
  const token = process.env.API_TOKEN; // optional, if needed

  console.log(API_URL)

  try {

    const response = await fetch(`${API_URL}/product-categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('External API error:', error)

      return res.status(response.status).json({ error })
    }

    const data = await response.json()
    return res.status(201).json(data)
  } catch (err) {
    console.error('Proxy error:', err)
    return res.status(500).json({ error: 'Server error while proxying request' })
  }
}
