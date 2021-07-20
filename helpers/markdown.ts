// credit to https://github.com/james-wallis/wallis.dev/blob/master/lib/markdown.ts
import gfm from 'remark-gfm'
import unified from 'unified'
import matter from 'gray-matter'
import parse from 'remark-parse'
import remarkHtml from 'remark-html'
import * as highlight from 'remark-highlight.js'
import stripHtmlComments from 'strip-html-comments'

export const sanitizeDevToMarkdown = (markdown: string): string => {
  let correctedMarkdown = ''

  // Dev.to sometimes turns "# header" into "#&nbsp;header"
  const replaceSpaceCharRegex = new RegExp(String.fromCharCode(160), 'g')
  correctedMarkdown = markdown.replace(replaceSpaceCharRegex, ' ')

  // Dev.to allows headers with no space after the hashtag (I don't use # on Dev.to due to the title)
  const addSpaceAfterHeaderHashtagRegex = /##(?=[a-z|A-Z])/g
  return correctedMarkdown.replace(addSpaceAfterHeaderHashtagRegex, '$& ')
}

export const convertMarkdownToHtml = (markdown: string): string => {
  const { content } = matter(markdown)

  const html = unified()
    .use(parse)
    .use(gfm)
    .use(highlight)
    .use(remarkHtml)
    .processSync(stripHtmlComments(content)).contents

  return String(html)
}
