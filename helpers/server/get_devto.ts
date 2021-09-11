import path from 'path'
import axios from 'axios'
import fs from 'fs/promises'
import readingTime from 'reading-time'
import { markdownTransform } from './mdx'
import type { Post } from '@helpers/server/post'

const cacheFile = 'devto-cache.json'
export const getDevto = async (): Promise<Post.Devto[]> => {
  let data: Post.FromResponse[] = await readCache()

  try {
    // at the moment just disable http
    if (0) {
      // eslint-disable-next-line no-console
      console.log('>>>> DEVTO: Hit Api')

      const { data: response }: { data: (Post.Devto & { user: null })[] } = await axios.get(
        'https://dev.to/api/articles/me/all',
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.NEXT_PUBLIC_DEVTO_TOKEN,
          },
        },
      )

      data = response.map(({ user, ...post }) => post)
      await saveToFile(data)
    } else {
      // eslint-disable-next-line no-console
      console.log('>>>> DEVTO: From cache file')
    }
  } catch (e) {
    throw new Error('Failed to get Devto')
  }

  return data.map(d => ({ ...d, type: 'devto', code: '' }))
}

export const getDevToBySlug = async (slug: string): Promise<Post.Devto | undefined> => {
  try {
    const data: Post.Devto[] = await getDevto()
    const post = data.find(item => item.slug === slug)

    if (!post) {
      return undefined
    }

    const source = sanitizeDevToMarkdown(post.body_markdown as string)
    const {
      code,
      frontmatter,
      matter: { content },
    } = await markdownTransform(source)

    return {
      ...post,
      ...frontmatter,
      code,
      reading_time: readingTime(content),
    }
  } catch (e) {
    throw new Error(`Failed to get Devto by slug: ${slug}`)
  }
}

const saveToFile = async (data: Post.FromResponse[]): Promise<void> => {
  await fs.writeFile(path.join(`${process.cwd()}/public`, cacheFile), JSON.stringify(data, null, 2))
}

const readCache = async (): Promise<Post.Devto[]> => {
  const data = await fs.readFile(path.join(`${process.cwd()}/public`, cacheFile))
  return JSON.parse(Buffer.from(data).toString())
}

const sanitizeDevToMarkdown = (markdown: string): string => {
  const replaceSpaceCharRegex = new RegExp(String.fromCharCode(160), 'g') // Dev.to sometimes turns "# header" into "#&nbsp;header"
  const addSpaceAfterHeaderHashtagRegex = /##(?=[a-z|A-Z])/g // Dev.to allows headers with no space after the hashtag (I don't use # on Dev.to due to the title)

  return markdown
    .replace(/{%/g, ' ')
    .replace(/%}/g, ' ')
    .replace(replaceSpaceCharRegex, ' ')
    .replace(addSpaceAfterHeaderHashtagRegex, '$& ')
}
