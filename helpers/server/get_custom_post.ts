// copied from https://dipeshwagle.com/blog/use-mdx-bundler-next-js
import fs from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { serialize } from 'next-mdx-remote/serialize'

export const POSTS_PATH = path.join(process.cwd(), 'contents/posts')

export const getSourceOfFile = (folderName: string) => {
  return fs.readFileSync(path.join(POSTS_PATH, `${folderName}/index.mdx`), 'utf8')
}

export const getAllPosts = (): Custom.Post[] => {
  return fs.readdirSync(POSTS_PATH).map(file => {
    const [published_timestamp, slug] = file.split('_')
    const source = getSourceOfFile(file)
    const { data, content } = matter(source)

    return {
      type: 'custom_post',
      id: uuid(),
      slug,
      mdxSource: '',
      wordCount: content.split(/\s+/gu).length,
      reading_time: readingTime(content),
      published_timestamp: new Date(published_timestamp).toJSON(),
      title: slug.replaceAll('-', ' '),
      ...(data as { description: string; tag_list: string[] }),
    }
  })
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

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [require('remark-autolink-headings'), require('remark-slug'), require('remark-code-titles')],
        rehypePlugins: [require('mdx-prism')],
      },
    })

    return {
      type: 'custom_post',
      id: uuid(),
      slug,
      mdxSource,
      wordCount: content.split(/\s+/gu).length,
      reading_time: readingTime(content),
      published_timestamp,
      title: slug.replaceAll('-', ' '),
      ...(data as { description: string; tag_list: string[] }),
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
    reading_time: string
    wordCount: number
    published_timestamp: Date | string
  }
}
