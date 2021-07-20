// const axios = require('axios').default
import axios from 'axios'

export interface Devto_Post {
  id: number
  title: string
  description: string
  slug: string
  url: string
  published_timestamp: string
  tag_list: any[]
  cover_image: string | null
  type: 'devto'
}

export async function getDevto<R, T = Devto_Post[]>(mapper: (post: Devto_Post) => R): Promise<R[]> {
  try {
    const { data }: { data: Devto_Post[] } = await axios.get('https://dev.to/api/articles/me/all', {
      headers: {
        'api-key': process.env.NEXT_PUBLIC_DEVTO_TOKEN,
        'Content-Type': 'application/json',
      },
    })

    return data.map(mapper).map(i => ({ ...i, type: 'devto' }))
  } catch (e) {
    throw new Error('Failed to get Devto')
  }
}
