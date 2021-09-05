// https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/master/lib/mdx.js
import path from 'path'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { bundleMDX } from 'mdx-bundler'
import { visit } from 'unist-util-visit'
import rehypePrismPlus from 'rehype-prism-plus'
import remarkCapitalize from 'remark-capitalize'
import rehypeCodeTitles from 'rehype-code-titles'
import stripHtmlComment from 'strip-html-comments'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const tokenClassNames = {
  tag: 'text-code-red',
  'attr-name': 'text-code-yellow',
  'attr-value': 'text-code-green',
  deleted: 'text-code-red',
  inserted: 'text-code-green',
  punctuation: 'text-code-white',
  keyword: 'text-code-purple',
  string: 'text-code-green',
  function: 'text-code-blue',
  boolean: 'text-code-red',
  comment: 'text-gray-400 italic',

  operator: '',
  number: 'text-code-green',
  method: 'text-code-blue',
  dom: 'text-code-yellow',
  'property-access': 'text-code-blue',
  arrow: '',
  console: '',
  parameter: '',
  'plain-text': '',
  'class-name': '',
  script: '',
  'script-punctuation': '',
  builtin: '',
  // 'maybe-class-name': '',
}

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
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        remarkGfm,
        remarkCapitalize,
        //////////////
      ]

      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['relative'],
            },
          },
        ],
        // mdxPrism,
        [rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true }],
        () => {
          return (tree: any) => {
            visit(tree, 'element', (node, index, parent) => {
              let [token, type] = node.properties.className || []
              if (token === 'token') {
                node.properties.className = [type, tokenClassNames[type as keyof typeof tokenClassNames]]
              }
            })
          }
        },
      ]
      return options
    },
  })
}
