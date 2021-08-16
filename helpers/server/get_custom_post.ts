// copied from https://dipeshwagle.com/blog/use-mdx-bundler-next-js
import fs from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { serialize } from 'next-mdx-remote/serialize'

import remark_slug from 'remark-slug'
import mdx_prism from 'mdx-prism'
import remark_code_titles from 'remark-code-titles'
import remark_autolink_headings from 'remark-autolink-headings'

export const POSTS_PATH = path.join(process.cwd(), 'contents/posts')

export const getSourceOfFile = (folderName: string) => {
  return fs.readFileSync(path.join(POSTS_PATH, `${folderName}/index.mdx`), 'utf8')
}

export const getAllCustomPosts = (): Custom.Post[] => {
  return fs
    .readdirSync(POSTS_PATH)
    .map(file => {
      const [published_timestamp, slug] = file.split('_')
      const source = getSourceOfFile(file)
      const { data, content } = matter(source)

      // if article is not published and its on production then don't show it
      if (!data.published && process.env.NODE_ENV === 'production') {
        return null as any
      }

      return {
        type: 'custom_post',
        id: uuid(),
        slug,
        mdxSource: '',
        reading_time: readingTime(content),
        published_timestamp: new Date(published_timestamp).toJSON(),
        title: slug.replace(/-/g, ' '),
        ...(data as { tag_list: string[]; description: string; published: boolean }),
      }
    })
    .filter(Boolean)
}

export const getSinglePost = async (slug: string): Promise<Custom.Post> => {
  try {
    const foundFilename = fs.readdirSync(POSTS_PATH).find(file => {
      const [_, findSlug] = file.split('_')
      return slug === findSlug
    })

    if (!foundFilename) {
      throw new Error(`Cant find ${slug} in getSinglePost`)
    }

    const [published_timestamp] = foundFilename.split('_')
    const source = getSourceOfFile(`${published_timestamp}_${slug}`)
    const { data, content } = matter(source)

    // if article is not published and its on production then don't show it
    if (!data.published && process.env.NODE_ENV === 'production') {
      throw new Error(`Post is not published yet: ${slug}`)
    }

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remark_autolink_headings, remark_slug, remark_code_titles],
        rehypePlugins: [mdx_prism],
      },
    })

    return {
      type: 'custom_post',
      id: uuid(),
      slug,
      mdxSource,
      reading_time: readingTime(content),
      published_timestamp,
      title: slug.replace(/-/g, ' '),
      ...(data as { tag_list: string[]; description: string; published: boolean }),
    }
  } catch (e) {
    throw new Error(`Failed to get Custom Post by slug: ${slug}`)
  }
}

export declare module Custom {
  export type Post = {
    type: 'custom_post'
    id: string
    slug: string
    mdxSource: any
  } & FrontMatter

  export type FrontMatter = {
    title: string
    description: string
    tag_list: string[]
    cover_image?: string
    reading_time: { text: string }
    published: boolean
    published_timestamp: Date | string
  }
}
