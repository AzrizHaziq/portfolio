import { NextApiRequest, NextApiResponse } from 'next'
import { generateBlogImg } from '@helpers/server/generate-blog-img'

interface Req extends NextApiRequest {
  query: {
    q: string
    tags: string[]
  }
}

export default async function handle(req: Req, res: NextApiResponse) {
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ message: 'this feature is not available at production' })
  }

  let { q: slug, tags = [] } = req.query
  const canvas = await generateBlogImg({ slug, tags })

  res
    .writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': canvas.toBuffer().length,
    })
    .end(canvas.toBuffer('image/png'))
}
