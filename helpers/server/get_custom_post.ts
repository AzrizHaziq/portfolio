// copied from https://dipeshwagle.com/blog/use-mdx-bundler-next-js
import fs from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'

export const POSTS_PATH = path.join(process.cwd(), 'contents/posts')

export const getSourceOfFile = (filename: string) => {
  return fs.readFileSync(path.join(POSTS_PATH, `${filename}/index.mdx`))
}

export const getAllPosts = (): Custom.Post[] => {
  return fs.readdirSync(POSTS_PATH).map(filename => {
    const source = getSourceOfFile(filename)
    const slug = filename.replace(/\.mdx?$/, '')
    const { data } = matter(source) as { data: any & { published_timestamp: Date } }

    return {
      id: uuid(),
      ...(data as Custom.FrontMatter),
      slug,
      code: '',
      type: 'custom_post',
      published_timestamp: new Date(data.published_timestamp).toJSON(),
    }
  })
}

export const getSinglePost = async (slug: string): Promise<Custom.Post | any> => {
  try {
    const source = getSourceOfFile(slug).toString()

    const { code, frontmatter } = await bundleMDX(source, {
      cwd: POSTS_PATH,
    })

    return {
      ...frontmatter,
      code,
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
    code: string
  } & FrontMatter

  export type FrontMatter = {
    title: string
    description: string
    tag_list: string[]
    cover_image?: string
    published_timestamp: Date | string
  }
}
