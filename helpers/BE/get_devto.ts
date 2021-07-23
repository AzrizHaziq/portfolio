import fs from 'fs/promises'
import path from 'path'
import axios from 'axios'

export declare module Devto {
  export type Post = { type: 'devto' } & Partial<FromResponse> & Partial<AdditionalProps>

  export interface AdditionalProps {
    frontMatter: Record<string, any>
  }

  export interface User {
    name: string
    username: string
    twitter_username?: any
    github_username: string
    website_url?: any
    profile_image: string
    profile_image_90: string
  }

  export interface FromResponse {
    type_of: string
    id: number
    title: string
    description: string
    published: boolean
    published_at: Date | string
    slug: string
    path: string
    url: string
    comments_count: number
    public_reactions_count: number
    page_views_count: number
    published_timestamp: Date | string
    body_markdown: string
    positive_reactions_count: number
    cover_image: string
    tag_list: string[]
    canonical_url: string
    user: User
  }
}

const _5min = 300
let timestamp = 0
export const getDevto = async (mapper?: any): Promise<Devto.Post[]> => {
  mapper ??= Identity
  let data: Devto.FromResponse[] = await readCache()

  try {
    if (new Date().getTime() - timestamp < _5min) {
      // eslint-disable-next-line no-console
      console.log('>>>> DEVTO: Hit Api')

      const { data: response }: { data: Devto.FromResponse[] } = await axios.get('https://dev.to/api/articles/me/all', {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.NEXT_PUBLIC_DEVTO_TOKEN,
        },
      })

      data = response
      await saveToFile(data)
      timestamp = new Date().getTime()
    } else {
      // eslint-disable-next-line no-console
      console.log('>>>> DEVTO: From cache file')
    }
  } catch (e) {
    throw new Error('Failed to get Devto')
  }

  return data.map(mapper)
}

export const getDevToBySlug = async (slug: string): Promise<Devto.Post> => {
  try {
    const data: Devto.Post[] = await getDevto()
    const found = data.find(item => item.slug === slug)

    if (!found) {
      throw new Error('Empty response')
    }

    return found
  } catch (e) {
    throw new Error(`Failed to get Devto by slug: ${slug}`)
  }
}

const Identity = <T>(data: T): T => ({ ...data, type: 'devto' })

export const frequentDevtoMapper = ({
  id,
  title,
  url,
  description,
  slug,
  published_timestamp,
  tag_list,
  cover_image,
}: Devto.FromResponse): Devto.Post => ({
  id,
  title,
  description,
  slug,
  published_timestamp,
  tag_list,
  url,
  cover_image,
  type: 'devto',
})

const cacheFile = 'devto-cache.json'
const saveToFile = async (data: Devto.FromResponse[]): Promise<void> => {
  await fs.writeFile(path.join(`${process.cwd()}/public`, cacheFile), JSON.stringify(data, null, 2))
}

const readCache = async (): Promise<Devto.FromResponse[]> => {
  const data = await fs.readFile(path.join(`${process.cwd()}/public`, cacheFile))
  return JSON.parse(Buffer.from(data).toString())
}
