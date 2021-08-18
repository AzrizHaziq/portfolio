import path from 'path'
import axios from 'axios'
import fs from 'fs/promises'
import readingTime from 'reading-time'

// credit to https://github.com/james-wallis/wallis.dev/blob/master/lib/markdown.ts
import gfm from 'remark-gfm'
import matter from 'gray-matter'
import parse from 'remark-parse'
import { unified } from 'unified'
import remarkSlug from 'remark-slug'
import remarkHtml from 'remark-html'
import rehypeHighlight from 'rehype-highlight'
import remarkCodeTitles from 'remark-code-titles'
import stripHtmlComments from 'strip-html-comments'
import remarkAutolinkHeadings from 'remark-autolink-headings'

const _5min = 300
let timestamp = 0
const cacheFile = 'devto-cache.json'
export const getDevto = async (): Promise<Devto.Post[]> => {
  let data: Devto.Post[] = await readCache()

  try {
    // at the moment just disable http
    if (new Date().getTime() - timestamp < _5min && false) {
      // eslint-disable-next-line no-console
      console.log('>>>> DEVTO: Hit Api')

      const { data: response }: { data: Devto.Post[] } = await axios.get('https://dev.to/api/articles/me/all', {
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

  return data
}

export const getDevToBySlug = async (slug: string): Promise<Devto.Post | undefined> => {
  try {
    const data: Devto.Post[] = await getDevto()
    const post = data.find(item => item.slug === slug)

    if (!post) {
      return undefined
    }

    const { content, data: frontMatter } = matter(post.body_markdown as string)
    const markdown = sanitizeDevToMarkdown(post.body_markdown as string)
    const html = convertMarkdownToHtml(markdown)

    return {
      ...post,
      ...frontMatter,
      body_markdown: html,
      reading_time: readingTime(content),
    }
  } catch (e) {
    throw new Error(`Failed to get Devto by slug: ${slug}`)
  }
}

const saveToFile = async (data: Devto.FromResponse[]): Promise<void> => {
  await fs.writeFile(path.join(`${process.cwd()}/public`, cacheFile), JSON.stringify(data, null, 2))
}

const readCache = async (): Promise<Devto.Post[]> => {
  const data = await fs.readFile(path.join(`${process.cwd()}/public`, cacheFile))
  return JSON.parse(Buffer.from(data).toString())
}

const sanitizeDevToMarkdown = (markdown: string): string => {
  let correctedMarkdown = ''

  // Dev.to sometimes turns "# header" into "#&nbsp;header"
  const replaceSpaceCharRegex = new RegExp(String.fromCharCode(160), 'g')
  correctedMarkdown = markdown.replace(replaceSpaceCharRegex, ' ')

  // Dev.to allows headers with no space after the hashtag (I don't use # on Dev.to due to the title)
  const addSpaceAfterHeaderHashtagRegex = /##(?=[a-z|A-Z])/g
  return correctedMarkdown.replace(addSpaceAfterHeaderHashtagRegex, '$& ')
}

const convertMarkdownToHtml = (markdown: string): string => {
  let { content } = matter(markdown)

  return unified()
    .use(parse)
    .use(gfm)
    .use(rehypeHighlight)
    .use(remarkSlug)
    .use(remarkAutolinkHeadings, { behavior: 'wrap', linkProperties: { className: ['relative'] } })
    .use(remarkHtml)
    .use(remarkCodeTitles)
    .processSync(stripHtmlComments(content))
    .toString()
}

export declare module Devto {
  export type Post = { type: 'devto' } & FromResponse

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
    user: User
  }

  interface User {
    name: string
    username: string
    twitter_username?: any
    github_username: string
    website_url?: any
    profile_image: string
    profile_image_90: string
  }
}
