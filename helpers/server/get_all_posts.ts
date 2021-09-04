import { getDevto } from './get_devto'
import { Post } from '@helpers/server/post'
import { getAllCustomPosts } from './get_custom_post'

export const getAllPostSortedByDate = async (): Promise<(Post.Devto | Post.Custom)[]> => {
  return [...(await getAllCustomPosts()), ...(await getDevto())].sort(
    // @ts-ignore
    (a, b) => new Date(b.published_timestamp) - new Date(a.published_timestamp),
  )
}
