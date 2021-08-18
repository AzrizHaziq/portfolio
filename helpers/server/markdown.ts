// credit to https://github.com/james-wallis/wallis.dev/blob/master/lib/markdown.ts
import mdx_prism from 'mdx-prism'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { bundleMDX } from 'mdx-bundler'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const markdownTransform = async (source: string) => {
  return await bundleMDX(source, {
    xdmOptions(options) {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm]
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        mdx_prism,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['relative'],
            },
          },
        ],
      ]
      return options
    },
  })
}
