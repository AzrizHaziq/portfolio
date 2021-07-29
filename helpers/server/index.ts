import { Custom, getAllPosts } from '@helpers/server/get_custom_post'
import { Devto, frequentDevtoMapper, getDevto } from '@helpers/server/get_devto'

export * from './get_devto'
export * from './get_custom_post'

export const getAllPostSortedByDate = async (): Promise<(Devto.Post | Custom.Post)[]> => {
  return [...getAllPosts(), ...(await getDevto(frequentDevtoMapper))].sort(
    // @ts-ignore
    (a, b) => new Date(b.published_timestamp) - new Date(a.published_timestamp),
  )
}
