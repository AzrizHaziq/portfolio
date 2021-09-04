import path from 'path'
import mdxPrism from 'mdx-prism'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { bundleMDX } from 'mdx-bundler'
import remarkCapitalize from 'remark-capitalize'
import rehypeCodeTitles from 'rehype-code-titles'
import stripHtmlComment from 'strip-html-comments'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const markdownTransform = async (source: string) => {
  source = stripHtmlComment(source)

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'esbuild.exe')
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'bin', 'esbuild')
  }

  return await bundleMDX(source, {
    xdmOptions(options) {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm, remarkCapitalize]
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        mdxPrism,
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
