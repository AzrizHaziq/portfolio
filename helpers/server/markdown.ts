// credit to https://github.com/james-wallis/wallis.dev/blob/master/lib/markdown.ts
import mdx_prism from 'mdx-prism'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { bundleMDX } from 'mdx-bundler'
import remarkCapitalize from 'remark-capitalize'
import rehypeCodeTitles from 'rehype-code-titles'
import stripHtmlComment from 'strip-html-comments'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const markdownTransform = async (source: string) => {
  source = stripHtmlComment(source)

  return await bundleMDX(source, {
    xdmOptions(options) {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm, remarkCapitalize]
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
