import { Devto, getDevto } from './get_devto'
import { Custom, getAllCustomPosts } from './get_custom_post'

export const getAllPostSortedByDate = async (): Promise<(Devto.Post | Custom.Post)[]> => {
  return [...getAllCustomPosts(), ...(await getDevto())].sort(
    // @ts-ignore
    (a, b) => new Date(b.published_timestamp) - new Date(a.published_timestamp),
  )
}
