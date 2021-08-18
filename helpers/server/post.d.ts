export declare module Post {
  export type Devto = { type: 'devto'; code: string } & FromResponse

  export interface FromResponse {
    tags: string
    type_of: string
    reading_time: { text: string } // custom
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
    published_timestamp: string
    body_markdown: string
    positive_reactions_count: number
    cover_image: string
    tag_list: string[]
    canonical_url: string
  }

  ////////////////////// Custom
  export type Custom = {
    type: 'custom_post'
    id: string
    slug: string
    code: string
  } & FrontMatter

  type FrontMatter = {
    title: string
    description: string
    tag_list: string[]
    cover_image?: string
    reading_time: { text: string }
    published: boolean
    published_timestamp: Date | string
  }
}

export declare module Custom {}
