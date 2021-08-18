// copied from https://dipeshwagle.com/blog/use-mdx-bundler-next-js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { v4 as uuid } from 'uuid'
import readingTime from 'reading-time'
import { Post } from '@helpers/server/post'
import { markdownTransform } from './markdown'

export const POSTS_PATH = path.join(process.cwd(), 'contents/posts')

export const getSourceOfFile = (folderName: string) => {
  return fs.readFileSync(path.join(POSTS_PATH, `${folderName}/index.mdx`), 'utf8')
}

export const getAllCustomPosts = (): Post.Devto[] => {
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

export const getSinglePost = async (slug: string): Promise<Post.Custom> => {
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
    const { frontmatter, code } = await markdownTransform(source)

    // if article is not published and its on production then don't show it
    if (!frontmatter.published && process.env.NODE_ENV === 'production') {
      throw new Error(`Post is not published yet: ${slug}`)
    }

    return {
      type: 'custom_post',
      id: uuid(),
      slug,
      code,
      reading_time: readingTime(''),
      published_timestamp,
      title: slug.replace(/-/g, ' '),
      ...(frontmatter as { tag_list: string[]; description: string; published: boolean }),
    }
  } catch (e) {
    throw new Error(`Failed to get Custom Post by slug: ${slug}`)
  }
}
