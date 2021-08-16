import { Custom, getAllCustomPosts } from './get_custom_post'
import { Devto, frequentDevtoMapper, getDevto } from './get_devto'

export const getAllPostSortedByDate = async (): Promise<(Devto.Post | Custom.Post)[]> => {
  return [...getAllCustomPosts(), ...(await getDevto(frequentDevtoMapper))].sort(
    // @ts-ignore
    (a, b) => new Date(b.published_timestamp) - new Date(a.published_timestamp),
  )
}
