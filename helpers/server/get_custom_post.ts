// copied from https://dipeshwagle.com/blog/use-mdx-bundler-next-js
import fs from 'fs'
import path from 'path'
import fsp from 'fs/promises'
import { v4 as uuid } from 'uuid'
import readingTime from 'reading-time'
import { markdownTransform } from './mdx'
import { Post } from '@helpers/server/post'

export const POSTS_PATH = path.join(process.cwd(), 'contents/posts')

export const getSourceOfFile = (folderName: string) => {
  return fs.readFileSync(path.join(POSTS_PATH, `${folderName}/index.mdx`), 'utf8')
}

export const getAllCustomPosts = async (): Promise<Post.Custom[]> => {
  let temp: Post.Custom[] = []

  try {
    let files: string[] = await fsp.readdir(POSTS_PATH)
    for (let file of files) {
      const [published_timestamp, slug] = file.split('_')
      const source = getSourceOfFile(file)
      const {
        frontmatter,
        matter: { content },
      } = await markdownTransform(source)

      // if article is not published and its on production then don't show it
      if (!frontmatter.published && process.env.NODE_ENV === 'production') {
        continue
      }

      temp.push({
        type: 'custom_post',
        id: uuid(),
        slug,
        code: '',
        reading_time: readingTime(content),
        published_timestamp: new Date(published_timestamp).toJSON(),
        title: slug.replace(/-/g, ' '),
        ...(frontmatter as { tag_list: string[]; description: string; published: boolean }),
      })
    }

    return temp
  } catch (e) {
    console.error(`Error at  getAllCustomPosts: ${e}`)
    return []
  }
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
    const {
      frontmatter,
      code,
      matter: { content },
    } = await markdownTransform(source)

    // if article is not published and its on production then don't show it
    if (!frontmatter.published && process.env.NODE_ENV === 'production') {
      throw new Error(`Post is not published yet: ${slug}`)
    }

    return {
      type: 'custom_post',
      id: uuid(),
      slug,
      code,
      reading_time: readingTime(content),
      published_timestamp,
      title: slug.replace(/-/g, ' '),
      ...(frontmatter as { tag_list: string[]; description: string; published: boolean }),
    }
  } catch (e) {
    throw new Error(`Failed to get Custom Post by slug: ${slug}`)
  }
}
